import {Pressable} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default IconButton = ({icon, size = 20, color="black", onClick}) => {
  return(
    <Pressable onPress={() => {onClick()}}>
      <FontAwesome6 name={icon} size={size} color={color} />
    </Pressable>
  )
}