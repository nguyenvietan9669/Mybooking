import { View,
        Text, 
        ScrollView,
        Image, 
        TouchableOpacity,
        Dimensions, 
        Animated
    } from 'react-native'
import React, { useLayoutEffect,useEffect, useState,useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SanityBlockContent from "@sanity/block-content-to-react";
import {PROJECT_ID} from "@env"
import { useNavigation,useRoute } from '@react-navigation/native'

import { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'

const TourDetail = () => {

    const navigation = useNavigation()

    const [navbar,setNavbar] = useState(false)
    // const width = Dimensions.get('window').width
    const width = Dimensions.get('window').width
    
    const {params:{
        item
    }} = useRoute()
    
    const arrImage = [...item.image]
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
              toValue: 80,
              duration: 500,
              useNativeDriver: false
            }
          ).start();
    }

    useEffect(()=> {
        if(navbar){
            fadeIn()
        }else {
            fadeOut()
        }
    },[navbar])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:false
        })
        
    },[])

    const handleScroll = (e) => {
        const {nativeEvent} = e
        if (nativeEvent && nativeEvent.contentOffset) {
            const currentOffset = nativeEvent.contentOffset.y
            if (currentOffset >= 200) {
                setNavbar(true)
            }else {
                setNavbar(false)
            }
        } 
    }

  return (
    <>
    <Animated.View
        style = {{
            height : fadeAnim
        }} 
        className = 'absolute z-10 bg-white w-full justify-end overflow-hidden' 
    >
       <View
            className ='flex-row pb-1 items-center'
       >
            <TouchableOpacity
                className ='px-5'
                onPress={()=> navigation.goBack()}
            >
                <Icon
                    name='angle-left' 
                    color='#ff5c8a' 
                    size= {25}
                    />
            </TouchableOpacity>
            <Text
                className ='flex-1 text-center text-pink-500 font-bold text-lg -translate-x-3 '
            >{formatTitle(item.title,30)}</Text>
       </View>
    </Animated.View>
    <ScrollView
        className = 'z-0'
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {
            {
                paddingBottom : 100
            }
        }
        scrollEventThrottle = {16}
        onScroll = {handleScroll}
    >
        <View  
            className = 'relative w-full items-center'
            style = {{
                height : width/2
                }}
        >
            <Image
                source={{
                    uri: urlFor(item.background).url()
                }}
                resizeMode = 'cover'
                className = 'w-full h-full rounded-br-xl rounded-bl-xl shadow-gray-700'
            />
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className ='absolute top-1/4 left-6 py-2 px-4  rounded-full bg-pink-500 items-center justify-center'
            >
                <Icon name='angle-left' color='#fff' size= {20} />
            </TouchableOpacity>
            <View 
                className = 'absolute top-3/4 w-3/4 h-fit gap-2 rounded-xl shadow bg-white p-3'
            >
                <Text className = 'font-bold text-lg'>{item.title} - {item.time}</Text>
                <View className = 'flex-row gap-2'>
                    <Icon name='map-marker-alt' color ='#000' size={20} />
                    <Text className ='text-sm text-gray-400'>{
                        item.destination?.map(item => (
                            ' - ' + item.city
                        ))
                    }</Text>
                </View>
            </View>
        </View> 
        <View className = 'w-full bg-white p-4 mt-32'>
            <View className = 'flex-row gap-2'>
                <Icon name ='calendar' color='#FA5050' size = {20} />
                <Text >
                    <Text className = 'font-bold'>Ng??y c?? v??: </Text> 
                    <Text>{item.time_departure}</Text>
                </Text>
            </View>
            <View className = 'flex-row gap-2 mt-2'>
                <Icon name ='clock' color='#FA5050' size = {20} />
                <Text >
                    <Text className = 'font-bold'>????? d??i tour: </Text> 
                    <Text> {item.time}</Text>
                </Text>
            </View>
            <View className = 'flex-row gap-2 mt-2'>
                <Icon name ='motorcycle' color='#FA5050' size = {20} />
                <Text >
                    <Text className = 'font-bold'>Ph????ng ti???n: </Text> 
                    <Text> {item.vehicle}</Text>
                </Text>
            </View>
        </View>
        <View className = 'w-full bg-white p-4 mt-8'>
            <View className = 'flex-row gap-2'>
                <View className  = 'w-5'>
                    <Icon 
                        name ='bolt' color='#FA5050' size = {20} 
                        />
                </View>
                <Text className = 'font-bold'>X??c nh???n t???c th??</Text> 
            </View>
            <View className = 'flex-row gap-2 mt-2'>
            <View className  = 'w-6'>
                    <Icon 
                        name ='money-check' color='#FA5050' size = {20} 
                        />
                </View>
                <Text className = 'font-bold'>Mi???n ph?? ho??n v??</Text> 
            </View>
        </View>
        <View className = 'w-full bg-white p-4 mt-8'>
           <Text className = 'font-bold text-xl'>H??nh ???nh chi ti???t</Text>
           <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
           >
            {item.image?.map(item => (
                <TouchableOpacity
                    key={item._key}
                    onPress={()=> {
                        navigation.navigate('ImageDetail',{item:arrImage})
                    }}
                    className = 'mr-3 mt-3'
                >
                    <Image
                        source={{
                            uri:urlFor(item).url()
                        }}
                        className = 'w-32 h-32'
                    />
                </TouchableOpacity>
            ))}
           </ScrollView>
        </View>
        <View className = 'px-4 bg-white mt-8'>
            <Text className = 'p-4 font-bold text-2xl'>??i???m n???i b???t</Text>
            <View className= 'my-4 pr-3 overflow-hidden'>
                <SanityBlockContent
                    renderContainerOnSingleChild = {true}
                    blocks={item.highlights}
                    projectId={PROJECT_ID}
                    dataset="production"
                    imageOptions={ {fit: 'max'}}
                />
            </View>             
        </View>
        <View className = 'w-full px-4 bg-white mt-8 overflow-hidden'>
            <Text className = 'p-4 font-bold text-2xl'>Gi???i thi???u v??? ?????a ??i???m</Text>
            <View
                className = 'my-4 pr-4 overflow-hidden'
            >
                <SanityBlockContent
                    blocks={item.introduces}
                    projectId={PROJECT_ID}
                    dataset="production"
                    imageOptions={{fit: 'max'}}
                />
            </View>
        
        </View>
        <View className = 'w-full bg-white p-4 mt-8'>
            <Text className = 'font-bold text-xl'>L???ch tr??nh tour</Text>
           <SanityBlockContent
                blocks={item.schedule}
                projectId={PROJECT_ID}
                dataset="production"

           />
        </View>
        <View className = 'w-full bg-white p-4 mt-8'>
            <Text className = 'font-bold text-xl'>?????a ??i???m ????a ????n</Text>
            <View className = 'flex-row gap-2 mt-3'>
                <Icon name='map-marker-alt' color ='#000' size={20} />
                <Text className ='text-sm text-gray-400'>{item.departure}</Text>
            </View>
        </View>
    </ScrollView>
    <View
        className = 'fixed bottom-0 shadow'
    >
        <TouchableOpacity
            onPress={()=> navigation.navigate('ReceiptTour',{item})}
            className = 'bg-pink-500 h-16 p-4 shadow items-center'
        >
            <Text
                className = 'font-bold text-white text-lg'
            >
                ?????t
            </Text>
        </TouchableOpacity>
        </View>
    </>
  )
}

export default TourDetail