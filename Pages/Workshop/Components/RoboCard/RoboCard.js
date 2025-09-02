import {View, Pressable, Text, Image} from "react-native"
import LifeBar from "../../../../Components/LifeBar/LifeBar"
import GlobalStyles from "../../../../Utils/Styles"
import RoboCardStyles from "./Styles"
import {useMemo} from 'react'
import {useTheme} from '@react-navigation/native';
import {getHealth, getMaxHealth} from "../../../../Utils/Funcs"

export default RoboCard = ({editClick, removeClick, robot}) => {
  const { colors } = useTheme();
  const componentStyle = useMemo(() => RoboCardStyles(colors), [colors]);
  const globalStyle = useMemo(() => GlobalStyles(colors), [colors]);
  
  return(
    <View style={{width: 145, borderRadius:5, margin:5}}>
      <View style={componentStyle.cardHeader}>
        <Text style={globalStyle.text}>{robot?.name}</Text>
        <Pressable style={globalStyle.text} onPress={() => {removeClick(robot?.id)}}> <Text style={globalStyle.text}>X</Text> </Pressable>
      </View>
      <View style={componentStyle.cardImg}>
      {robot.head?.image != undefined &&
        <Image style={{ height:"80%", width:"80%" }} source={robot.head.image} />
      }
      </View>
      <View style={componentStyle.cardHeader}>
        <LifeBar maxHealth={getMaxHealth(robot)} curHealth={getHealth(robot)} width={"50%"}/>
        <Pressable style={globalStyle.text} onPress={editClick}> <Text style={globalStyle.text}> Editar </Text> </Pressable>
      </View>
    </View>

  )
}