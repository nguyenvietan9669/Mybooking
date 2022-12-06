import { View, Text, TouchableOpacity } from 'react-native'
import React,{memo} from 'react'
import {useNavigation} from '@react-navigation/native'

const LocationCard = ({location,setState}) => {

    const navigate = useNavigation()
    const handlePress = () => {
        setState(location)
        navigate.goBack()
    }


  return (
    <TouchableOpacity 
        onPress={handlePress}
        className ='border-b-2 border-gray-400 px-2 mt-2 pb-2'
    >
      <View>
        <Text className ='font-bold'>{location.location.city}, {location.location.nation}</Text>
      </View>
      <View>
        <Text>{location.code} - {location.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default memo(LocationCard)