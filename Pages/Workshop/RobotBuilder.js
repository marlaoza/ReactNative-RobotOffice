import {View, Pressable, Text, TextInput, ScrollView, SafeAreaView,Image, ImageBackground} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromInventory, addToInventory, decreaseScrap} from "../../Utils/Context"
import {slotName} from "../../Utils/Funcs"
import Modal from 'react-native-modal'
import LifeBar from "../../Components/LifeBar/LifeBar"
import CustomButton from "../../Components/CustomButton/CustomButton"
import CustomInput from "../../Components/CustomInput/CustomInput"
import Part from "./Components/Part/Part"
import PartPickerModal from "./Components/PartPickerModal/PartPickerModal"
export default RobotBuilder = ({navigation, route }) => {
  const allParts = useSelector((state)=> state.inventory)
  const scrap = useSelector((state)=> state.scrap)
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const {robot} = route.params;

  const [slot, setCurSlot] = useState("")
  const [pos, setPos] = useState("")
  const [isPartPickerOpen, setPartPickerOpen] = useState(false)

  const openPartPicker = (part : String) => {
    setPos("")
    if(typeof part === "string"){
      setCurSlot(part)
      if(part.includes("right") || part.includes("left")){
        index = part.indexOf("Arm")
        if(index < 0) index = part.indexOf("Leg")
        
        setPos(part.substring(0, index))
        setCurSlot(part.substring(index))
      }
      setPartPickerOpen(true)
    }
  }

  const closePartPicker = () => {
    setCurSlot("")
    setPos("none")
    setPartPickerOpen(false)
  }

  const changePart = (property, value) => {
    if(property != "name"){
      const oldPart = {...robot[property]};
      console.log(allParts.length)
      console.log(allParts[allParts.length - 1].id)
      oldPart.id = allParts.length > 0? allParts[allParts.length - 1].id + 1 : 1
      console.log(oldPart);
      dispatch(removeFromInventory([value.id]))
      dispatch(addToInventory([oldPart]))
    }

    const ccpy = {...robot}
    ccpy[property] = value
    navigation.setParams({
      robot: ccpy
    });
  }

  const getRepairPrice = (curHealth, maxHealth) =>{
    const prct = (curHealth/maxHealth) * 20;
    return 20 - prct
  }

  const repairPart = () => {
    const part = {...robot[pos+slot]}
    const price = getRepairPrice(part?.curHealth || 0, part?.maxHealth || 0)

    part.curHealth = part.maxHealth
    const ccpy = {...robot}
    ccpy[pos+slot] = part

    navigation.setParams({
      robot: ccpy
    });

    dispatch(decreaseScrap(price))

  }

  console.log(scrap)
  console.log(getRepairPrice(robot[pos+slot], robot[pos+slot]))
  return(
    <View style={{flex:1}}>
    <ImageBackground resizeMode="stretch" style={{flex: 1, justifyContent:"center", alignItems:"center", height:"100%",width:"100%"}} source={require("../../Assets/workshop.jpg")}>
      <PartPickerModal 
        isOpen={isPartPickerOpen} 
        onClose={closePartPicker} 
        slot={slot} 
        pos={pos} 
        onRepair={repairPart}
        disabledRepair={
          scrap <= getRepairPrice(robot[pos+slot]?.curHealth,robot[pos+slot]?.maxHealth)
          || getRepairPrice(robot[pos+slot]?.curHealth, robot[pos+slot]?.maxHealth) <= 0
        }
        repairPrice={getRepairPrice(robot[pos+slot]?.curHealth,robot[pos+slot]?.maxHealth)}
        allParts={allParts}
        robot={robot}
      />
        <View style={{minWidth:300, maxWidth:380,top: isPartPickerOpen? -100 : 0}}>
        <View 
          style={{
            display: "flex", 
            flexDirection:"row", 
            backgroundColor:colors.accent, 
            width:"100%", 
            justifyContent:"space-between", 
            alignItems:"end",
            padding: 5,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            }}>
          <View style={{display:"flex", flexDirection:"column", gap: 5}}>
            <Text style={{color: colors.font}}> Nome: </Text>
            <CustomInput containerStyle={{width: "70%"}} placeholder="Nome" value={robot?.name} setValue={(val) => {changePart("name",val)}} /> 
          </View>
          <CustomButton title={"Salvar"} onClick={() => {navigation.popTo('Oficina', { robot: robot })}}/>

          
          </View>
        <View 
          style={{
            backgroundColor:"rgba(0,0,0,0.7)", 
            justifyContent:"center", 
            minWidth:300, 
            minHeight: 300, 
            padding: 20, 
            maxHeight:700, 
            maxWidth:380, 
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            alignItems:"center"
          }}>

        
          <View style={{alignItems:"center"}}>
            <Part part={robot?.head} onClick={() => {openPartPicker("head")}} />

            <View 
              style={{
                display:"flex", 
                flexDirection:"row", 
                height:robot?.torso?.height || 75, 
                marginBottom: robot?.torso? 0 : 20, 
                }}>

              <Part part={robot?.rightArm} onClick={() => {openPartPicker("rightArm")}}/>
              <Part part={robot?.torso} onClick={() => {openPartPicker("torso")}}/>
              <Part part={robot?.leftArm} onClick={() => {openPartPicker("leftArm")}} flip={true}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center", gap: 10}}>
              <Part part={robot?.rightLeg} onClick={() => {openPartPicker( "rightLeg")}}/>
              <Part part={robot?.leftLeg} onClick={() => {openPartPicker("leftLeg")}} flip={true}/>
            </View>
            
          </View>
        </View>
      </View>
    </ImageBackground>
    </View>
  )
}