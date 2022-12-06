import {Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation} from '@react-navigation/native'

const ContentCard = ({url,title,item}) => {

  const navigation = useNavigation()
  return (
    <>
    <TouchableOpacity 
      className = 'items-center  gap-5 mr-5'
      onPress={()=> navigation.navigate('ContentDetail',{item})}
    >
      <Image
        source={{
            uri:url
        }}
        className = 'w-48 h-48 rounded-full'
      />
      <Text className = 'font-bold text-sm'>{title}</Text>
    </TouchableOpacity>
    </>
  )
}

export default ContentCard