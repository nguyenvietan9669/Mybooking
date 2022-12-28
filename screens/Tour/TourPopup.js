import { View, 
    Text,
    TouchableOpacity, 
    ScrollView, 
    Image, 
    Platform
 } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation,useRoute} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import client, { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'
import formatCash from '../../utills/formatCash'
import ApiCall from '../../api/ApiCall'

const TourPopup = () => {

    const navigation = useNavigation()
    const [tourList,setTourList] = useState([])

    const {params:{
        id,
        name
    }} = useRoute()

    useEffect(()=> {
        const getData = async () => {
            await ApiCall.searchTourWithId(id)
            .then(data => setTourList(data))
        }
        getData()
    },[])

    const handleShowDetail = (item) => {
        navigation.dispatch(navigation.navigate('TourDetail',{item}))
    }

  return (
    <View>
      <View className = { Platform.OS == 'android' ?'w-full h-20 bg-pink-500 justify-end pb-2' : 'w-full h-24 bg-pink-500 justify-end pb-2'}>
        <View className = 'flex-row justify-center mx-4'>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Icon name ='home' color ='#fff' size={20} />
            </TouchableOpacity>
            <Text className =' flex-1 text-center font-bold text-lg text-white'>Các Tour đến {formatTitle(name,14)}</Text>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Icon name ='times' color ='#fff' size={20} />
            </TouchableOpacity>
        </View>
      </View>
      <ScrollView 
        contentContainerStyle = {{
            paddingBottom:100
        }}
        showsVerticalScrollIndicator = {false}
        className = 'mt-5 mx-4'
    >   
        { tourList.length == 0 ? 
            <View
                className = 'w-full items-center mt-10'
            >
                <Text
                    className = 'font-bold text-gray-300'
                >
                    Không có tour nào cho mục này
                </Text>
            </View>
        :
        tourList?.map(item => (
            <TouchableOpacity
                onPress={()=> handleShowDetail(item)}
                key={item._id} 
                className = 'mt-3 pb-2 border-b-2 border-gray-300'
        >
            <View className = 'flex-row gap-4'>
                <Image
                    source={{
                        uri: urlFor(item.background).url()
                    }}
                    className = 'w-32 h-32 rounded-lg'
                />
                <View className = 'justify-between py-5 flex-1'>
                    <Text className = 'font-bold text-xl'>{item.title}</Text>
                    <Text className = 'text-orange-500 text-lg font-bold'>Giá : {formatCash(item.price)}</Text>
                </View>
            </View>
        </TouchableOpacity>
        ))
        }
      </ScrollView>
    </View>
  )
}

export default TourPopup