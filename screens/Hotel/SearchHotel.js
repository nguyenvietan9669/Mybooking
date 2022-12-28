import { View, 
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    } from 'react-native'
import React, {
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

import ApiCall from '../../api/ApiCall'
import { urlFor } from '../../sanity'


const SearchHotel = () => {

    const inputRef = useRef()
    const navigation = useNavigation()
    const [hotels,setHotels] = useState([])
    const [inputText,setInputText] = useState('')
    const [isData,setIsData] = useState(true)
    const [isLoading,setIsLoading] = useState(false)

    useLayoutEffect(() => {
        inputRef.current.focus()
    },[])

    const handleSubmit = async () => {
        setIsLoading(true)
        await ApiCall.searchHotel(inputText)
        .then(data => {
            if(data.length == 0) {
                setIsData(false)
            }else {
                setIsData(true)
            }
            setHotels(data) 
            setIsLoading(false)          
        })
    }


  return (
    <View
        className = 'flex-1 bg-white'
    >
        <View>
            <View className = 'justify-end w-full h-24 pb-2 px-5 bg-pink-500 shadow'>
                <View className ='flex-row gap-3 items-center'>
                    <TouchableOpacity
                        className = 'px-3'
                    >
                        <Icon 
                            name='arrow-left' 
                            color='#fff' 
                            size ={20} 
                            onPress = {() => {
                                navigation.goBack()
                                }}
                            />
                    </TouchableOpacity>
                    <View 
                        className = 'relative flex-1'
                    >                        
                        <View>
                            <View className='absolute top-2 left-3  z-10'>
                                <Icon 
                                    name='search' 
                                    color='#000' 
                                    size = {20}
                                />
                            </View>
                            <View >
                                <TextInput
                                    ref={inputRef}
                                    className = 'flex-1 bg-white rounded-lg p-2 pl-10'
                                    placeholder='Tên khách sạn, Địa điểm'
                                    placeholderTextColor = '#cccccc'
                                    onChangeText = {text => setInputText(text)}
                                    onSubmitEditing = {handleSubmit}
                                />
                            </View>
                        </View>                                     
                    </View>
                </View>                      
            </View>
            {
                isLoading ?
                    <View
                        className = 'px-3 mt-5'
                    >
                        <Animatable.Image
                            source={require('../../assets/loading.gif')}
                            className = 'w-full h-48'
                        />
                    </View>
                :
                isData ? 
                <View
                    className = 'mt-5 px-5'
                >
                {
                    hotels?.map(item => (
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('HotelDetail',{item:item})}
                            key={item._id}
                            className ='flex-row bg-white mt-3 rounded-lg shadow'
                        >
                            <View
                                className = 'w-32 h-32 m-5'
                            >
                                <Image
                                    source={{uri : urlFor(item.background).url()}}
                                    className ='w-full h-full'
                                />
                            </View>
                            <View
                                className ='flex-1 mt-5'
                            >
                                <View>
                                    <Text
                                        className = 'font-bold text-lg'
                                    >{item.title}</Text>
                                </View>
                                <View>
                                    <Text>{item.address.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
                </View> : 
                <View
                    className = 'flex-1 mt-10 items-center'
                >
                    <Text 
                        className = 'font-bold text-gray-300 text-lg'
                    >
                        Không tìm thấy khách sạn nào phù hợp
                    </Text>
                </View>
            }
            
        </View>
    </View>
  )
}

export default SearchHotel