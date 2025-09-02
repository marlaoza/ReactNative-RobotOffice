import {StyleSheet} from 'react-native'

export default RoboCardStyles = (colors: any) => StyleSheet.create({
  cardHeader: {
    backgroundColor: colors.accent,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  cardImg:{
    height:130, 
    backgroundColor: "gray",
    alignItems:"center",
    justifyContent:"end",
    width:"100%"
  }
})