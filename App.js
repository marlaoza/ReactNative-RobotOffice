import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import NavigationBar from "./Components/NavBar/NavigationBar"
const Stack = createNativeStackNavigator()
import {Routes} from "./Utils/Routes"
import {useState} from 'react'

import { Provider } from 'react-redux';
import store from "./Utils/Context"


const darkTheme = {
  dark: true,
   ...DefaultTheme,
  colors: {
    background: "#1c1c1c",
    font: "white",
    primary:"black",
    secondary: "#3b3431",
    accent:"#30241d",
    contrast: "#543828",
    detail: "#f1802d"
  }
}

const lightTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    background: "#E6EFEF",
    font: "black",
    primary:"white",
    secondary: "#e8e8e8",
    accent: "#cfcece",
    contrast: "#384959",
    detail: "#4984B7"
  }
}

export default function App() {
  const [dark, setDark] = useState(false)
  return (
    <Provider store={store}>
    <NavigationContainer  theme={dark? darkTheme : lightTheme}>
     
      <Stack.Navigator screenOptions={{
        header: (props) => <NavigationBar {...props} dark={dark} setDark={setDark}/>,
        }}>

        {Routes.map((route, key) => {
          return(
            <Stack.Screen name={route.name} component={route.component} options={route.options}/>
          )
        })}
        
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
   
  );
}
