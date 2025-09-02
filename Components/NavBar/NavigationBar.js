import {View, Pressable, Text, Switch} from 'react-native';
import Modal from 'react-native-modal'
import {useState, useMemo} from 'react';
import {Routes} from "../../Utils/Routes"
import GlobalStyles from "../../Utils/Styles"
import NavStyles from "./Styles"

import {useSelector} from 'react-redux'

import { useRoute } from '@react-navigation/native';

import CustomButton from "../CustomButton/CustomButton"

import {
  useTheme,
} from '@react-navigation/native';


const NavItem = ({name, icon, changeRoute, componentStyle, globalStyle, active}) => {  
  const { colors } = useTheme();
  return(
    <Pressable 
      style={active? componentStyle.activeNavItem : componentStyle.navItem} 
      onPress={() => {changeRoute(name)}}>
      <Text style={{color: active? colors.detail : colors.font, fontWeight: active? 'bold' : ''}}>{name}</Text>
    </Pressable>
  )
}

export default NavigationBar = ({navigation, dark, setDark}) => {
  const scrap = useSelector((state) => state.scrap)
  const user = useSelector((state) => state.user)
  const curRoute = useRoute();


  const { colors } = useTheme();
  const globalStyle = useMemo(() => GlobalStyles(colors), [colors]);
  const navStyle = useMemo(() => NavStyles(colors), [colors]);

  const [openNav, setOpenNav] = useState(false);

  const changeRoute = (route: String) => {
    navigation.navigate(route)
    setOpenNav(false)
  }
  return(
    <View style={navStyle.topBar}>
      <Modal 
      style={{margin: 0}}
      isVisible={openNav}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackButtonPress={() => setOpenNav(false)}
      hasBackdrop={false}
      onSwipeComplete={() => setOpenNav(false)}
      swipeDirection="left"
      >
        <View style={{flex:1, backgroundColor:colors.accent}}>
          <View style={navStyle.topBar}> 
            <CustomButton title="Menu" onClick={()=>{setOpenNav(!openNav)}}/>
          </View>
          <View style={{height:"70%", display:"flex", flexDirection:"column", gap:2, padding: 10}}>
            {Routes.filter(x=> x.display).map((route, key) => {
              return(
                <NavItem 
                name={route.name} 
                changeRoute={changeRoute} 
                componentStyle={navStyle} 
                globalStyle={globalStyle}
                active={curRoute.name == route.name}
                />
              )
            })}
          </View>

          <View style={[globalStyle.hr, {padding: 5}]} >
            <Text style={globalStyle.text}> Configurações </Text>
            <Text style={[globalStyle.text]}> Tema Escuro? </Text>
            <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={dark}       onValueChange={()=>{setDark(!dark)}}/> 
          </View>
        </View>
      </Modal>

      <CustomButton title="Menu" onClick={()=>{setOpenNav(!openNav)}}/>
      <Text style={{color:colors.font}}>{curRoute.name}</Text>
      <View style={{display:"flex", flexDirection:"row", gap:5, alignItems:"center"}}>
        <Text style={globalStyle.text}>{scrap}</Text>
        <Pressable onPress={() => {navigation.navigate("Configurações")}}><Text style={globalStyle.text}>{user.name}</Text></Pressable>
        <CustomButton title={"Sair"} onClick={() => {navigation.navigate("Login")}}/>
      </View>

    </View>
  )
}


