import {Pressable, Text} from 'react-native';
import { useTheme } from '@react-navigation/native';


export default CustomButton = ({title, onClick, disabled = false, style}) => {
  const { colors } = useTheme();
  return(
    <Pressable style={{backgroundColor: disabled? colors.secondary : colors.detail, padding: 10, borderRadius: 4, alignItems:"center", ...style}} disabled={disabled} onPress={onClick}>
      <Text style={{color:disabled? "gray" : "white", fontSize:style?.fontSize}}>{title}</Text>
    </Pressable>
  )
}