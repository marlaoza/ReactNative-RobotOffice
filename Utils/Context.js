import { createSlice, configureStore } from '@reduxjs/toolkit'
import { InitialRobot } from "./Data"

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState: {
    scrap: 8000,
    user: {
      name: "",
      id: 1
    },
    inventory: [],
    robots: [InitialRobot]
  },
  reducers: {
    resetData: (state) => {
      console.log("oi")
      state.scrap = 0;
      state.inventory = [];
      state.robots = [InitialRobot];
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    increaseScrap:  (state, action) => {
      state.scrap += action.payload
    },
    decreaseScrap:  (state, action) => {
      state.scrap -= action.payload
    },
    addToInventory: (state, action) => {
      console.log(action.payload)
      state.inventory = [...state.inventory, ...action.payload]
      console.log(state.inventory)
    },
    removeFromInventory: (state, action) => {
      const filteredArr = [...state.inventory.filter(x => !action.payload.includes(x.id))];
      state.inventory = [...filteredArr];
    },
    addRobot: (state, action) => {
      state.robots = [...state.robots, action.payload]
    },
    removeRobot: (state, action) => {
      const robotToRemove = state.robots.find(x => x.id == action.payload)
      const parts = [
        robotToRemove.head, 
        robotToRemove.torso, 
        robotToRemove.leftArm, 
        robotToRemove.rightArm, 
        robotToRemove.leftLeg, 
        robotToRemove.rightLeg
      ]
      let count = 1;
      parts.filter(p => p!=undefined && p!=null).forEach((part) => {
        part.id = state.inventory.length > 0 ? state.inventory[state.inventory.length - 1].id + count : 0 + count;
        count ++;
      })

      console.log(parts)
      state.inventory = [...state.inventory, ...parts.filter(p => p!=undefined && p!=null)]
      const filteredArr = [...state.robots.filter(x => x.id != action.payload)];
      state.robots = [...filteredArr];
    },
    updateRobot: (state, action) => {
      let robotToUpdate = state.robots.find(x => x.id == action.payload.id);
      const i = state.robots.indexOf(robotToUpdate);
      state.robots[i] = action.payload
    }
  }
})

export default store = configureStore({
  reducer: mainSlice.reducer
})

export const {addToInventory, removeFromInventory, increaseScrap, decreaseScrap, setUser, addRobot, removeRobot, updateRobot, resetData} = mainSlice.actions;
