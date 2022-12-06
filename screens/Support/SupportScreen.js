import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import client, { urlFor } from '../../sanity'
import ApiCall from '../../api/ApiCall'


const SupportScreen = () => {

    const navigation = useNavigation()
    const [supports,setSupports] = useState([])
    
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown : false
        })
    })

    useEffect(()=> {
        const getData = async () => {
            await ApiCall.getSupport() 
            .then(data => {
                setSupports(data)
            }) 
        }
        getData()
    },[])

  return (
    <View>
        <View
            className = 'w-full h-24 bg-pink-500 justify-end pb-3'
        >
            <View
                className ='flex-row items-center'
            >
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    className = 'px-4'
                >
                    <Icon
                        name='angle-left' 
                        color='#fff' 
                        size= {30}
                    />
                </TouchableOpacity>
                <Text
                    className ='font-bold text-white text-xl flex-1 text-center -translate-x-3'
                >
                    Bạn cần hỗ trợ?
                </Text>
            </View>
        </View>
        <View
            className ='flex-row flex-wrap justify-center
                        gap-3 mt-3
            '
        >
            {
                supports?.map(item => (
                    <TouchableOpacity
                        onPress={()=> {navigation.navigate('SupportDetail',{item})}}
                        key = {item._id}
                        className = 'w-32 h-32 bg-white mr-3 overflow-hidden'
                    >
                        <Image
                            source={{uri:urlFor(item.icon).url()}}
                            className ='w-full h-full'
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
        <View
            className = 'mt-5 px-3'
        >
            <Text
                className ='text-sky-400'
            >
                Mọi thắc mắc của Quý khách vui lòng gọi: 
                028 3936 2020 Chúng tôi hỗ trợ 24/7 
            </Text>
        </View>
    </View>
  )
}

export default SupportScreen