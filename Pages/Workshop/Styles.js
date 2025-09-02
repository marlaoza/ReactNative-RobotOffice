import {StyleSheet} from 'react-native'

export default WorkshopStyles = (colors: any) => StyleSheet.create({
  newRobotContainer:
  {
    width:145, 
    borderRadius:5, 
    justifyContent:"center"
  },
  newRobotView:
  {
    height: 130, 
    borderRadius: 5,  
    backgroundColor: colors.detail,
    alignItems:"center",
    justifyContent:"center",
    width:"100%"
  }
   
})