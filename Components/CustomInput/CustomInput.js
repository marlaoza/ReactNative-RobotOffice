import {View, Text, TextInput, Switch} from "react-native"
import {useState} from 'react'

import { useTheme } from '@react-navigation/native';





export default CustomInput = ({placeholder, value, setValue, type, containerStyle, wrapperStyle, style, disabled = false, invalid = false, invalidMessage = "", onFocus}) => {
  const numberFilter = (val) => {
   return val.replace(/[^0-9]/g, '')
  }

  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false)

  return(
    <View style={[{width:"100%"},{...containerStyle}]}>
      <View style={[{display:"flex", flexDirection:"row",
      borderColor:invalid? "red" : "lightgray",
      borderWidth: 1,
      borderRadius: 6,
      width:"100%"}, {...wrapperStyle}]}>
        <TextInput 
          onFocus={onFocus}
          secureTextEntry={type == "password" && !showPassword? true : false}
          editable={!disabled}
          placeholder={placeholder} 
          keyboardType={type == "number"? "numeric" : "default"}
          placeholderTextColor={colors.contrast}
          style={[{minHeight: 30, paddingHorizontal: 10, paddingVertical:7, width:"100%", fontSize:style?.fontSize, color:colors.font},  {...style}]} 
          value={value} 
          onChangeText={(val) => {
            type=="number"? setValue(numberFilter(val)) : setValue(val)}}/>

          {
            type == "password" &&
              <View style={{
                display:"flex",
                flexDirection:"column",
                backgroundColor:"gray", 
                justifyContent: 'center',
                paddingHorizontal: 5}}>
                <Switch 
                  disabled={disabled}
                  value={showPassword} 
                  onValueChange={() => {setShowPassword(!showPassword)}}
                />
              </View>
          }

      </View>
     

      {invalidMessage.trim().length > 0 && <Text style={{color:"red"}}>{invalidMessage}</Text>}
    </View>
  )
}