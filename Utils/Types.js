export type SkillType = {
  name: String,
  desc?: String,
  target: "SELF" | "ENEMY",
  type: "LIFE",
  cost: Number,
  value?: Number,
}

export type PartType = {
  id: Number,
  name: String,
  desc: String,
  
  slot: "head" | "torso" | "arm" | "leg" | "arm",
  position: "left" | "right" | "",

  backgroundColor: String,
  image: String,
  height: Number,
  width: Number,

  weight: Number,
  price: Number,

  maxHealth: Number,
  curHealth: Number,

  tier: Number,
  skill: SkillType,
  
}

export type RobotType = {
  id: Number,
  name: String,
  leftLeg: PartType,
  rightLeg: PartType,
  leftArm: PartType,
  rightArm: PartType,
  torso: PartType,
  head: PartType,
}