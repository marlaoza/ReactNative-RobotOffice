import {StyleSheet} from 'react-native'

export default NavStyles = (colors: any) => StyleSheet.create({
   topBar : {
    paddingTop:50,
    height: 100,
    backgroundColor:colors.primary,
    width:"100%", 
    borderBottomColor: colors.detail,
    borderBottomWidth:2,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  navItem: {
    padding:20,
    backgroundColor:colors.secondary,
    display:"flex",
    flexDirection:"row"
  },
  activeNavItem: {
    padding:20,
    backgroundColor:colors.primary,
    display:"flex",
    flexDirection:"row"
  }
})