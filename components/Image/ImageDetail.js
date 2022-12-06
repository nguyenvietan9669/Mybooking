import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useNavigation , useRoute} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {urlFor} from '../../sanity'

const ImageDetail = () => {

    const navigation = useNavigation()

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:false
            
        })
    },[])

    const {params:{item}} = useRoute()
  return (
    <View className = 'w-full flex-1 items-end justify-center'>
        <TouchableOpacity
            onPress={()=> navigation.goBack()}
            className = 'absolute p-3 top-16 right-3'
        >
           <Text>Đóng</Text> 
        </TouchableOpacity>
        <Image
            resizeMode='contain'
            source={{
                uri: urlFor(item).url()
            }}
            className = 'w-full h-1/2 mt-2 '
        />
    </View>
  )
}

export default ImageDetail