import { View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Sale from '../components/Sale'
import Combo from '../components/Combo'
import Destination from '../components/Destination'
import Flight from '../components/Flight'
import Content from '../components/Content/Content'
import client, { urlFor } from '../sanity'
import Support from '../components/Support'
import Discover from '../components/Discover/Discover'

const HomeScreen = () => {

    const navigation = useNavigation()
    const [sales,setSales] = useState([])
    const width = Dimensions.get('window').width
    useLayoutEffect(()=> {
        navigation.setOptions(
            {
              headerShown:false,
            }
        )
        if(Platform.OS == 'android') {
            StatusBar.setBackgroundColor('#fff')
            StatusBar.setBarStyle("dark-content", true)
        }
    },[])

    useEffect(()=> {
        const getDataSale = async () => {
            await client.fetch(`
                *[_type == 'sale' ] | order(_updatedAt) []{
                    ...,
                    listSale[] -> {
                        ...
                    }
                }  
            `).then(data => {
                setSales(data)
            }).catch(err => console.log(err))
        } 
        getDataSale()
    },[])

    const handleSearch = async () => {
        navigation.navigate('SearchHome')
    }

  return (
    <View className ='relative'>
        <ScrollView 
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{
                paddingBottom : 100,
        
            }}
            className = 'bg-gray-50 flex-1'
        > 
        <View>
            <Image
                source={
                    require('../assets/homeBackground.jpg')
                }
                className = 'w-full  bg-gray-300 rounded-b-lg'
                style = {{
                    height: width/2
                }}
            />
        </View>
        <View className = 'relative mt-3'>
            <View className ='absolute top-1/2 left-10 ml-3 z-10'>
                <Icon 
                    name='search' 
                    color='#000' 
                    size = {20}
                />
            </View>
            <TouchableOpacity
                className = 'w-fit h-12 justify-center bg-white mt-5 mx-10 p-2.5 pl-10 rounded-full shadow'
                onPress = {handleSearch}
            >
                <Text
                    className = 'text-gray-300'
                >
                    Tìm kiếm bài viết
                </Text>
            </TouchableOpacity>
        </View>
        
        <View className = 'mt-7'>
            <View
                className = 'flex-row justify-evenly'
            >
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('Ticket')
                    }}
                    className = 'items-center gap-2'
                >
                    <View 
                        className = ' p-2 bg-white rounded-xl shadow'
                        style = {{
                            width :  width/6,
                            height :  width/6
                        }}
                    >
                        <Image
                            resizeMode='contain'
                            source={require('../assets/fly.png')}
                            className = 'w-full h-full'
                        />
                    </View>
                    <Text className = 'w-full text-center'>
                        Thông tin vé
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('Hotel')
                    }}
                    className = 'items-center gap-2'
                >
                    <View 
                        className = ' p-2 bg-white rounded-xl shadow'
                        style = {{
                            width :  width/6,
                            height :  width/6
                        }}
                    >
                        <Image
                            resizeMode='contain'
                            source={require('../assets/hotel.png')}
                            className = 'w-full h-full'
                        />
                    </View>
                    <Text className = 'w-full text-center'>
                        Tìm khách sạn
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                className ='flex-row justify-evenly mt-5'
            >
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('Tour')}}
                    className = 'items-center gap-2'
                >
                    <View 
                        className = 'p-2 bg-white rounded-xl shadow'
                        style = {{
                            width :  width/6,
                            height :  width/6
                        }}
                    >
                        <Image
                            resizeMode='contain'
                            source={require('../assets/tour.png')}
                            className = 'w-full h-full '
                        />
                    </View>
                    <Text className = 'w-full text-center'>
                        Tour
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Visa')} 
                    className = 'items-center gap-2'
                >
                    <View 
                        className = 'p-2 bg-white rounded-xl shadow'
                        style = {{
                            width :  width/6,
                            height :  width/6
                        }}
                    >
                        <Image
                            resizeMode='contain'
                            source={require('../assets/visa.png')}
                            className = 'w-full h-full '                    />
                    </View>
                    <Text className = 'w-full text-center'>
                        Visa
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Combo')}
                    className = 'items-center gap-2'
                >
                    <View 
                        className = 'p-2 bg-white rounded-xl shadow'
                        style = {{
                            width :  width/6,
                            height :  width/6
                        }} 
                    >
                        <Image
                            resizeMode='contain'
                            source={require('../assets/combo.png')}
                            className = 'w-full h-full '
                        />
                    </View>
                    <Text className = 'w-full text-center'>
                        Combo
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <View>
            {/* Khuyen mai */}
           <Sale title = {['Khuyến mãi']} sales = {sales.slice(0,sales.length - 1)} />
           { sales.length > 0 &&<>
            <TouchableOpacity
                onPress={() => navigation.navigate('SaleDetail',{sale : sales[sales.length - 1]})} 
                >
                <Image 
                    source={{
                        uri: urlFor(sales[sales.length - 1].image)?.url()
                    }}
                    resizeMode='stretch'
                    className = 'mt-5 w-full'
                    style = {{
                        height:width / 2
                    }}
                    />
            </TouchableOpacity>
            </>}
            {/* Combo */}
            <Combo title = {['Combo giành cho bạn']}/>
            {/* Diem den */}
            <Destination title={['Điểm đến nội địa','Điểm đến quốc tế']}/>
            {/* Chuyen bay  */}
            <Flight title={['Bay nội địa','Bay quốc tế']}/>            
            {/* Content Area */}
            <Content title = 'Có thể bạn sẽ thích'/>
            {/* Hỗ trợ */}
            <Support/>
            {/* Area về Việt Nam */}
            <Discover/>
        </View>
        </ScrollView>
        <View className= {Platform.OS == 'android' ?
        'absolute bottom-0 h-18 w-full bg-white shadow-xl' :
        'absolute bottom-0 h-24 w-full bg-white shadow-xl'
        } >
            <View className ='flex-row gap-2 justify-around'>
                <TouchableOpacity 
                     onPress={() => {
                        navigation.navigate('Ticket')
                    }}
                    className = 'w-16 h-16 p-2 bg-white '
                >
                        <Image
                            source={require('../assets/fly.png')}
                            className = 'w-full h-full shadow-sm'
                        />
                </TouchableOpacity>
                <TouchableOpacity 
                     onPress={() => {
                        navigation.navigate('Hotel')
                    }}
                    className = 'w-16 h-16 p-2 bg-white '
                >
                        <Image
                            source={require('../assets/hotel.png')}
                            className = 'w-full h-full shadow-sm'
                        />
                </TouchableOpacity>
                <TouchableOpacity 
                    className = 'w-16 h-16 p-2 bg-white '
                    onPress={() => {navigation.navigate('Tour')}}
                >
                        <Image
                            source={require('../assets/tour.png')}
                            className = 'w-full h-full shadow-sm'
                        />
                </TouchableOpacity>
                <TouchableOpacity 
                    className = 'w-16 h-16 p-2 bg-white '
                    onPress={() => {navigation.navigate('Visa')}}
                >
                        <Image
                            source={require('../assets/visa.png')}
                            className = 'w-full h-full shadow-sm'
                        />
                </TouchableOpacity>
                <TouchableOpacity 
                    className = 'w-16 h-16 p-2 bg-white '
                    onPress={() => {navigation.navigate('Combo')}}
                >
                        <Image
                            source={require('../assets/combo.png')}
                            className = 'w-full h-full shadow-sm'
                        />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default HomeScreen