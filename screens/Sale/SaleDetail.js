import { View, 
    Text, 
    ScrollView,
    Image, 
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useNavigation,useRoute} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { urlFor } from '../../sanity'

const SaleDetail = () => {

    const navigation = useNavigation()
    const width = Dimensions.get('window').width
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:false
        })
    },[])

    const {params:{
        sale
    }} = useRoute()


  return (
    <View>
        <View 
            className = {Platform.OS == 'android'?'flex-row items-end w-full h-20 pb-2 px-3 bg-pink-500 shadow': 'flex-row items-end w-full h-24 pb-2 px-3 bg-pink-500 shadow'}
        >
            <TouchableOpacity
                onPress = {() => {
                    navigation.goBack()
                }}
                className ='px-2'
            >

                <Icon 
                    name='arrow-left' 
                    color='#fff' 
                    size ={20} 
                />
                </TouchableOpacity>
            <Text 
                className = 'flex-1 text-center font-bold text-lg text-white'
            >
                {sale.title}
            </Text>
        </View>
        <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{
                paddingBottom:100
            }}
        >
            <Image 
                source={{
                    uri: urlFor(sale.image).url()
                }}
                resizeMode='stretch'
                className = 'flex-1 w-full'
                style = {{
                    height : width / 2
                }}
            />
            <View 
                className ='py-5 px-3 w-full items-center'
            >
                <Text 
                    className = 'font-bold text-2xl text-center'
                >
                   {sale.title}
                </Text>
                <Text
                    className ='text-lg font-bold text-center'
                >
                    {sale.subtitle}
                </Text>
                <View className ='flex-row gap-2'>
                    <Icon
                        name= 'clock'
                        color= '#FA5050'
                        size = {20}
                    />
                    <Text
                        className = 'font-bold text-lg'
                    >
                        {sale.time}
                    </Text>
                </View>
                <View 
                    className = 'flex-row gap-2'
                >
                    <Icon
                        name ='bolt' 
                        color='#FFF500' 
                        size = {20}
                    />
                    <Text 
                        className ='font-bold text-lg'
                    >
                        {sale.description}
                    </Text>
                </View>
                <View
                    className ='flex-row gap-2'
                >
                    <Icon
                        name='plane'
                        color='#6FADFF'
                        size = {20}
                    />
                    <Text>
                        {sale.content}
                    </Text>
                </View>
            </View>
            <View
                className ='w-full items-center'
            >
                {
                    sale.listSale?.map(item => (
                        <View 
                            key={item._id}
                            className ='w-2/3 mt-5 p-2 rounded-lg bg-pink-500'
                        >
                            <Text
                                className ='font-black text-3xl text-white text-center'
                            >
                                Giảm giá
                            </Text>
                            <View
                                className = 'border-b-4 border-white m-3'
                            />
                            <Text
                                className ='text-white text-lg font-bold text-center'
                            >
                                {item.title.toUpperCase()}
                            </Text>
                            <Text
                                className ='font-black text-5xl text-white text-center'
                            >
                                {item.price}
                            </Text>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    </View>
  )
}

export default SaleDetail