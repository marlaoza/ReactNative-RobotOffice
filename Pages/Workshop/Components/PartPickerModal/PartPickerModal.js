import {View, Pressable, Text, Image, ScrollView} from "react-native"
import Modal from 'react-native-modal'
import LifeBar from "../../../../Components/LifeBar/LifeBar"
import CustomButtom from "../../../../Components/CustomButton/CustomButton"
import {useTheme} from '@react-navigation/native';
import {slotName} from "../../../../Utils/Funcs"

export default PartPickerModal = ({isOpen, onClose, pos, slot, onRepair, disabledRepair, repairPrice, allParts, robot}) => {
  const { colors } = useTheme();
  
  return(
    <Modal
        propagateSwipe
        style={{margin:0}}
        isVisible={isOpen}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        hasBackdrop={false}
        coverScreen={false}
        onSwipeComplete={onClose}
        swipeDirection="down">
        <View style={{height:"40%", width:"100%", backgroundColor:colors.accent, position:"absolute", bottom:0}}>
          <View 
            style={{
              display:"flex", 
              flexDirection:"row", 
              justifyContent:"space-between", 
              backgroundColor:colors.contrast, 
              padding: 5,
              alignItems: "center"}}>
            <Text style={{color: "white", fontWeight:"bold"}}>{slotName(slot)}s</Text>
            <CustomButtom onClick={onClose} title={"X"}/>
          </View>
          <View style={{padding: 10}}>
          {
            robot[pos+slot] != undefined &&
          
          
          <View 
            style={{
            backgroundColor:colors.secondary, 
            borderRadius: 6, 
            width:"100%", 
            display:"flex", 
            flexDirection:"row", 
            gap:5, 
            padding: 10,   
            }}>
              <View style={{width:"10%", height: 50}} >
                <Image source={robot[pos+slot].image} resizeMode={"contain"} style={{width: "100%", height: 50}}/>
              </View>
              <View style={{display:"flex", flexDirection:"column", gap: 5, width:"88%"}}>

                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                  <Text style={{color:colors.font}}>{robot[pos+slot].name}</Text>
                  <Text style={{color:colors.font}}>Tier: {robot[pos+slot].tier}</Text>
                </View>
                  
                
                <View style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between",alignItems:"center", gap: 5}}>
                  <View style={{
                    flex: 1,
                    alignItems:"center"
                  }}>
                    <LifeBar  
                      width="100%"
                      curHealth={robot[pos+slot].curHealth}
                      maxHealth={robot[pos+slot].maxHealth}
                    />
                  </View>
                  
                  
                  <View style={{display:"flex", flexDirection:"row", alignItems:"center", gap: 5}}>
                    <View style={{padding: 5, backgroundColor:  "gray",  borderRadius: 4}}>
                      <Text style={{fontSize: 12, color:"white"}}> {repairPrice} Sucatas</Text>
                    </View>
                    <CustomButtom style={{fontSize: 12, padding: 5}} title={"Reparar"} 
                      disabled={disabledRepair}
                      onClick={onRepair}/>
                  </View>
                </View>


                <View style={{borderRadius: 5}}>
                  <Text style={{color:colors.font, position:"absolute", top:-10, left:0, zIndex: 1, paddingVertical: 2,paddingHorizontal: 5, backgroundColor:colors.primary,width:"fit-content", borderWidth: 1, borderBottomWidth: 0, borderColor: "black"}}>
                    Habilidade
                  </Text>
                  <View style={{
                    backgroundColor:colors.primary,paddingTop: 10, marginTop:13, borderWidth: 1, borderColor:"black", padding: 5
                  }}>
                    <View style={{
                    
                    display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", }}>
                    <Text style={{color:colors.font}}>{robot[pos+slot].skill?.name}</Text>
                    <Text style={{color:colors.detail, fontWeight:"bold"}}>Custo: {robot[pos+slot].skill?.cost}</Text>
                  </View>
                  <Text style={{color:colors.font}}>{robot[pos+slot].skill?.desc}</Text>
                  </View>
                  
                </View>

              </View>
          </View>
          
          }
          
            <Text style={{color: colors.font}}>Partes Disponíveis</Text>
            <ScrollView horizontal={true}>
              {allParts.filter(x => x.slot?.toLowerCase() == slot.toLowerCase()).sort((a, b) => b.id - a.id).map((item) => {
                return(
                  <Pressable onPress={() => {changePart([pos+slot], item)}}> 
                    <View style={{padding: 5, display:"flex", flexDirection:"column", gap: 5, justifyContent:"center", alignItems:"center", backgroundColor:colors.secondary}}>
                      <Image source={item.image} resizeMode={"contain"} style={{height:50, width: 50}}/>
                      <Text style={{fontSize:12,color:colors.font}}> {item.name} </Text>
                      <LifeBar  
                        width={50}
                        curHealth={item.curHealth}
                        maxHealth={item.maxHealth}
                      />
                    </View> 
                  </Pressable>
                )
              })}
            </ScrollView>
          
          </View>
        </View>
      </Modal>

  )
}