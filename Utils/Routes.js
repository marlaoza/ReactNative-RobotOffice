import Home from "../Pages/Battle/HomePage"
import BattlePage from "../Pages/Battle/BattlePage"

import WorkShop from '../Pages/Workshop/Workshop'
import RobotBuilder from "../Pages/Workshop/RobotBuilder"

import ShopPage from "../Pages/Shop/ShopPage"
import InventoryPage from "../Pages/Inventory/InventoryPage"

import UserConfigPage from "../Pages/UserConfig/UserConfigPage"

import LoginPage from "../Pages/Login/LoginPage"

type routeType = {
  name: String,
  route: String,
  icon: String,
  display: Boolean,
  component: JSX.Element,
  options?: Object
}
export const Routes : routeType[] = [
  {
    name: "Login",
    route: "Login",
    icon: "",
    display: false,
    component: LoginPage,
    options: {
          headerShown: false
    }
  },
  {
    name: "Batalhas",
    icon: "",
    display: true,
    component: Home
  },
  {
    name: "Loja",
    icon: "",
    display: true,
    component: ShopPage
  }
  ,
  {
    name: "Inventário",
    icon: "",
    display: true,
    component: InventoryPage
  }
  ,
  {
    name: "Oficina",
    icon: "",
    display: true,
    component: WorkShop
  },
   {
    name: "RobotBuilder",
    icon: "",
    display: false,
    component: RobotBuilder,
    options: {
      headerShown: false
    }
  },
  {
    name: "Battle",
    icon: "",
    display: false,
    component: BattlePage,
    options: {
      headerShown: false
    },
  },
  {
    name: "Configurações",
    icon: "",
    display: true,
    component: UserConfigPage
  },

]