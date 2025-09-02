import {RobotType} from './Types'

export const tiersToColors = ["", "darkgray", "green", "blue", "purple", "orange"]

export const slotName = (slot) => {
  switch(slot.toLowerCase()){
    case "arm":
      return "Braço"
    case "leg":
      return "Perna"
    case "torso":
      return "Torso"
    case "head":
      return "Cabeça"
    default:
      return ""
  }
 
}
export const getBaseEnergy = (robot: RobotType) => {
  let val = Math.floor((150 - getWeight(robot)) / 10)
  if(val > 7) {val = 7}
  return val
}

export const getWeight = (robot: RobotType) => {
  return robot.rightArm?.weight + 
                robot.leftArm?.weight + 
                robot.torso?.weight + robot.head?.weight + robot.rightLeg?.weight + robot.leftLeg?.weight
}

export const getHealth = (robot: RobotType) => {
    return robot.rightArm?.curHealth + 
                robot.leftArm?.curHealth + 
                robot.torso?.curHealth + robot.head?.curHealth + robot.rightLeg?.curHealth + robot.leftLeg?.curHealth
  }

export const getMaxHealth = (robot: RobotType) => {
    return robot.rightArm?.maxHealth + 
                robot.leftArm?.maxHealth + 
                robot.torso?.maxHealth + robot.head?.maxHealth + robot.rightLeg?.maxHealth + robot.leftLeg?.maxHealth
  }
