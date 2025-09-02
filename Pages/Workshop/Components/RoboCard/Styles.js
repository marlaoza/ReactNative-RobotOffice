import {StyleSheet} from 'react-native'

export default RoboCardStyles = (colors: any) => StyleSheet.create({
  cardHeader: {
    backgroundColor: colors.primary,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  cardImg:{
    height:130, 
    alignItems:"center",
    justifyContent:"center",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.primary,
    width:"100%"
  }
})