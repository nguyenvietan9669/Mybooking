import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Image,
    ImageBackground,
    Dimensions
 } from 'react-native'
import React ,{useEffect, useRef, useState} from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import client ,{urlFor} from '../../sanity'
import formatTitle from '../../utills/formatTitle'
import formatDate from '../../utills/formatDate'
import ApiCall from '../../api/ApiCall'

const SearchTourPopup = () => {

    const navigation = useNavigation()
    const width = Dimensions.get('window').width
    // const trendList = [
    //     {
    //         id:1,
    //         name: 'TP Hồ Chí Minh'
    //     },
    //     {
    //         id:2,
    //         name: 'Hà Nội'
    //     },
    //     {
    //         id:3,
    //         name: 'Bà Nà Hills'
    //     },
    //     {
    //         id:4,
    //         name: 'Thái Lan'
    //     },
    //     {
    //         id:5,
    //         name: 'Singapore'
    //     },
    //     {
    //         id:6,
    //         name: 'Hạ Long'
    //     }
    // ]
    const [trendList,setTrendList] = useState([])
    const [searchList,setSearchList] = useState([])
    const [saleList,setSaleList] = useState([])
    const [locationList,setLocationList] = useState([])
    const [textInput,setTextInput] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    
    const inputRef = useRef()
    const handleSearch = async () => {
        const value = textInput
            setIsLoading(true)
            await client.fetch(`
            *[_type == 'tour' && 
            title match '${value}']{
                ...
              }`).then(data => {
                setSearchList(data)
            }).catch(err => console.log(err))
            setIsLoading(false)
    }
    useEffect(() => {
        inputRef.current.focus()
        const getData  = async () => {
            await ApiCall.getLocation() 
            .then(data => setTrendList(data))
            await ApiCall.getContentWithSale() 
            .then(data => {
                setSaleList(data)
            })
            await ApiCall.getContentWithLocation()
            .then(data => {
                setLocationList(data)
            })

        }
        setIsLoading(true)
        getData()
        setIsLoading(false)
    },[])

  return (
    <View     
    >
            <View  className = 'w-full h-24 justify-end bg-pink-500 shadow '>
                <View className ='flex-row items-center gap-4 mb-1 mx-4'>
                    <TouchableOpacity
                        onPress={()=> navigation.goBack()}
                        className = 'px-2'
                    >
                        <Icon 
                            name ='times'
                            color='#fff'
                            size = {20}
                            /> 
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setTextInput(text)}
                        onSubmitEditing={handleSearch}
                        ref={inputRef}
                        className ='w-4/5 py-2 px-4 bg-white rounded-xl shadow '
                        placeholder='Tìm kiếm tour thích hợp'
                    />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{
                    paddingBottom:150
                }}
            >
            {
            isLoading ? <View
                className = 'w-full mt-10 items-center'
            >
                <Text
                    className ='font-bold text-lg text-pink-500'
                >Loading...</Text>
            </View> :    
            searchList.length > 0 ?
            searchList?.map(item => (
                <TouchableOpacity
                    onPress={()=> {
                        navigation.goBack()
                        navigation.navigate('TourDetail',{item})
                    }}
                    key={item._id} 
                    className = 'mt-3 pb-2 mx-2 border-b-2 border-gray-300'
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
                            <Text className = 'text-orange-500 text-lg font-bold'>Giá : {item.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>))
            :
            <>
            
                <View className ='mt-3 px-4'>
                    <Text
                        className ='font-bold text-lg '
                    >
                        Đang là xu hướng
                    </Text>
                    <View 
                        className ='flex-row flex-wrap gap-2 mt-5'
                    >   
                        {trendList?.map(item => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TourList',{id:item._id,name:item.city})}
                                key = {item._id}
                                className ='border-2 border-black p-2 rounded-xl shadow'
                            >
                                <Text
                                    className = 'font-bold'
                                >
                                    {item.city}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <ImageBackground
                    source={require('../../assets/background.jpg')}
                    className = 'w-full h-fit  object-cover mt-5'
                >
                    <Text 
                        className ='mt-3 font-extrabold text-center	text-2xl text-red-600 shadow-2xl'
                    >
                        ƯU ĐÃI NỔI BẬT
                    </Text>
                    <View
                        className = 'flex-1'
                        style = {{
                            height: width/1.5
                        }}
                    >
                        <ScrollView
                            className ='mt-5 p-4'
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                        >
                            {   
                                saleList.length == 0 ?
                                <View
                                    className = 'w-full justify-center'
                                    style = {{
                                        height: width/3
                                    }}
                                >
                                    <Text
                                        className ='font-bold text-gray-300'
                                    >
                                        Hiện tại chưa có bài viết nào cho mục này
                                    </Text>
                                </View>
                                :
                                saleList?.map((item,index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className ='mr-3'
                                        style = {{
                                            width : width/2,
                                            height: width/3
                                        }}
                                        onPress={()=> navigation.navigate('ContentDetail',{item})}
                                    >
                                        <Image
                                            source={{
                                                uri: urlFor(item.image).url()
                                            }}
                                            className = 'w-full h-full rounded-lg'
                                        />
                                        <Text
                                            className ='font-bold text-lg'
                                        >
                                            {formatTitle(item.title,25)}
                                        </Text>
                                        <Text
                                            className ='text-pink-500 text-lg font-bold'
                                        >
                                            {formatDate(item._updatedAt)}
                                        </Text>
                                    </TouchableOpacity>
                                    
                                ))
                            }
                        </ScrollView>
                    </View>
                </ImageBackground>
                <ImageBackground
                    source={require('../../assets/checkin.jpg')}
                    className = 'w-full h-fit object-cover mt-5'
                >
                    <Text 
                        className ='font-bold text-center mt-3	text-2xl text-red-600 shadow-2xl'
                    >
                        ĐỊA ĐIỂM CHECKIN NỔI BẬT
                    </Text>
                    <View
                        className = 'flex-1'
                        style = {{
                            height: width/1.5
                        }}
                    >
                        <ScrollView
                            className ='mt-5 p-4'
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                        >
                            {   
                                locationList.length == 0 ?
                                <View
                                    className = 'w-full justify-center'
                                    style = {{
                                        height: width/3
                                    }}
                                >
                                    <Text
                                        className ='font-bold text-gray-300'
                                    >
                                        Hiện tại chưa có bài viết nào cho mục này
                                    </Text>
                                </View>
                                :
                                locationList?.map(item => (
                                    <TouchableOpacity   
                                        key={item._id}
                                        onPress={()=> navigation.navigate('ContentDetail',{item})}
                                        className ='mr-3'
                                        style = {{
                                            width : width/2,
                                            height: width/3
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: urlFor(item.image).url()
                                            }}
                                            className = 'w-full h-full rounded-lg'
                                        />
                                        <Text
                                            className ='font-bold text-lg'
                                        >
                                            {formatTitle(item.title,25)}
                                        </Text>
                                        <Text
                                            className ='text-pink-500 text-lg font-bold'
                                        >
                                            {formatDate(item._updatedAt)}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                           
                            
                        </ScrollView>
                    </View>
                </ImageBackground>
            
        </>}
        </ScrollView>
    </View>
  )
}

export default SearchTourPopup