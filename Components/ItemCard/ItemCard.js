import {View,Text, Image} from 'react-native';
import {CheckBox} from 'react-native-elements'
import { useTheme } from '@react-navigation/native';

export default ItemCard = ({item, selected, onSelect}) => {
  const { colors } = useTheme();
  return(
    <View style={{
                backgroundColor:colors.primary,
                borderRadius: 8,
                }}>
                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", backgroundColor:colors.contrast,
                borderTopRightRadius: 8, borderTopLeftRadius: 8, paddingVertical: 5, paddingRight: 8}}>
                  <CheckBox 
                    containerStyle={{ margin:0, padding:0}} 
                    wrapperStyle={{margin:0,padding:0}}
                    checked={selected} onPress={onSelect} />
                  <Text style={{textAlign:"center", color:"white"}}>{item.name}</Text>
                  <Text style={{textAlign:"center", color:"white"}}>Preço: {item.price}</Text>
                </View>
                <View style={{padding: 5, display:"flex", flexDirection:"row", gap: 10}}>
                  <Image source={item.image} resizeMode={"contain"} style={{height: 50, width: 50}}/>
                  <View style={{
                    backgroundColor:colors.primary,paddingTop: 10, marginTop: 1, padding: 2, flex: 1
                  }}>
                    <View style={{
                    
                    display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", }}>
                    <Text style={{color: colors.font}}>{item.skill?.name}</Text>
                    <Text style={{color: colors.font}}>Custo: {item.skill?.cost}</Text>
                  </View>
                  <Text style={{color: colors.font}}>{item.skill?.desc}</Text>
                  </View>
                  
                </View>

                
    </View>
    )
}