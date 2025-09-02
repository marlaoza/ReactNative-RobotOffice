import {View, Pressable, Text, SafeAreaView, Image} from 'react-native';
import {useState, useEffect, useMemo} from 'react'
import WorkshopStyles from "./Styles"
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal"

import {useSelector, useDispatch} from 'react-redux'
import {addRobot, removeRobot, updateRobot, addToInventory} from "../../Utils/Context"

import RoboCard from "./Components/RoboCard/RoboCard"
import { useTheme } from '@react-navigation/native';





export default WorkShop = ({route , navigation}) => {
  const allRobots = useSelector((state) => state.robots);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const workshopStyle = useMemo(() => WorkshopStyles(colors), [colors]);

  const [idToRemove, setIdToRemove] = useState(0)

  useEffect(() => {
    if (route.params?.robot) {
      if(route.params?.robot.id == -1){
        const r = {...route.params?.robot};
        r.id = allRobots.length > 0? allRobots[allRobots.length - 1].id + 1 : 1
        console.log(r)
        dispatch(addRobot(r))
      }else{
        dispatch(updateRobot(route.params?.robot))
      }
    }
  }, [route.params?.robot]);

  
  const openBuilder = (robot) => {
    navigation.navigate('RobotBuilder', {
      robot: robot,
    })
  }
  
  const remove = () => {
    console.log(idToRemove)
    dispatch(removeRobot(idToRemove))
    setIdToRemove(0)
  }
  
  return(
    <SafeAreaView style={{flex: 1, padding: 7}}>

      <ConfirmModal isOpen={idToRemove > 0} onClose={() => setIdToRemove(0)} onConfirm={remove} title="Remover Robô">
         <Text style={{fontSize:30}}>Certeza que deseja deletar esse Robô?</Text>
      </ConfirmModal>
      
      <View style={{display:"flex", flexDirection:"row", gap:7, flexWrap:"wrap"}}>
        {allRobots.map((robot) => {
          return(
            <RoboCard
            editClick={() => {openBuilder(robot)}} removeClick={setIdToRemove}  robot={robot}
            />
          )
        })}
        <Pressable style={workshopStyle.newRobotContainer} 
        onPress={() => {openBuilder({id:-1})}} >
      
          <View style={workshopStyle.newRobotView}>
            <Text style={{color: "white", fontWeight: 'bold'}}>+NOVO ROBO</Text>
          </View>
        
        </Pressable>
        
      </View>
    </SafeAreaView>
  )
}