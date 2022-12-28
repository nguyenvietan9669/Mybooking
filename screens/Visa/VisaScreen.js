import { View,
     Text ,
     TouchableOpacity,
     Image,
     TextInput, 
     ScrollView, 
     Platform,
     Dimensions
    } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import React , { useEffect, useLayoutEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import SanityBlockContent from "@sanity/block-content-to-react";
import {PROJECT_ID} from '@env'

import OptionModal from '../../components/Modal/OptionModal'
import BottomPopup from '../../components/Modal/BottomPopup'
import client from '../../sanity'
import formatCash from '../../utills/formatCash';
import * as Animatable from 'react-native-animatable';
import ApiCall from '../../api/ApiCall';

const VisaScreen = () => {

    const navigation = useNavigation()
    const width = Dimensions.get('window').width
    const [isLoading,setIsLoading] = useState(true)

    const [visibleModal,setVisibleModal] = useState(false)
    const [introducePopup,setIntroducePopup] = useState(false)
    const [packagePopup,setPackagePopup] = useState(false)
    const [processPopup,setProcessPopup] = useState(false)
    const [optionIndex,setOptionIndex] = useState(0)
    const [visa,setVisa] = useState([])
    const [visaDetail,setVisaDetail] = useState()
    const [inputText,setInputText] = useState('')

    const getForeign = async () => {
        await ApiCall.getVisaForeign()
        .then(data => setVisa(data))
    }

    const getDomestic = async () => {
        await ApiCall.getVisaDomestic()
        .then(data => setVisa(data))
    }

    useLayoutEffect(()=> {  
        navigation.setOptions(
            {
              headerShown:false,
            }
        )
    },[])

    useEffect( () => {   
        setIsLoading(true) 
        getForeign()
        setIsLoading(false)
    },[])

    const option = [
        {
            id : 0,
            name : 'Xuất cảnh'
        },
        {
            id:1,
            name : 'Nhập cảnh'
        }
    ]

    const handleOption = (id) => {
        setIsLoading(true)
        setOptionIndex(id)
        if(id == 0){
            getForeign()
        }else if (id == 1){
            getDomestic()
        }
        setIsLoading(false)
    }

    const  handleSearch = async () => {
        setIsLoading(true)
        const value = inputText
        await client.fetch(`
        *[_type == 'visa' && title match '${value}' ] 
        | order(_updatedAt) [0...15]{
            ...,
            type[] ->
        }
        `).then(data => setVisa(data))
        setIsLoading(false)
    }

    const handleIntroduces = async (id) => {
        await client.fetch(`
        *[_type == 'visa'  &&
        _id == '${id}' ]{
            ...,
        }[0]
        `).then(data => {
            setVisaDetail(data)
        })
        setIntroducePopup(true)
    }
    const handlePackage = async (id) => {
         await client.fetch(`
        *[_type == 'visa'  &&
        _id == '${id}' ]{
            ...,
            type[] ->{
                name,
                price,
                description,
                note,
                file,
            }
        }[0]
        `).then(data => {
            setVisaDetail(data)
        })
        setPackagePopup(true)
    }
    const handleProcess = async (id) => {
        await client.fetch(`
        *[_type == 'visa'  &&
        _id == '${id}' ]{
            ...,
        }[0]
        `).then(data => {
            setVisaDetail(data)
        })
        setProcessPopup(true)
    }

  return (
    <View>
        {/* Tùy chọn */}
        <OptionModal 
            visible={visibleModal}
        >
            <View className ='flex-1'>
                <TouchableOpacity
                    onPress={() => setVisibleModal(false)}
                    className = 'h-1/2 items-end justify-end pb-5 pr-5 border-b-2 border-white'
                >
                    <Text className ='font-bold text-xl text-white'>Đóng</Text>
                </TouchableOpacity>
                <View className = 'flex-1 items-center justify-center gap-2'>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Home')}
                    >
                        <Text className = 'font-bold text-white text-xl'>VỀ TRANG CHỦ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            setVisibleModal(false)
                            navigation.navigate('SupportScreen')
                        }}
                    >
                        <Text className = 'font-bold text-white text-xl'>TRỢ GIÚP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </OptionModal>
        <View>
            <View className = 'relative justify-end w-full h-24 pb-4 bg-pink-500 rounded-br-xl rounded-bl-xl shadow'>
            <View className ='flex-row gap-4 items-center px-3'>
                <TouchableOpacity
                    className = 'px-2'
                    onPress = {() => {
                        navigation.goBack()
                    }}
                >
                    <Icon 
                        name='arrow-left' 
                        color='#fff' 
                        size ={20} 
                    />
                </TouchableOpacity>
                    <Text className = 'flex-1 font-bold text-white text-lg text-center'>Bạn muốn làm visa để đi đâu ?</Text>
                        <TouchableOpacity
                            onPress={() => {setVisibleModal(true)}}
                        >
                            <Icon name='ellipsis-h' color='#fff' size ={20} />
                        </TouchableOpacity>
                </View> 
                <View className ='absolute top-20 w-full flex-row justify-center'>
                    <TouchableOpacity 
                        onPress={() => {
                            
                        }}
                        className = ' w-2/3'
                    >  
                        <TextInput 
                            onChangeText={text => setInputText(text)}
                            onSubmitEditing={handleSearch}
                            className = 'px-3 py-2  bg-white rounded-lg shadow'
                            keyboardType='default'
                            placeholder='Nơi bạn muốn đi'
                        />    
                    </TouchableOpacity>
                </View>  
            </View>
        </View>
        <View className = 'w-full mb-5  mt-10 px-4 flex-row justify-center '>
            {
                option?.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={()=> handleOption(item.id)}
                        className = {optionIndex == item.id ? 'bg-orange-500 p-2 rounded-full mr-5' : 'bg-white border-2 border-orange-500 p-2 rounded-full mr-5'}
                    >
                        <Text className = {optionIndex == item.id ? 'text-white font-bold' : 'text-orange-500 font-bold'}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
        <ScrollView
             contentContainerStyle = {
                Platform.OS == 'android' ? {paddingBottom:200} : {paddingBottom:350}
             }
        > 
            {   
                isLoading ? 
                    <View
                        className  = 'w-full bg-white'
                        style = {{
                            height : 312
                        }}
                    >   
                        <View
                            className = 'px-3 mt-5'
                        >
                        <Animatable.Image
                            source={require('../../assets/loading.gif')}
                            className = 'w-full h-56'
                        />
                        </View>
                        <View className ='p-5 mx-3 flex-row justify-between bg-white shadow'>
                            <View
                                className = 'w-1/4 h-10 bg-gray-100'
                            />
                            <View
                                className = 'w-1/4 h-10 bg-gray-100'
                            />
                            <View
                                className = 'w-1/4 h-10 bg-gray-100'
                            />
                        </View>
                    </View>
                :
                visa.length > 0 ?
                visa?.map(item => (
                <View
                    key={item._id}
                >
                    <TouchableOpacity 
                        onPress={()=> navigation.navigate('VisaDetail',{item})}
                        className = 'relative px-3 mt-5'
                    >
                        <Image
                            source={require('../../assets/backgroundVisa.png')}
                            className = 'w-full '
                            style = {{
                                height: width /2 - 20   
                            }}
                        />
                        <View className ='absolute bottom-0 left-5 pb-3'>
                            <Text className = 'text-white font-bold text-xl'>{item.title}</Text>
                        </View>
                        
                    </TouchableOpacity>
                    <View className ='p-5 mx-3 flex-row justify-between bg-white shadow'>
                        <TouchableOpacity
                            onPress={()=> handleIntroduces(item._id)}
                        >
                            <Text className = 'text-orange-500 font-bold text-xl'>Giới thiệu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=> handlePackage(item._id)}
                        >
                            <Text className = 'text-orange-500 font-bold text-xl'>Gói</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleProcess(item._id)}
                        >
                            <Text className = 'text-orange-500 font-bold text-xl'>Quy trình</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )) : 
                <View
                    className = 'px-5 mt-5'
                >
                    <Text
                        className = 'font-bold text-gray-300'
                    >
                        Không có visa nào cho mục này
                    </Text>
                </View>
            }
        </ScrollView>

        {/* Giới thiệu */}
        <BottomPopup visible={introducePopup} setVisible = {setIntroducePopup}>
                <View className = 'w-full h-24 flex-row bg-pink-500 items-center justify-center px-3'>
                    <Text className ='flex-1 font-bold text-white text-xl'>Giới thiệu dịch vụ</Text>
                    <TouchableOpacity
                        onPress={() => setIntroducePopup(false)}
                    >
                        <Text className = 'text-white font-bold'>Đóng</Text>
                    </TouchableOpacity>
                </View>
                <View className = 'w-full'>
                    <Image
                        source={require('../../assets/backgroundVisa.png')}
                        className = 'w-full h-56'
                    />
                    <View className ='px-4 pb-5 mt-4'>
                        <Text className = 'text-orange-500 font-bold text-xl'>Giới thiệu về visa</Text>
                        <ScrollView>
                            {visaDetail && <SanityBlockContent
                                blocks={visaDetail.introdus}
                                projectId={PROJECT_ID}
                                dataset="production"
                            />}
                        </ScrollView>
                    </View>
                </View>
        </BottomPopup>

        {/* Gói dịch vụ  */}
        <BottomPopup visible={packagePopup} setVisible = {setPackagePopup}>
                <View className = 'w-full h-24 flex-row bg-pink-500 items-center justify-center px-3'>
                    <Text className ='flex-1 font-bold text-white text-xl'>Gói dịch vụ</Text>
                    <TouchableOpacity
                        onPress={() => setPackagePopup(false)}
                    >
                        <Text className = 'text-white font-bold'>Đóng</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator = {false}
                    contentContainerStyle = {{
                        paddingBottom:50,
                    }}
                    className = 'w-full'
                >
                    {visaDetail?.type.map((item,index) => (
                         <View 
                            key={index}
                            className = 'w-full bg-gray-200 px-5 mt-4 pb-4'
                         >
                         <View className = 'flex-row justify-between py-3'>
                             <Text className = 'font-bold text-xl mr-3'>{item.name}</Text>
                         </View>
                         <View className = 'flex-row gap-3 mt-2 items-center justify-between'>
                             <Text className = 'text-orange-500 font-bold text-lg'>Giá: { item.price ? formatCash(item.price): ' ' }</Text>
                             <TouchableOpacity
                                onPress={()=> {
                                    setPackagePopup(false)
                                    navigation.navigate('ReceiptVisa',{item})
                                }}
                                className = 'py-2 px-4 rounded-full bg-orange-500'
                             >
                                <Text className ='text-white font-bold text-sm'>
                                    Đặt
                                </Text>
                             </TouchableOpacity>
                         </View>
                    </View>
                    ))}
                </ScrollView>
        </BottomPopup>

        {/* Quy Trinh */}
        <BottomPopup visible={processPopup} setVisible = {setProcessPopup}>
            <View className = 'w-full h-24 flex-row bg-pink-500 items-center justify-center px-3'>
                <Text className ='flex-1 font-bold text-white text-xl'>Quy trình làm visa</Text>
                <TouchableOpacity
                    onPress={() => setProcessPopup(false)}
                >
                    <Text className = 'text-white font-bold'>Đóng</Text>
                </TouchableOpacity>
            </View>   
            <ScrollView
                className ='w-full'
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{
                    paddingBottom:100
                }}
            >
                <View className = 'px-3 mt-5'>
                    <Text className ='font-bold text-lg'> Tiêu đề </Text>
                    <View className = 'gap-1'>
                        {visaDetail && <SanityBlockContent
                            blocks={visaDetail.procedure}
                            projectId={PROJECT_ID}
                            dataset="production"
                        />}
                    </View>
                </View>
            </ScrollView>
        </BottomPopup>
    </View>
  )
}

export default VisaScreen