import {View, Pressable, Text, Image, SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react'
import {tiersToColors, getHealth, getMaxHealth, getBaseEnergy} from "../../Utils/Funcs"
import {SkillType, RobotType} from "../../Utils/Types"
import LifeBar from "../../Components/LifeBar/LifeBar"
import { useTheme } from '@react-navigation/native';

const SkillButton = ({robotPart, onClick, disabled = false, enemy=false}) => {
  return(
    <Pressable 
    style={{
      backgroundColor:enemy? tiersToColors[robotPart?.tier] : disabled ? "lightgray" : tiersToColors[robotPart?.tier], 
      padding: 5, flex: 1, alignItems:"center"}} onPress={() => {onClick(robotPart?.skill)}} disabled={disabled || enemy}>
      <Text style={{color:"white", fontWeight:"bold"}}>{robotPart?.skill?.name}</Text>
    </Pressable>
  )
}


const TabButton = ({title, onClick, disabled}) => {
  const { colors } = useTheme();
  return(
    <Pressable 
      disabled={disabled}
      onPress={onClick}
      style={{
        backgroundColor:colors.primary,
        width:"fit-content",
        minWidth: 100,
        alignItems:"center",
        padding: 5,
        borderBottomColor:colors.detail,
        borderBottomWidth:1
      }}>
      <Text style={{color: colors.font}}>{title}</Text>
    </Pressable>
  )
}
export default BattlePage = ({route, navigation}) => {
  const { colors } = useTheme();
  const {playerRobot, enemyRobot} = route.params;

  const [skillRunning, setSkillRunning] = useState(false);
  const [info, setInfo] = useState("");

  const [playerTurn, setPlayerTurn] = useState(true);

  const [playerEnergy, setPlayerEnergy] = useState(getBaseEnergy(playerRobot))
  const [enemyEnergy, setEnemyEnergy] = useState(getBaseEnergy(enemyRobot))


  const damage = (target, amount) => {
    if(getHealth(target) > 0){
        let totalRemain = amount;
        Object.keys(target).forEach((k) => {
          if(k.includes("torso") || k.includes("head") || k.toLowerCase().includes("leg") || k.toLowerCase().includes("arm"))
            if(target[k].curHealth > 0){
              const amnt = Math.ceil(Math.random() * totalRemain)
              totalRemain -= amnt
              let newHealth = target[k].curHealth - amnt

              if(newHealth < 0){
                newHealth = 0
                totalRemain += amnt - target[k].curHealth
              }
              target[k] = {...target[k], curHealth: newHealth}
            }
        })
        if(totalRemain > 0){
          damage(target, totalRemain)
        }

    }
  }


  const heal = (target, amount) => {
    if(getHealth(target) < getMaxHealth(target)){
        let totalRemain = amount;
        Object.keys(target).forEach((k) => {
          if(k.includes("torso") || k.includes("head") || k.toLowerCase().includes("leg") || k.toLowerCase().includes("arm"))
            if(target[k].curHealth < getMaxHealth(target)){
              const amnt = Math.ceil(Math.random() * totalRemain)
              totalRemain -= amnt
              let newHealth = target[k].curHealth + amnt
              
              if(newHealth > target[k].maxHealth){
                newHealth = target[k].maxHealth
                //totalRemain += amnt - target[k].curHealth
              }

              target[k] = {...target[k], curHealth: newHealth}
              
            }
        })
        if(totalRemain > 0){
          heal(target, totalRemain)
        }

    }
  }


  const doSkill = async (user, skill : SkillType, isPlayer = true) => {
    setSkillRunning(true);
    setInfo(user?.name + " Utilizou " + skill?.name?.toString())
    
    if(isPlayer){
      setPlayerEnergy(playerEnergy - skill.cost)
    }
    switch(skill.type){
      case "LIFE":
        if(skill.target == "SELF"){
          //curar
          if(isPlayer){
            const ply = playerRobot
            heal(ply, skill.value)
            navigation.setParams({
              playerRobot: ply
            });
          }else{
            const enemy = enemyRobot
            heal(enemy, skill.value)
            navigation.setParams({
              enemyRobot: enemy
            });
          }
        }
        else{
          //dano
          if(isPlayer){
            const enemy = enemyRobot
            damage(enemy, skill.value)
            navigation.setParams({
              enemyRobot: enemy
            });
          }else{
            const ply = playerRobot
            damage(ply, skill.value)
            navigation.setParams({
              playerRobot: ply
            });
          }
        }
      break;
    }


    setTimeout(() => {
      setSkillRunning(false);
      setInfo("");
      if((isPlayer) && ((playerEnergy - skill.cost) <= 0)){
        changeTurn(true)
      }
      checkWin()
    }, 1000);


  }

  const checkWin = () => {
    if(getHealth(playerRobot) <= 0){
      leaveBattle()
    }else if(getHealth(enemyRobot) <= 0){
      leaveBattle(1)
    }
  }

  const enemyTurn = async (energy) => {
      const avaliableSkills = []
      Object.keys(enemyRobot).forEach((k) => {
        if(k.includes("torso") || k.includes("head") || k.toLowerCase().includes("leg") || k.toLowerCase().includes("arm"))
          if(enemyRobot[k].skill.cost <= energy){
            avaliableSkills.push(enemyRobot[k].skill)
          }
      })
      if(avaliableSkills.length <= 0){
        changeTurn(false)
      }else{
        const index = Math.floor(Math.random() * (avaliableSkills.length-1))
        energy -= avaliableSkills[index].cost
        doSkill(enemyRobot, avaliableSkills[index], false)
        await new Promise(r => setTimeout(r, 1100));
        enemyTurn(energy)
      }
  }

  const changeTurn = async(playerTurn) => {
    await new Promise(r => setTimeout(r, 900));
    if(playerTurn){ 
      setEnemyEnergy(getBaseEnergy(enemyRobot))
      setPlayerTurn(false)
      enemyTurn(enemyEnergy);
    }else{
      setPlayerTurn(true)
      setPlayerEnergy(getBaseEnergy(playerRobot))
    }
  }

  const leaveBattle = (win = 0) => {
    //0 perdeu
    //1 ganhou
    //2 fugiu
    navigation.popTo('Batalhas', { playerRobot: playerRobot, win: win})
  }
  
  return(
    <SafeAreaView style={{flex:1, padding: 15,  display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
      <View 
        style={{
          width:"100%",
          backgroundColor:colors.primary, 
          display:"flex", 
          flexDirection:"row", 
          justifyContent:"end",
          alignItems: "start",
          padding: 5,
          gap: 5,
          height: "fit-content"
          }}> 
            <Text style={{color: colors.font}}> {enemyEnergy} </Text>
            <View 
              style={{
                flex: 1,
                display:"flex",
                flexDirection:"column",
                justifyContent:"start",
            }}>
              <Text style={{color: colors.font}}>
                {enemyRobot.name}
              </Text>
              <View style={{marginBottom:10, marginTop: 10}}>
                <LifeBar width={"100%"} maxHealth={getMaxHealth(enemyRobot)} curHealth={getHealth(enemyRobot)}/>
              </View>
              <View style={{display:"flex", flexDirection:"column", gap: 5}}>
                  <View style={{display:"flex", flexDirection:"row", gap: 5}}>
                    <SkillButton robotPart={enemyRobot?.torso}
                      onClick={(skill) => {doSkill(enemyRobot, skill)}} disabled={skillRunning} enemy={true} />
                    <SkillButton robotPart={enemyRobot?.head}
                      onClick={(skill) => {doSkill(enemyRobot, skill)}} disabled={skillRunning} enemy={true} />
                  </View>
                  <View style={{display:"flex", flexDirection:"row", gap: 5}}>
                    <SkillButton robotPart={enemyRobot?.rightArm}
                      onClick={(skill) => {doSkill(enemyRobot, skill)}} disabled={skillRunning} enemy={true} />
                  <SkillButton robotPart={enemyRobot?.leftArm}
                      onClick={(skill) => {doSkill(enemyRobot, skill)}} disabled={skillRunning} enemy={true} />
                  </View>
                  <View style={{display:"flex", flexDirection:"row", gap: 5}}>
                    <SkillButton robotPart={enemyRobot?.rightLeg}
                      onClick={(skill) => {doSkill(enemyRobot, skill)}} disabled={skillRunning} enemy={true} />
                    <SkillButton robotPart={enemyRobot?.leftLeg}
                      onClick={(skill) => {doSkill(enemyRobot, skill)}} disabled={skillRunning} enemy={true} />
                  </View>
              </View>
            </View>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 5,
            }}>
            <Image style={{ height:75, width:75 }} source={enemyRobot.head.image} />
            </View>
      </View>

      {info.trim().length > 0 && 
      <View style={{backgroundColor:colors.primary, width:"100%", padding: 5}}>
        <Text style={{color: colors.font}}>{info}</Text>
      </View>}

      <View>
        <View style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end", gap: 2}}>
              <TabButton title="Terminar Turno" onClick={() => {changeTurn(true)}} disabled={!playerTurn}/>
              <TabButton title="Fugir" onClick={() => {leaveBattle(2)}} disabled={!playerTurn}/>
             
            </View>
            <View 
            style={{
              width:"100%",
              backgroundColor:colors.primary, 
              display:"flex", 
              flexDirection:"row", 
              justifyContent:"start",
              alignItems: "start",
              padding: 5,
              gap: 5
              }}> 
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 5,
              }}>
              <Image style={{ height:75, width:75 }} source={playerRobot.head.image} />
              </View>
              <View 
                style={{
                  flex: 1,
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"start",
              }}>
                <Text style={{color: colors.font}}>
                  {playerRobot.name}
                </Text>
                <View style={{marginBottom:10, marginTop: 10}}>
                  <LifeBar width={"100%"} maxHealth={getMaxHealth(playerRobot)} curHealth={getHealth(playerRobot)}/>
                </View>
                <View style={{display:"flex", flexDirection:"column", gap: 5}}>
                  <View style={{display:"flex", flexDirection:"row", gap: 5}}>
                    <SkillButton robotPart={playerRobot?.head}
                      onClick={(skill) => {doSkill(playerRobot, skill)}} 
                      disabled={skillRunning || !playerTurn || playerEnergy < playerRobot?.head?.skill.cost}  
                    />
                    <SkillButton robotPart={playerRobot?.torso}
                      onClick={(skill) => {doSkill(playerRobot, skill)}}
                      disabled={skillRunning || !playerTurn || playerEnergy < playerRobot?.torso?.skill.cost}
                      />
                  </View>
                  <View style={{display:"flex", flexDirection:"row", gap: 5}}>
                    <SkillButton robotPart={playerRobot?.leftArm}
                      onClick={(skill) => {doSkill(playerRobot, skill)}}
                      disabled={skillRunning || !playerTurn || playerEnergy < playerRobot?.leftArm?.skill.cost} 
                      />
                    <SkillButton robotPart={playerRobot?.rightArm}
                      onClick={(skill) => {doSkill(playerRobot, skill)}}
                      disabled={skillRunning || !playerTurn || playerEnergy < playerRobot?.rightArm?.skill.cost}
                      />
                  </View>
                  <View style={{display:"flex", flexDirection:"row", gap: 5}}>
                    <SkillButton robotPart={playerRobot?.leftLeg}
                      onClick={(skill) => {doSkill(playerRobot, skill)}}
                      disabled={skillRunning || !playerTurn || playerEnergy < playerRobot?.leftLeg?.skill.cost} 
                      />
                    <SkillButton robotPart={playerRobot?.rightLeg}
                      onClick={(skill) => {doSkill(playerRobot, skill)}}
                      disabled={skillRunning || !playerTurn || playerEnergy < playerRobot?.rightLeg?.skill.cost} 
                      />
                  </View>
              </View>
              </View>
              <Text style={{color: colors.font}}> {playerEnergy} </Text>
          </View>
        </View>
    </SafeAreaView>
  )
}