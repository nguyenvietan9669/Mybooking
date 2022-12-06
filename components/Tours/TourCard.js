import { View, 
  Text, 
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native'
import formatCash from '../../utills/formatCash'

import React ,{useEffect,useRef} from 'react'
import {useNavigation} from '@react-navigation/native'
import { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'


const TourCard = ({item}) => {

  const navigation = useNavigation()

  const fadeAnim = useRef(new Animated.Value(0)).current 
    
  const fadeIn = () => {
    Animated.timing(
        fadeAnim,
        {
          toValue: 100,
          duration: 10000,
          useNativeDriver: false
        }
      ).start();
  }

  useEffect(()=> {
    fadeIn()
  },[])

  
  return (
    <Animated.View
      style = {{opacity:fadeAnim}}
    >
      <TouchableOpacity 
        onPress={() => navigation.navigate('TourDetail',{item})}
        className ='mr-3'
      >
        <Image
          source={{uri: urlFor(item.background).url()}}
          className = 'w-48 h-32 rounded-xl'
        />
        <View className = 'flex-1 w-48 p-2 justify-between'>
          <Text className =' font-bold h-10 text-sm'>{formatTitle(item.title,30)} - {item.time}</Text>
          <Text className = 'mt-2 font-bold text-sm text-orange-500'>{formatCash(item.price)}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default TourCard