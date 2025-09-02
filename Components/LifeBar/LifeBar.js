import {View} from "react-native"
import { useTheme } from '@react-navigation/native';

export default LifeBar = ({curHealth, maxHealth, width = "100%"}) => {
  const { colors } = useTheme();
  return(
    <View style={{width:width}}>
      <View style={{width:"100%", borderColor:colors.secondary, borderWidth: 4, borderRadius: 20}}/>
      <View style={{
        marginTop:-8,
        width:((curHealth/maxHealth) * 100)+"%", 
        borderColor: colors.detail, 
        borderWidth: 4, borderRadius: 20
      }}/>
    </View>
  )
}