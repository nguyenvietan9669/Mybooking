import { View, 
    Text, 
    Image, 
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useNavigation , useRoute} from '@react-navigation/native'

import {urlFor} from '../../sanity'

const ImageDetail = () => {

    const width = Dimensions.get('window').width

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
            className = 'absolute p-3 top-10 right-3 z-10'
        >
            <Text
                className ='font-bold text-pink-500'
            >
                Đóng
            </Text> 
        </TouchableOpacity>
        <ScrollView
            showsVerticalScrollIndicator = {false}
        > 
        {
            item?.map((item,index) => (
            <View
                key={index}
                className = 'mt-2'
                style= {{
                    width : width,
                    height : width / 3 * 2
                }}
            >
                <Image
                    resizeMode='contain'
                    source={{
                        uri: urlFor(item).url()
                    }}
                    className = 'w-full h-full'
                />
            </View>
            ))
        }           
        </ScrollView>
        
    </View>
  )
}

export default ImageDetail