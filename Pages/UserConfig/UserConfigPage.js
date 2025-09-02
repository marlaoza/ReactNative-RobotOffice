import {SafeAreaView, Switch, View, Text} from "react-native"

import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {resetData} from "../../Utils/Context"

import {users} from "../../Utils/Data"
import CustomInput from "../../Components/CustomInput/CustomInput"
import CustomButtom from "../../Components/CustomButton/CustomButton"

import { useTheme } from '@react-navigation/native';

export default UserConfigPage = ({navigation, route}) => {
  const { colors } = useTheme();

  const userId = useSelector((state) => state.user.id)
  const dispatch = useDispatch()
  const userInfo = users.find(x=> x.id == userId)
  const [nameVal, setNameVal] = useState(userInfo?.username)
  const [emailVal, setEmailVal] = useState(userInfo?.email)
  const [passwordVal, setPasswordVal] = useState(userInfo?.password)

  const [refresh, setRefresh] = useState(0);

  const [enableEdit, setEnableEdit] = useState(false)
  const updateCadastro = () => {
    userInfo.username = nameVal
    userInfo.email = emailVal
    userInfo.password = passwordVal
    setRefresh(refresh == 0? 1 : 0)
  }

  return(
    <SafeAreaView style={{padding: 20, flex: 1}}>
      <View id={refresh.toString()} style={{borderRadius: 8, backgroundColor:colors.primary, padding:5, gap: 10, flex:1}}>
        <Text style={{textAlign:"center", color:colors.font, fontSize: 20, paddingVertical: 15}}>Bem Vindo, {userInfo.username}</Text>
        <View style={{display:"flex", flexDirection:"row",alignItems:"center", gap: 5, justifyContent:"center"}}>
          <Text style={{color:colors.font}}>Habilitar Edição:  </Text>
          <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={enableEdit} onValueChange={ (val) => {setEnableEdit(!enableEdit)}}/>
        </View>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", gap: 5}}>
          <Text style={{color:colors.font}}> Nome:  </Text>
          <CustomInput value={nameVal} setValue={setNameVal} disabled={!enableEdit} containerStyle={{width: "85%"}}/>
        </View>
         <View style={{display:"flex", flexDirection:"row", alignItems:"center", gap: 5}}>
          <Text style={{color:colors.font}}> E-mail:  </Text>
          <CustomInput value={emailVal} setValue={setEmailVal} disabled={!enableEdit} containerStyle={{width: "85%"}}/>
        </View>
         <View style={{display:"flex", flexDirection:"row", alignItems:"center", gap: 5}}>
          <Text style={{color:colors.font}}> Senha:  </Text>
          <CustomInput value={passwordVal} setValue={setPasswordVal} type="password" style={{flex:1}} disabled={!enableEdit} containerStyle={{width: "85%"}}/>
        </View>
        <CustomButtom title="Salvar Alterações" disabled={!enableEdit} onClick={updateCadastro}/>

        <CustomButtom title="Limpar Progresso ? " onClick={() => {dispatch(resetData())}} style={{marginTop:50}}/>
      </View>
    </SafeAreaView>
  )
}