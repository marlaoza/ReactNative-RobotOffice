import {SafeAreaView, View, Text, Keyboard, Image} from "react-native"
import {useState, useEffect} from "react"
import Modal from 'react-native-modal'
import {users} from "../../Utils/Data"
import {useDispatch} from 'react-redux'
import {setUser, resetData} from "../../Utils/Context"
import CustomButton from "../../Components/CustomButton/CustomButton"
import CustomInput from "../../Components/CustomInput/CustomInput"
import { useTheme } from '@react-navigation/native';

export default LoginPage = ({navigation}) => {
  const { colors } = useTheme();
  const [register, setRegister] = useState(false)
  const [registerOk, setRegisterOk] = useState(false)
  const [registerWarning, setRegisterWarning] = useState("")
  const [registerFields, setRegisterFields] = useState({
    user: {value: "", firstTouch: true},
    email: {value: "", firstTouch: true},
    password: {value: "", firstTouch: true},
    confirmPassword: {value: "", firstTouch: true},
  })

  const [errors, setErrors] = useState({
      user: "",
      email: "",
      password: "",
      confirmPassword: ""
  })

  const [loginField, setLoginFields] = useState({
    userMail: "",
    password: "",
  })
  const [loginWarning, setLoginWarning] = useState("")



  const checkRegisterFields = () => {
    let errors = {
      user: "",
      email: "",
      password: "",
      confirmPassword: ""
    }

    let count = 0
    if(registerFields.user.value.trim().length <= 0 ){
      if(!registerFields.user.firstTouch) errors.user = "Insira um nome de usuário"
      count++;
    }
    if(registerFields.email.value.trim().length <= 0){
      if(!registerFields.email.firstTouch) errors.email = "Insira um email válido!"
      count++;

    } 
    if(registerFields.password.value.trim().length <= 0){
      if(!registerFields.password.firstTouch) errors.password = "Insira uma senha!"
      count++;

    }
    if(registerFields.confirmPassword.value.trim() != registerFields.password.value.trim()){
      if(!registerFields.confirmPassword.firstTouch) errors.confirmPassword = "As senhas devem ser iguais!";
      count++;
    }

    setErrors(errors);
    
    setRegisterOk(count > 0? false : true)
    
  } 

  const registerUser = () => {
    const user = users.find(
       x => 
      (x.username.trim().toLowerCase() == registerFields.user.value.trim().toLowerCase() 
      || 
      x.email.trim().toLowerCase() == registerFields.email.value.trim().toLowerCase() )
    )
    console.log(user)
    if(user == undefined){
      const id = users[users.length-1].id + 1
      users.push({
      id: id,
      email:registerFields.email.value.trim().toLowerCase(),
      username:registerFields.user.value.trim().toLowerCase(),
      password:registerFields.password.value.trim()
      })
      dispatch(resetData())
      dispatch(setUser({id: id, name: registerFields.user.value.trim().toLowerCase()}))
      setRegisterFields({
        user: {value: "", error: "", firstTouch: true},
        email: {value: "", error: "", firstTouch: true},
        password: {value: "", error: "", firstTouch: true},
        confirmPassword: {value: "", error: "", firstTouch: true},
      })
      setRegister(false)
      navigation.navigate("Batalhas");
    }else{
      setRegisterWarning("Já existe um usuário registrado com este nome ou email")
      setTimeout(() => {
        setRegisterWarning("")
      }, 1000);
    }
    
  }


  const [keyboardOpen, setkeyboardOpen] = useState(false);

 useEffect(() => {
    const unsubscribeDidShow = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setkeyboardOpen(true); // or some other action
      }
    );
    const unsubscribeDidHide = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setkeyboardOpen(false); // or some other action
      }
    );

    return () => {
      unsubscribeDidHide.remove();
      unsubscribeDidShow.remove();
    };
  }, []);


  const dispatch = useDispatch()

  const checkCredentials = () => {
    const user = users.find(
      x => 
      (x.username.trim().toLowerCase() == loginField.userMail.trim().toLowerCase() 
      || 
      x.email.trim().toLowerCase() == loginField.userMail.trim().toLowerCase() )
      &&
      x.password.trim() == loginField.password.trim()
      )
    if(user == undefined){
      setLoginWarning("Usuário ou senha inválidos!")
      setTimeout(() => {
        setLoginWarning("")
      }, 1000);
    }else{
      dispatch(resetData())
      dispatch(setUser({id: user.id, name: user.username}))
      navigation.navigate("Batalhas");
    }
    
  }


  useEffect(() => {
    checkRegisterFields();
  }, [registerFields])

  return(
    <SafeAreaView style={{flex: 1, backgroundColor:colors.primary}}> 

      <Modal
        style={{margin: 0, flex: 1}}
        isVisible={register}
        >
        <View style={{flex: 1}}>
          <View style={{flex:1, backgroundColor:colors.primary,  borderRadius: 8, paddingHorizontal: 40, paddingVertical: 140}}>
              {!keyboardOpen &&
              <View style={{height:"40%"}}>
                <Image source={require("../../Assets/LOGO.png")} style={{width:"100%"}} resizeMode={"contain"}/>
                <Text style={{fontSize: 30, textAlign:"center", color:colors.font}}>
                  Bem vindo! Cadastre-se
                </Text>
              </View>
              }
              <View style={{justifyContent:"end", gap: 20}}>
                <CustomInput 
                  placeholder="Nome de Usuário"
                  style={{fontSize: 20}}
                  value={registerFields.user.value} 
                  setValue={(val) => {setRegisterFields({...registerFields, 
                    user:{...registerFields.user, value:val}})}}
                  invalid={errors.user.length > 0}
                  invalidMessage={errors.user}
                  onFocus={() => {setRegisterFields({...registerFields, 
                    user:{...registerFields.user, firstTouch:false}})}}
                  />
                <CustomInput 
                  placeholder="Email"
                  style={{fontSize: 20}}
                  value={registerFields.email.value} 
                  setValue={(val) => {setRegisterFields({...registerFields, 
                    email:{...registerFields.email, value:val}})}}
                  invalid={errors.email.length > 0}
                  invalidMessage={errors.email}
                  onFocus={() => {setRegisterFields({...registerFields, 
                    email:{...registerFields.email, firstTouch:false}})}}
                  />
                <CustomInput 
                  placeholder="Senha"
                  style={{fontSize: 20, flex:1}}
                  type="password"
                  value={registerFields.password.value} 
                  setValue={(val) => {setRegisterFields({...registerFields, 
                    password:{...registerFields.password, value:val}})}}
                  invalid={errors.password.length > 0}
                  invalidMessage={errors.password}
                  onFocus={() => {setRegisterFields({...registerFields, 
                    password:{...registerFields.password, firstTouch:false}})}}
                  />
                <CustomInput 
                  placeholder="Confirme sua Senha"
                  style={{fontSize: 20, flex:1}}
                  type="password"
                  value={registerFields.confirmPassword.value} 
                  setValue={(val) => {setRegisterFields({...registerFields, 
                    confirmPassword:{...registerFields.confirmPassword, value:val}})}}
                  invalid={errors.confirmPassword.length > 0}
                  invalidMessage={errors.confirmPassword}
                  onFocus={() => {setRegisterFields({...registerFields, 
                    confirmPassword:{...registerFields.confirmPassword, firstTouch:false}})}}
                  />

            
                {registerWarning.trim().length > 0 && <Text style={{color:"red"}}>{registerWarning}</Text>}
                <CustomButton style={{fontSize:20}} title="Cadastrar" onClick={registerUser} disabled={!registerOk}/>
                <CustomButton style={{fontSize:20}} title="Cancelar" onClick={() => {
                  setRegisterFields({
                    user: {value: "", error: "", firstTouch: true},
                    email: {value: "", error: "", firstTouch: true},
                    password: {value: "", error: "", firstTouch: true},
                    confirmPassword: {value: "", error: "", firstTouch: true},
                  })
                  setRegister(false)
                }}/>
              </View>
              
          </View>
        </View>
        
      </Modal>
      <View style={{backgroundColor:colors.primary, flex: 1, borderRadius: 8, paddingHorizontal: 40, paddingVertical: 140}}>
          {!keyboardOpen &&
          <View style={{height:"50%"}}>
            <Image source={require("../../Assets/LOGO.png")} style={{width:"100%"}} resizeMode={"contain"}/>
            <Text style={{fontSize: 30, textAlign:"center", color:colors.font}}>
              Bem vindo! Faça seu Login
            </Text>
          </View>
          }
          <View style={{height:"50%", justifyContent:"end"}}>
            <View style={{marginBottom:30, gap:20}}>
              <CustomInput 
                placeholder="Nome de Usuário ou Email"
                style={{fontSize: 20}}
                value={loginField.userMail} 
                setValue={(val) => {setLoginFields({...loginField, userMail:val})}}/>
              <CustomInput 
                placeholder="Senha"
                style={{fontSize: 20, flex:1}}
                type="password"
                value={loginField.password} 
                setValue={(val) => {setLoginFields({...loginField, password:val})}}/>
              {loginWarning.trim().length > 0 && <Text style={{color:"red"}}>{loginWarning}</Text>}
            </View>
            
            <View style={{gap: 10}}> 
              <CustomButton title="Logar" onClick={checkCredentials} style={{fontSize:20}}/>
              <View 
                style={{
                  display:"flex", 
                  flexDirection:"row", 
                  justifyContent:"space-between", 
                  alignItems:"center", 
                  paddingHorizontal: 10
                }}>
                <View style={{borderColor:"black", borderTopWidth: 1, width: "40%"}}/>
                  <Text style={{textAlign:"center"}}> ou </Text>
                <View style={{borderColor:"black", borderTopWidth: 1, width: "40%"}}/>
              </View>
              <CustomButton title="Cadastro" onClick={() => {setRegister(true)}} style={{fontSize:20}}/>
            </View>
          </View>
          
      </View>
    </SafeAreaView>
  )
}