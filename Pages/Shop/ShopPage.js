import {SafeAreaView , View, Pressable, Text, TextInput, Switch, FlatList, ScrollView} from 'react-native';
import CustomButton from "../../Components/CustomButton/CustomButton"
import CustomInput from "../../Components/CustomInput/CustomInput"

import {useState, useEffect} from "react"
import {allParts} from "../../Utils/Data"
import {useSelector, useDispatch} from 'react-redux'
import {addToInventory, decreaseScrap} from "../../Utils/Context"
import ItemCard from "../../Components/ItemCard/ItemCard"
import { useTheme } from '@react-navigation/native';

export default ShopPage = () => {
  const { colors } = useTheme();
  
  const scrap = useSelector((state) => state.scrap)
  const playerItens = useSelector((state) => state.inventory)

  const [openFilters, setOpenFilters] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const selectItem = (id) => {
    if(selectedItems.includes(id)) {
      const s = [...selectedItems]
      const i = s.indexOf(id)
      s.splice(i, 1)
      setSelectedItems(s)
    }
    else {setSelectedItems([...selectedItems, id])}
  }
  const [results, setResults] = useState(allParts)

  const dispatch = useDispatch()


  const buy = () => {
    let itensToBuy = []
    let count = 1
    let firstId =  playerItens.length > 0?  playerItens[playerItens.length-1]?.id : 0
    console.log(firstId);
    allParts.forEach((part) => {
      if(selectedItems.includes(part.id)){
        const ptA = {...part}
        ptA.id = firstId + count;
        itensToBuy = [...itensToBuy, ptA]
        count +=1;
      }
    })

    dispatch(decreaseScrap(getTotal()))
    dispatch(addToInventory(itensToBuy))
    setSelectedItems([])
  }

  const [searchValue, setSearchValue] = useState("")
  const [maxPrice, setMaxPrice] = useState()
  const [maxWeight, setMaxWeight] = useState()

  const [partsFilter, setPartsFilter] = useState({
    head: true,
    torso: true,
    arm: true,
    leg: true
  })

  useEffect(() => {
    let a = allParts.filter((x=> 
    x.name.toLowerCase().includes(searchValue.toLowerCase()) 
    && (!isNaN(maxPrice) && maxPrice>0? x.price <= maxPrice : true)
    && (!isNaN(maxWeight) && maxWeight>0? x.weight <= maxWeight : true)
    && (
        (x.slot == "head" && partsFilter.head) 
        || (x.slot == "torso" && partsFilter.torso) 
        || (x.slot == "leg" && partsFilter.leg) 
        || (x.slot == "arm" && partsFilter.arm)
      )
    ))

    setResults(a)
  }, [maxPrice, maxWeight, partsFilter, searchValue]);

  const getTotal = () => {
    let total = 0
    selectedItems?.forEach((id) => {
      const item = allParts?.find(x=> x.id == id)
      total += item?.price
    })
    return total
  }

  return(
    <SafeAreaView  style={{flex: 1}}>
      <View style={{height:50, backgroundColor:colors.primary, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding: 10, gap:15}}>
        <CustomInput placeholder="Pesquise por um item..." value={searchValue} setValue={(val) => {setSearchValue(val)}} containerStyle={{width: "80%"}}/>
        <CustomButton title="Filtros" onClick={() => {setOpenFilters(!openFilters)}}/>
      </View>

      {openFilters && (
        <View style={{backgroundColor:colors.primary}}>
          <View style={{display:"flex", flexDirection:"row", alignItems:"center", padding: 10, gap: 10}}>
            <View style={{width:"40%"}}>
              <Text style={{color:colors.font}}>Preço Máximo</Text>
               <CustomInput type="number" placeholder="R$..." value={maxPrice} setValue={(val) => {setMaxPrice(val.replace(/[^0-9]/g, ''))}} containerStyle={{width: "80%"}}/>
             
            </View>

              <View style={{width:"40%"}}>
                <Text style={{color:colors.font}}>Peso Máximo</Text>
                <CustomInput type="number" placeholder="KG..." value={maxWeight} setValue={(val) => {setMaxWeight(val.replace(/[^0-9]/g, ''))}} containerStyle={{width: "80%"}}/>
              </View>
          </View>
          <View style={{display:"flex", flexDirection:"row", alignItems:"center", padding: 10, gap: 10, justifyContent:"space-between", marginTop: -10}}>
            <View >
              <Text style={{color:colors.font}}>Cabeças?</Text>
              <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={partsFilter.head} onValueChange={(val) => {setPartsFilter({...partsFilter, head: val})}}/>
            </View>
            <View>
              <Text style={{color:colors.font}}>Torsos?</Text>
              <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={partsFilter.torso} onValueChange={(val) => {setPartsFilter({...partsFilter, torso: val})}}/>
            </View>
            <View>
              <Text style={{color:colors.font}}>Braços?</Text>
              <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={partsFilter.arm} onValueChange={(val) => {setPartsFilter({...partsFilter, arm: val})}}/>
            </View>
            <View>
              <Text style={{color:colors.font}}>Pernas?</Text>
              <Switch thumbColor={colors.detail} trackColor={{false: colors.secondary, true: colors.detail}} value={partsFilter.leg} onValueChange={(val) => {setPartsFilter({...partsFilter, leg: val})}}/>
            </View>
          </View>
         
          
        </View>
      )}

      <ScrollView style={{padding: 7}}>
        <View>
        {results.map((item) => {
          return(
          <ItemCard item={item} selected={selectedItems.includes(item.id)} onSelect={() => {selectItem(item.id)}}/>
          )
        })}
        </View>
      </ScrollView>
      { selectedItems.length > 0 && (
        <View style={{backgroundColor:colors.primary, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding: 10, gap: 10}}>
        <Text style={{color: colors.font}}>Total: {getTotal()}</Text>
        <CustomButton title="COMPRAR" style={{flex: 1}} disabled={getTotal() > scrap} onClick={buy}/>
        </View>
      )
      }
    </SafeAreaView>
  )
}