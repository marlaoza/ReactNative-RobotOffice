import Modal from 'react-native-modal'
import {View, Text} from 'react-native';
import CustomButton from "../CustomButton/CustomButton"

import { useTheme } from '@react-navigation/native';




export default ConfirmModal = ({title, onConfirm, isOpen, onClose, onCancel, children}) => {
  const { colors } = useTheme();
  return(
    <Modal
        propagateSwipe
        style={{margin:25}}
        isVisible={isOpen}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        hasBackdrop={true}
        coverScreen={false}
        >
        <View style={{
          height:"50%",
          backgroundColor:colors.primary,
          borderRadius: 8,
        }}>
          <View style={{padding: 10, backgroundColor:colors.detail, borderTopRightRadius: 8, borderTopLeftRadius: 8, alignItems:"center"}}><Text style={{color:"white", fontWeight:"bold"}}>{title}</Text></View>
          <View style={{flex:1, padding: 15}}>
            {children}
            <View style={{display:"flex", flexDirection:"row", justifyContent:"end", gap: 5, position: "absolute", bottom: 15, right: 15}}>
              <CustomButton title="Fechar" onClick={() => {onClose(); if(onCancel != undefined){onCancel();}}}/>
              {onConfirm != undefined && <CustomButton title="Confirmar" onClick={onConfirm}/>}
            </View>
          </View>
        </View>
      </Modal>
  )
}