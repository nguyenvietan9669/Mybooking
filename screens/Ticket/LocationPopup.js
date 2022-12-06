import { View, Text, SafeAreaView, TextInput,TouchableOpacity, ScrollView } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useRoute} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, 
    useState,
    useRef,
    memo } from 'react'
import LocationCard from '../../components/Ticket/LocationCard'
import client from '../../sanity'
import  SafeViewAndroid from '../../components/SafeArea/SafeViewAndroid'
import ApiCall from '../../api/ApiCall'

const LocationPopup = () => {
    const {params:{
        setState
    }} = useRoute()
    
    const navigate = useNavigation()
    const inputRef = useRef()
    const [locations,setLocations] = useState()
    const [isSearch,setIsSearch] = useState(false)
    const [inputText,setInputText] = useState(false)

    useEffect(()=> {
        const getData = async () => {
            await ApiCall.getAirPort()
            .then(data => {
                setLocations(data)
                setIsSearch(false)
            })
        }
        inputRef.current.focus()
        getData()
    },[])
        
    
    const handleSubmit = async () => {
        const value = inputText
        await client.fetch(`
        *[_type == 'airport' && (name match '${value}' || code match '${value}') ]{
            _id,
            code,
            name,
            location ->{
                nation,
                city
            },
        }`).then(data => {
            setLocations(data)
            setIsSearch(true)
        }).catch(err => console.log(err))
    }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View className = 'flex-row gap-3 h-24 items-center justify-between px-3 bg-pink-500 shadow'>
            <View className = 'relative flex-1'>  
                <View className='absolute top-2 left-3  z-10'>
                    <Icon 
                        name='search' 
                        color='#000' 
                        size = {20}
                    />
                </View>
                <TextInput 
                    ref={inputRef}
                    onChangeText={text => setInputText(text)}
                    onSubmitEditing={handleSubmit}
                    className = 'pl-10 py-2  bg-white rounded-lg shadow'
                    placeholder='Nhập tên sân bay hoặc mã'
                />
            </View>
            <TouchableOpacity 
                onPress={()=>navigate.goBack()}
            >
                <Text className = 'text-white font-bold'>Hủy</Text>
            </TouchableOpacity>
        </View>
        <View className ='mt-5 px-5'>
            <Text className ='font-bold text-lg text-gray-400'>{isSearch ? 'Sân bay phù hợp' : ' Thành phố sân bay phổ biến'}</Text>
        </View>
        <ScrollView className ='bg-white mt-5'>
            {locations?.map((location,index) => (
                <LocationCard 
                    key={index}
                    location = {location}
                    setState = {setState}
                />
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default memo(LocationPopup)