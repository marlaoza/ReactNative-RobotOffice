import { Text, View, SafeAreaView, ScrollView,Pressable, Switch, Image} from 'react-native';
import Modal from 'react-native-modal';
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getHealth, getMaxHealth, getWeight, getBaseEnergy, tiersToColors} from '../../Utils/Funcs'
import {CheckBox} from 'react-native-elements'
import LifeBar from "../../Components/LifeBar/LifeBar"
import CustomButton from "../../Components/CustomButton/CustomButton"
import CustomInput from "../../Components/CustomInput/CustomInput"
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal"
import {RobotType} from "../../Utils/Types"
import {allParts} from "../../Utils/Data"
import {updateRobot, increaseScrap} from "../../Utils/Context"

import { useTheme } from '@react-navigation/native';

const SkillCard = ({skill, tier}) => {
  const { colors } = useTheme();
  if(skill != undefined) {
    return (
        <View style={{
          display:"flex", 
          flexDirection:"row", 
          justifyContent:"space-between", 
          backgroundColor:colors.primary, 
          flex:1, padding: 5, borderRadius: 4}}>
          <Text style={{color:tiersToColors[tier], fontWeight:600}}>{skill.name}</Text>
          <Text style={{color:colors.detail, fontWeight:"bold"}}>{skill.cost}</Text>
        </View>
    )
  }
}

const RobotCard = ({robot, selected = false, onPress}) => {
  const { colors } = useTheme();
  return(
    <Pressable onPress={onPress}> 
      <View 
        style={{
          padding: 3, 
          display:"flex", 
          flexDirection:"column", 
          gap: 5, 
                      justifyContent:"center",
                      alignItems:"center",
                      borderColor:colors.detail,
                      borderWidth: selected? 4: 0,
                      backgroundColor:colors.primary, borderRadius: 5}}>
                    {robot.head?.image != undefined? 
                     <Image source={robot.head.image} />
                    : 
                      <View style={{
                      backgroundColor:robot.head.backgroundColor, 
                      height:50, 
                      width:50,
                      }}></View>
                    }
                    

                   
                    <Text style={{fontSize:12, color:colors.font}}> {robot.name} </Text>
                    <LifeBar  
                      width={50}
                      curHealth={getHealth(robot)}
                      maxHealth={getMaxHealth(robot)}
                    />
                  </View> 
                </Pressable>
  )
}

const BattleCard = ({robot, selected = false, onPress}) => {
  const { colors } = useTheme();
  return(
     <View style={{
                backgroundColor:colors.primary,
                borderRadius: 8,
                }}>
                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", backgroundColor:colors.contrast,
                borderTopRightRadius: 8, borderTopLeftRadius: 8, paddingVertical: 5, paddingRight: 8}}>
                  <CheckBox 
                    containerStyle={{ margin:0, padding:0}} 
                    wrapperStyle={{margin:0,padding:0}}
                    checked={selected} onPress={onPress} />
                  <Text style={{textAlign:"center", color:"white"}}>{robot.name}</Text>
                  <Text style={{textAlign:"center", color:"white"}}>Tier: {robot.tier}</Text>
                </View>
                <View style={{alignItems:"center"}}>
                  <Image source={robot.head.image} />

                  <View 
                    style={{
                      display:"flex", 
                      flexDirection:"row", 
                      height:robot?.torso?.height || 75, 
                      marginBottom: robot?.torso? 0 : 20, 
                      }}>

                    <Image source={robot.rightArm.image} />
                    <Image source={robot.torso.image} />
                    <Image source={robot.leftArm.image} style={{
                      transform: [
                        { scaleX: -1 }
                      ]
                    }}/>
                  </View>
                  <View style={{display:"flex", flexDirection:"row", justifyContent:"center", gap: 10}}>
                    <Image source={robot.rightLeg.image} />
                    <Image source={robot.leftLeg.image} style={{
                      transform: [
                        { scaleX: -1 }
                      ]
                    }}/>
                  </View>
                  
                </View>

                
    </View>
  )

}
export default Home = ({navigation, route}) => {
  const { colors } = useTheme();

  const robots = useSelector((state) => state.robots)
  const [battles, setBattles] = useState([])
  const [selectedBot, setSelectedBot] = useState({...robots[0]})
  const [selectedBattle, setSelectedBattle] = useState()
  const [autoBattle, setAutoBattle] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [searchValue, setSearchValue] = useState("")

  const [showLoot, setShowLoot] = useState(false)
  const [lootTitle, setLootTitle] = useState("")
  const [loot, setLoot] = useState(0)

  const dispatch = useDispatch()

  const checkMissingParts = (robot) =>{
    if(
      robot.head == undefined 
      || robot.torso == undefined 
      || robot.leftLeg == undefined 
      || robot.rightLeg == undefined
      || robot.rightArm == undefined
      || robot.leftArm == undefined)
    {
      return true
    }else{
      return false
    }
  }

  const startBattle = () => {
    if(!autoBattle){
      setShowResults(false)
      navigation.navigate('Battle', {
        playerRobot: selectedBot,
        enemyRobot: selectedBattle
      })
    }else{
      const winningChance = ((getPonderedTier(selectedBot)/getPonderedTier(selectedBattle))) * 100
      if((Math.random() * 100) <= winningChance){
        setLootTitle("Você Venceu!")
        const value = selectedBattle.tier * 40
        setLoot(value)
        dispatch(increaseScrap(value))
        
        setShowLoot(true) 
      }else{
        setLootTitle("Você Perdeu!")
        setLoot(0)
        setShowLoot(true) 
      }
      setSelectedBattle()
      generateBattles()


    }
      
  }

  const closeResults = () => {
    setSelectedBattle()
    setShowResults(false)
    setSearchValue("")
  }

  const getRandomPart = (slot, minTier = 0) => {
    return allParts.filter(x=>x.slot == slot && x.tier >= minTier)[Math.floor(Math.random() * (allParts.filter(x=>x.slot == slot && x.tier >= minTier).length-1))]
  }

  const getPonderedTier = (robot : RobotType) => {
    return Math.floor((robot?.head?.tier + robot?.torso?.tier + robot?.rightArm?.tier + robot?.leftArm?.tier + robot?.rightLeg?.tier + robot?.leftLeg?.tier)/6)
  }


  const generateName = () => {
    let preName = '';
    const preNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let c = 0;
    while (c < 5) {
      const index = Math.random() * preNameChars.length;
      preName += preNameChars.charAt(index);
      c++;
    }
    
    const code = Math.floor(Math.random()*999);
    
    return preName+'-'+code.toString();

  }

  const generateBattles = () => {
    let c = 0
    const robots = []
    while(c<=20){
      const robot : RobotType & {tier: Number}= {
          id: c,
          name: generateName(),
          head: {...getRandomPart("head", Math.floor(c/4))},
          torso: {...getRandomPart("torso", Math.floor(c/4))},
          rightArm: {...getRandomPart("arm", Math.floor(c/4))},
          leftArm: {...getRandomPart("arm", Math.floor(c/4))},
          rightLeg: {...getRandomPart("leg", Math.floor(c/4))},
          leftLeg: {...getRandomPart("leg", Math.floor(c/4))},
          tier: 0
      }
      robot.tier = getPonderedTier(robot);
      robots.push(robot)
      c++;
    }

    setBattles(robots)
  }

  useEffect(() =>{
    generateBattles()
  },[])


  useEffect(() => {

    console.log(route.params?.win)
    
    if(route.params?.win != undefined){
      if(route.params?.win == 0){
        setLootTitle("Você Perdeu!")
        setLoot(0)
      }else if(route.params?.win == 1){
        setLootTitle("Você Venceu!")
        const value = selectedBattle.tier * 50
        setLoot(value)
        dispatch(increaseScrap(value))
      }else if(route.params?.win == 2){
        setLootTitle("Você Fugiu!")
        setLoot(0)
      }

      setShowLoot(true) 
    }

    generateBattles()
    setSelectedBattle()
    setSelectedBot()
    if(route.params?.playerRobot) {
      dispatch(updateRobot(route.params?.playerRobot))
    }
  }, [route.params?.playerRobot, route.params?.win]);

  return(
    <SafeAreaView style={{flex: 1, padding: 7, backgroundColor:colors.backgroundColor}}>

    <ConfirmModal isOpen={showLoot} title={lootTitle} onClose={() => {setShowLoot(false)}}>
      <Text style={{fontSize:30, color:colors.font}}>Você recebeu : {loot} sucatas! </Text>
    </ConfirmModal>

    <Modal
        style={{margin: 0}}
        propagateSwipe={true}
        isVisible={showResults}
        hasBackdrop={true}

        >
      <View style={{flex: 1}}>
        <View style={{
          display:"flex", 
          flexDirection:"row", 
          justifyContent:"center", 
          alignItems:"center",
          backgroundColor:colors.primary, 
          padding: 5, 
          borderTopLeftRadius: 4, borderTopRightRadius: 4}}>
          <CustomInput placeholder={"Pesquisar Batalhas..."} 
            containerStyle={{
              width:"70%",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }}
            wrapperStyle={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRightWidth: 0,
            }} value={searchValue} setValue={setSearchValue}/>
          <CustomButton title="Fechar" 
            style={{
              padding:7,
              borderColor:"lightgray",
              borderWidth: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeftWidth: 0
            }}
            onClick={closeResults}/>
        </View>
        <ScrollView  style={{flex:1, backgroundColor:colors.accent}}>
          <View style={{
            flex:1, 
            backgroundColor:colors.accent,
            padding: 8,
            gap: 8,
            }}>
            {
              battles.sort((a,b) => a.tier - b.tier).filter( x=> x.name.toLowerCase().includes(searchValue.toLowerCase())).map((i) => {
                return(
                  <BattleCard robot={i} selected={selectedBattle == i} onPress={() => {
                    if(selectedBattle!=i) setSelectedBattle(i)
                    else setSelectedBattle()
                  }}/>
                 )
              })
            }
          </View>
          
        </ScrollView>
        <View style={{
          display:"flex", 
          flexDirection:"row", 
          justifyContent:"space-between", 
          alignItems:"center",
          backgroundColor:colors.primary, 
          padding: 5, 
          gap: 20,
          borderBottomLeftRadius: 4, borderBottomRightRadius: 4}}>
          <View style={{display:"flex", flexDirection:"column", alignItems:"center", gap: 5}}>
            <Text style={{color: colors.font}} >Batalha Automática</Text>
            <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={autoBattle} onValueChange={()=>{setAutoBattle(!autoBattle)}}/>
          </View>
          <CustomButton 
            title={"Batalhar"} 
            style={{flex: 1}}
            disabled={
              selectedBot == undefined 
              || checkMissingParts(selectedBot) 
              || selectedBattle == undefined
              || getHealth(selectedBot) <= 0
            }
            onClick={startBattle}
            />
        </View>
      </View>
    </Modal>
    {robots.length > 0?
      <View style={{backgroundColor:colors.secondary, borderRadius: 8, width:"100%",padding:10}}>
        {selectedBot? 
        <View>
          <View style={{display:"flex",flexDirection:"row",marginBottom:5, gap:10}}>
            {selectedBot.head?.image != undefined? 
                     <Image style={{ height:75, width:75 }} source={selectedBot.head.image} />
                    : 
                       <View style={{backgroundColor:selectedBot.head?.backgroundColor, height:75, width:75}}></View>
                    }
           
            <View style={{flex:1, height:75}}>
              <Text style={{color: colors.font}}> {selectedBot.name}</Text>
              <LifeBar  
                width={"100%"}
                curHealth={getHealth(selectedBot)}
                maxHealth={getMaxHealth(selectedBot)}
              />
              <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
              <Text style={{color: colors.font}}>Peso: {getWeight(selectedBot)}</Text>
              <Text style={{color: colors.font}}>Energia Base: {getBaseEnergy(selectedBot)}</Text>
              </View>
              
            </View>
          </View>

          <View style={{marginBottom:20}}>
              <Text>Skills:</Text>
              <View style={{gap: 7, marginTop: 5}}>
                <View style={{display:"flex", flexDirection:"row", gap:7}}>
                  <SkillCard skill={selectedBot.head?.skill} tier={selectedBot.head?.tier}/>
                  <SkillCard skill={selectedBot.torso?.skill} tier={selectedBot.torso?.tier} />
                </View>
                <View style={{display:"flex", flexDirection:"row", gap:7}}>
                  <SkillCard skill={selectedBot.leftArm?.skill} tier={selectedBot.leftArm?.tier} />
                  <SkillCard skill={selectedBot.rightArm?.skill} tier={selectedBot.rightArm?.tier} />
                </View>
                <View style={{display:"flex", flexDirection:"row", gap:7}}>
                  <SkillCard skill={selectedBot.leftLeg?.skill} tier={selectedBot.leftLeg?.tier} />
                  <SkillCard skill={selectedBot.rightLeg?.skill} tier={selectedBot.rightLeg?.tier} />
                </View>
              </View>
            
            </View>
            
          {checkMissingParts(selectedBot) && 
            (
            <View style={{width:"100%",padding:10, alignItems:"center"}}>
                <Text style={{color:"red", textAlign:"center", marginBottom: 5}}>Você não pode batalhar com um robo incompleto! Monte na </Text>
                <CustomButton title={"Oficina"}onClick={() => {navigation.navigate("Oficina")}}/>
              </View>
            )
          }
          {getHealth(selectedBot) <= 0 && 
            (
              <View style={{width:"100%",padding:10, alignItems:"center"}}>
                <Text style={{color:"red", textAlign:"center", marginBottom: 5}}>Você não pode batalhar com um robo destruído! Conserte na </Text>
                <CustomButton title={"Oficina"}onClick={() => {navigation.navigate("Oficina")}}/>
              </View>
            )
          }
        </View>
        :
         <View style={{backgroundColor:colors.accent, borderRadius: 8, width:"100%",padding:10, alignItems:"center"}}>
          <Text style={{fontSize:20, color:colors.font}}>Selecione um Robô!</Text>
        </View>
        }

        <Text style={{color:colors.font}}>Todos os robos</Text>
        <ScrollView horizontal={true}>
        <View style={{flex: 1, display:"flex", flexDirection:"row", gap:5, alignItems:"center"}}>
            {robots.map((robot) => {
              return(
                <RobotCard robot={robot} onPress={() => {setSelectedBot({...robot})}} selected={selectedBot?.id == robot.id}/>
              )
            })}
          </View>
        </ScrollView>
       
      </View>
      :
      <View style={{backgroundColor:colors.accent, borderRadius: 8, width:"100%",padding:10, alignItems:"center"}}>
          <Text style={{color:colors.font}}>Sem robos!</Text>
          <CustomButton title="Vá para a Oficina!" onClick={() => {navigation.navigate("Oficina")}}/>
      </View>
    }
    <View style={{
 
      justifyContent:"center", 
      alignItems:"center",
      backgroundColor:colors.primary  , 
      padding: 5, 
      borderTopLeftRadius: 4, borderTopRightRadius: 4}}>
      <Text style={{textAlign:"center", color:colors.font}}>Batalhas Recomendadas</Text>
      <View style={{
      marginTop: 10,
      display:"flex", 
      flexDirection:"row", 
      justifyContent:"center", 
      }}>
      
        <CustomInput placeholder={"Mais Batalhas..."} 
          containerStyle={{
            width:"70%",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }}
          wrapperStyle={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRightWidth: 0,
          }} value={searchValue} setValue={setSearchValue} />
        <CustomButton title="Pesquisar" 
          style={{
            padding:7,
            borderColor:"lightgray",
            borderWidth: 1,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeftWidth: 0
          }}
          onClick={() => {setShowResults(true)}}/>
        </View>
    </View>
  {
    battles.filter(x=> x.tier <= getPonderedTier(selectedBot)).length > 0?
  
    <ScrollView>
      <View style={{
        flex:1, 
        backgroundColor:colors.accent,
        padding: 8,
        gap: 8,
        }}>
        {
          battles.sort((a,b) => a.tier - b.tier).filter(x=> x.tier <= getPonderedTier(selectedBot)).map((i) => {
            return(
              <BattleCard robot={i} selected={selectedBattle == i} onPress={() => {
                    if(selectedBattle!=i) setSelectedBattle(i)
                    else setSelectedBattle()
                  }}/>
              )
          })
        }
      </View>
      
    </ScrollView>
    :
    <View style={{flex:1, padding: 10, justifyContent:"center", backgroundColor:colors.accent}}>
      <Text style={{fontSize:20, textAlign:"center", color: colors.font}}>Sem Batalhas Recomendadas para esse robô! Veja mais batalhas clicando em pesquisar!</Text>
    </View>
    }
    <View style={{
      display:"flex", 
      flexDirection:"row", 
      justifyContent:"space-between", 
      alignItems:"center",
      backgroundColor:colors.primary, 
      padding: 5, 
      gap: 20,
      borderBottomLeftRadius: 4, borderBottomRightRadius: 4}}>
      <View style={{display:"flex", flexDirection:"column", alignItems:"center", gap: 5}}>
        <Text style={{color: colors.font}}>Batalha Automática</Text>
        <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={autoBattle} onValueChange={()=>{setAutoBattle(!autoBattle)}}/>
      </View>
      <CustomButton 
        title={"Batalhar"} 
        style={{flex: 1}}
        disabled={
          selectedBot == undefined 
          || checkMissingParts(selectedBot) 
          || selectedBattle == undefined
          || getHealth(selectedBot) <= 0
        }
        onClick={startBattle}
        />
      
    </View>
    </SafeAreaView>
  )
}