import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import formatTitle from '../utills/formatTitle'
import { useNavigation } from '@react-navigation/native'

const ComboCard = ({url,title,des,item}) => {
    
    const navigation = useNavigation()

  return (
    <TouchableOpacity 
        className = 'relative mr-3'
        onPress={() => navigation.navigate('ComboDetail', {item}) }
    >
        <Image
            source={{
                uri:url
            }}
            className = 'h-48 w-72 rounded-xl'
        />
        <View className = 'absolute bottom-0 p-2 '>
            <Text className ='font-bold text-white text-lg drop-shadow-2xl'>{formatTitle(title,25)}</Text>
            <Text className ='font-bold text-white'>{formatTitle(des,30)}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ComboCard