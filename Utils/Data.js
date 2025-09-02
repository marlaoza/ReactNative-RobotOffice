import {PartType, SkillType, RobotType} from "./Types"
import { } from "../Assets/Heads/01.png"
export const users = [
  {id: 1, email: "testMail@gmail.com", username: "testName", password: "1234"},
  {id: 2, email: "marlonbomfim.jr@gmail.com", username: "marlon", password: "12345"},
]

//skills
const GolpeDeAco : SkillType = {
  name:"Golpe de Aço",
  desc: "Um poderoso Golpe",
  type: "LIFE",
  target: "ENEMY",
  cost: 1,
  value: 10,
}

const NucleoReparador : SkillType = {
  name:"Nucleo Reparador",
  desc: "Carga de nanorobos reparadores",
  type: "LIFE",
  target: "SELF",
  cost: 1,
  value: 15,
}

const CorteLigeiro : SkillType = {
  name:"Corte Ligeiro",
  desc: "Um corte direto na carcaça",
  type: "LIFE",
  target: "ENEMY",
  cost: 1,
  value: 15,
}

const FuraTesta : SkillType = {
  name:"Fura Testa",
  desc: "Golpe focado na cabeça do oponente",
  type: "LIFE",
  target: "ENEMY",
  cost: 2,
  value: 7,
}

const QuebraCanela : SkillType = {
  name: "Quebra Canela",
  desc: "Ataque Focado nas pernas",
  type:"LIFE",
  target: "ENEMY",
  cost: 3,
  value: 10
}

const GeradorDeNanorobos : SkillType = {
  name: "Gerador de Nanorobos",
  desc: "Gera uma carga de nanorrobos que te cura",
  target: "SELF",
  type: "LIFE",
  cost: 3,
  value: 25,

}

const CargaDeVirus : SkillType = {
  name: "Carga de Virus",
  desc: "Infere uma carga de virus no robo inimigo",
  target: "ENEMY",
  type: "LIFE",
  cost: 4,
  value: 30
}

const GolpeFurioso: SkillType = {
  name:"Golpe Furioso",
  desc: "Um golpe ainda mais poderoso!",
  type: "LIFE",
  target: "ENEMY",
  cost: 2,
  value: 21,
}

const LancaChamas : SkillType = {
  name: "Lança Chamas",
  desc: "Ataque direto que deixa o inimigo em chamas!",
  target: "ENEMY",
  type: "LIFE",
  cost: 5,
  value: 45,
}

const SifaoDeEnergia : SkillType = {
  name: "Sifão de Energia",
  desc: "Turbina que junta energia para te curar",
  type: "LIFE",
  target: "SELF",
  cost: 5,
  value: 55,
}


export const allParts : PartType[] = [
  //Tier 1
  {
    id: 1,
    name: "Cabeça do Gigante",
    slot: "head",

    image: require("../Assets/Heads/01.png"),
    backgroundColor:"gray",
    height: 64,
    width: 64,

    maxHealth: 7, 
    curHealth: 7,

    tier: 1,
    price: 5,
    weight: 10,
    skill: {...NucleoReparador}
  },
  {
    id: 2,
    name: "Torso do Gigante",
    slot: "torso",

    image: require("../Assets/Torsos/01.png"),
    backgroundColor:"gray",
    height: 161,
    width: 128,

    maxHealth: 12, 
    curHealth: 12,

    tier: 1,
    price: 5,
    weight: 20,
    skill: {...NucleoReparador}
  },
  {
    id: 3,
    name: "Braço do Gigante",
    slot: "arm",

    image: require("../Assets/Arms/01.png"),
    backgroundColor:"gray",
    height: 146,
    width: 64,

    maxHealth: 10, 
    curHealth: 10,

    tier: 1,
    price: 5,
    weight: 15,
    skill: {...GolpeDeAco}
  },
  {
    id: 4,
    name: "Perna do Gigante",
    slot: "leg",

    image: require("../Assets/Legs/01.png"),
    backgroundColor:"gray",
    height: 128,
    width: 74,

    maxHealth: 10, 
    curHealth: 10,

    tier: 1,
    price: 5,
    weight: 15,
    skill: {...GolpeDeAco}
  },


  //Tier 2
  {
    id: 5,
    name: "Cabeça do Ninja",
    slot: "head",

    image: require("../Assets/Heads/02.png"),
    backgroundColor:"black",
    height: 64,
    width: 64,

    maxHealth: 7, 
    curHealth: 7,

    tier: 2,
    price: 15,
    weight: 5,
    skill: {...NucleoReparador}
  },
  {
    id: 6,
    name: "Torso do Ninja",
    slot: "torso",

    image: require("../Assets/Torsos/02.png"),
    backgroundColor:"black",
    height: 129,
    width: 91,

    maxHealth: 12, 
    curHealth: 12,

    tier: 2,
    price: 15,
    weight: 5,
    skill: {...NucleoReparador}
  },
  {
    id: 7,
    name: "Braço do Ninja",
    slot: "arm",

    image: require("../Assets/Arms/02.png"),
    backgroundColor:"black",
    height: 135,
    width: 55,

    maxHealth: 7, 
    curHealth: 7,

    tier: 2,
    price: 15,
    weight: 5,
    skill: {...CorteLigeiro}
  },
  {
    id: 8,
    name: "Perna do Ninja",
    slot: "leg",

    image: require("../Assets/Legs/02.png"),
    backgroundColor:"black",
    height: 107,
    width: 45,

    maxHealth: 7, 
    curHealth: 7,

    tier: 2,
    price: 15,
    weight: 5,
    skill: {...QuebraCanela}
  },


  //Tier 3
  {
    id: 9,
    name: "Cabeça Satélite",
    slot: "head",

    image: require("../Assets/Heads/03.png"),
    backgroundColor:"lightgray",
    height: 64,
    width: 64,

    maxHealth: 15, 
    curHealth: 15,

    tier: 3,
    price: 30,
    weight: 15,
    skill: {...FuraTesta}
  },
  {
    id: 10,
    name: "Torso Jupteriano",
    slot: "torso",

    image: require("../Assets/Torsos/03.png"),
    backgroundColor:"lightgray",
    height: 131,
    width: 128,

    maxHealth: 30, 
    curHealth: 30,

    tier: 3,
    price: 30,
    weight: 30,
    skill: {...SifaoDeEnergia}
  },
  {
    id: 11,
    name: "Braço Mercurial",
    slot: "arm",

    image: require("../Assets/Arms/03.png"),
    backgroundColor:"lightgray",
    height: 132,
    width: 59,

    maxHealth: 20, 
    curHealth: 20,

    tier: 3,
    price: 30,
    weight: 10,
    skill: {...CorteLigeiro}
  },
  {
    id: 12,
    name: "Perna Solar",
    slot: "leg",

    image: require("../Assets/Legs/03.png"),
    backgroundColor:"lightgray",
    height: 91,
    width: 75,

    maxHealth: 20, 
    curHealth: 20,

    tier: 3,
    price: 30,
    weight: 20,
    skill: {...GeradorDeNanorobos}
  },

  //Tier 4
  {
    id: 13,
    name: "Cabeça Celeste",
    slot: "head",

    image: require("../Assets/Heads/04.png"),
    backgroundColor:"cyan",
    height: 64,
    width: 64,

    maxHealth: 10, 
    curHealth: 10,

    tier: 4,
    price: 55,
    weight: 2,
    skill: {...GeradorDeNanorobos}
  },
  {
    id: 14,
    name: "Torso Etéreo",
    slot: "torso",

    image: require("../Assets/Torsos/04.png"),
    backgroundColor:"cyan",
    height: 104,
    width: 64,

    maxHealth: 12, 
    curHealth: 12,

    tier: 4,
    price: 55,
    weight: 2,
    skill: {...SifaoDeEnergia}
  },
  {
    id: 15,
    name:"Braço Áureo",
    slot: "arm",

    image: require("../Assets/Arms/04.png"),
    backgroundColor:"cyan",
    height: 76,
    width: 64,

    maxHealth: 12, 
    curHealth: 12,

    tier: 4,
    price: 55,
    weight: 2,
    skill: {...CargaDeVirus}
  },
  {
    id: 16,
    name: "Perna das Nuvens",
    slot: "leg",

    image: require("../Assets/Legs/04.png"),
    backgroundColor:"cyan",
    height: 64,
    width: 40,

    maxHealth: 12, 
    curHealth: 12,

    tier: 4,
    price: 55,
    weight: 2,
    skill: {...GolpeFurioso}
  },


  //Tier 5
  {
    id: 17,
    name: "Visor X",
    slot: "head",

    image: require("../Assets/Heads/05.png"),
    backgroundColor:"red",
    height: 64,
    width: 64,

    maxHealth: 20, 
    curHealth: 20,

    tier: 5,
    price: 72,
    weight: 15,
    skill: {...LancaChamas}
  },
  {
    id: 18,
    name: "Torso da Prontidão",
    slot: "torso",

    image: require("../Assets/Torsos/05.png"),
    backgroundColor:"red",
    height: 122,
    width: 122,

    maxHealth: 30, 
    curHealth: 30,

    tier: 5,
    price: 72,
    weight: 25,
    skill: {...GeradorDeNanorobos}
  },
  {
    id: 19,
    name:"Braço do Líder",
    slot: "arm",

    image: require("../Assets/Arms/05.png"),
    backgroundColor:"red",
    height: 139,
    width: 51,

    maxHealth: 15, 
    curHealth: 15,

    tier: 5,
    price: 72,
    weight: 20,
    skill: {...GolpeFurioso}
  },
  {
    id: 20,
    name: "Perna Comandante",
    slot: "leg",

    image: require("../Assets/Legs/05.png"),
    backgroundColor:"red",
    height: 126,
    width: 60,

    maxHealth: 15, 
    curHealth: 15,

    tier: 5,
    price: 72,
    weight: 20,
    skill: {...QuebraCanela}
  },
]


export const InitialRobot : RobotType = {
  id: 0,
  name: "Robo Inicial",
  head: {...allParts[0]},
  torso: {...allParts[1]},
  leftArm: {...allParts[2]},
  rightArm: {...allParts[2], curHealth: 5},
  leftLeg: {...allParts[3], curHealth: 5},
  rightLeg: {...allParts[3]},
  
}




