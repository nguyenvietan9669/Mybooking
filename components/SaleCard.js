import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'
import formatTitle from '../utills/formatTitle'


const SaleCard = ({item}) => {

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SaleDetail',{sale:item}) } 
      className = 'mr-2'
    >
      <Image
        source={{
            uri:urlFor(item.image).url(),
        }}
        className = 'h-36 w-48 object-contain rounded-xl'
      />
      <View className = 'mt-2'>
        <Text className = 'font-bold'>{formatTitle(item.title,25)}</Text>
        <Text className = 'text-gray-500'>{item.time}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SaleCard