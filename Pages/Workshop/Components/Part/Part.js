import {View, Pressable, Text, Image} from "react-native"
import PartStyles from "./Styles"
import {useMemo} from 'react'
import {useTheme} from '@react-navigation/native';

export default Part = ({part, onClick, flip = false}) => {
  const { colors } = useTheme();
  const componentStyle = useMemo(() => PartStyles(colors), [colors]);

  return(
    <Pressable 
      onPress={onClick}
      >
      {part?.image != undefined?
        <Image source={part.image} style={{width: part.width, height: part.height, 
          transform: [
            { scaleX: flip? -1  : 1}
          ]
        }}/>
        :
        <View style={{
        backgroundColor: part?.backgroundColor || "gray", 
        width: part?.width || 75, 
        height: part?.height || 75, 
        margin: part != undefined? 0 : 10, 
        borderRadius: 4}}>
          <Text style={{color:"white", fontWeight:"bold"}}> + </Text>
        </View>
        
      }
    </Pressable>
  )
}
