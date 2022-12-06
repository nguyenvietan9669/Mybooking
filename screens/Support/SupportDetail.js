import { View, 
    Text, 
    ScrollView, 
    TouchableOpacity,
    Animated,
    Image,
    Dimensions  } from 'react-native'
import React, { useEffect, useLayoutEffect,useRef, useState } from 'react'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, useRoute } from '@react-navigation/native'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from '@env'
import PaymentPartner from '../../components/PaymentPartner'

const SupportDetail = () => {
    const {params:{item}} = useRoute()
    const navigation = useNavigation()

    const [visible,setVisible] = useState(false)


    useEffect(()=> {
        if(visible){
            fadeIn()
        }else {
            fadeOut()
        }
    },[visible])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown : false
        })
    },[])

    const fadeAnim = useRef(new Animated.Value(0)).current 

    const fadeOut = () => {
        Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }
          ).start();
    }

    const fadeIn = () => {
        Animated.timing(
            fadeAnim,
            {
              toValue: Dimensions.get('window').width / 6 * 5,
              duration: 200,
              useNativeDriver: false
            }
          ).start();
    }


  return (
    <>
    <Animated.View 
        className = 'absolute top-0 left-0 pt-16 h-full bg-white z-20 overflow-hidden'
        style = {{
            width : fadeAnim
        }}
    >
        <View
            className ='flex-row items-center justify-between p-2 border-b border-gray-300'
        >
            <Text
                className = 'font-bold text-2xl text-sky-400'
            >
                Mybooking
            </Text>
            <TouchableOpacity
                onPress={()=> {setVisible(false)}}
            >
                <Text
                    className ='text-sky-400'
                    >
                    Đóng
                </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={()=> {navigation.navigate('Home')}}
            className ='flex-row items-center gap-x-2 px-4 mt-3'
        >
            <View
                className ='w-12 items-center'
            >
                <Icon
                    name = 'home'
                    color='#60a5fa'
                    size = {30}
                />
            </View>
            <Text
                className ='font-bold '
            >Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=> {navigation.navigate('Ticket')}}
            className ='flex-row items-center gap-x-2 px-4 mt-3'
        >
            <View
                className ='w-12 items-center'
            >
            <Icon
                name = 'plane'
                color='#60a5fa'
                size = {30}
            />
            </View>
            <Text
                className ='font-bold '
            >
                Tìm kiếm chuyến bay
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=> {navigation.navigate('Tour')}}
            className ='flex-row items-center gap-x-2 px-4 mt-3'
        >
            <View
                className ='w-12 items-center'
            >
                <Icon
                    name = 'helicopter'
                    color='#60a5fa'
                    size = {30}
                />
            </View>
            <Text
                className ='font-bold '
            >
                Tour
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=> {navigation.navigate('Visa')}}
            className ='flex-row items-center gap-x-2 px-4 mt-3'
        >
            <View
                className ='w-12 items-center'
            >
                <Icon
                    name = 'passport'
                    color='#60a5fa'
                    size = {30}
                />
            </View>
            <Text
                className ='font-bold '
            >
                Visa
            </Text>
        </TouchableOpacity>
    </Animated.View>
    <View
        className ='absolute z-10 bottom-10 left-5 bg-pink-500 p-4 rounded-full'
    >
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
            <Icon
                name='arrow-left'
                color='#fff'
                size = {30}
            />
        </TouchableOpacity>
    </View>
    <View
        className = 'fixed w-full h-24 p-2 bg-pink-500 justify-end'
    >
        <View
            className ='flex-row justify-center'
        >
            <TouchableOpacity
                onPress={()=> setVisible(true)}
                className ='w-8 h-8'
            >               
                <Icon
                    name = 'bars'
                    color= '#fff'
                    size = {20}
                />
            </TouchableOpacity>
            <Text
                className = 'flex-1 text-center font-bold text-2xl text-white'
            >
                Mybooking
            </Text>
        </View>
    </View>
    <ScrollView
        className = 'z-0' 
        contentContainerStyle = {
            {
                paddingBottom : 100
            }
        }
    >
        
        <View
            className = 'items-center'
        >
            <Text
                className = 'mt-4 font-bold text-xl'
            >
                {item.title}
            </Text>
            <View
                className ='w-5/6 p-3 mt-5 bg-white rounded-lg'
            >
                <Text
                    className ='font-bold text-lg'
                >
                    Nội dung:
                </Text>
                <View>
                    {
                        item?.content.map((item,index) => (
                            <Text
                                key={item._key}
                                className = 'text-sky-400'
                            >
                              {index + 1}. {item.title}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {item?.content.map((item,index)=> (
                <View
                    key={item._key}
                    className = 'mt-5 p-4'
                >
                <View
                    className ='flex-row items-center gap-x-2'
                >
                    <View
                        className ='items-center w-8 h-8 p-2 bg-pink-500 rounded-full'
                    >
                        <Text
                            className ='text-white text-center'
                        >
                            {index + 1}
                        </Text>
                    </View>
                    <Text 
                        className ='font-bold text-sm'
                    >
                        {item.title}
                    </Text> 
                </View>
                <View
                    className = 'p-3'
                >
                    <SanityBlockContent
                        blocks={item.content}
                        projectId={PROJECT_ID}
                        dataset="production"                    
                    />
                </View>
            </View>
            ))}
        </View>
        <View
            className ='mt-4'
        >
            <Text
                className ='w-full text-center font-bold text-xl'
            >
                Đối tác thanh toán
            </Text>
            <PaymentPartner/>
        </View> 
    </ScrollView>
    </>
  )
}

export default SupportDetail