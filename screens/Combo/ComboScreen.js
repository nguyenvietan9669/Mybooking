import { View,
     Text, 
     ImageBackground, 
     TouchableOpacity,
     Image,
     TextInput, 
     ScrollView,
     Dimensions
    } from 'react-native'
import React, { useEffect, useLayoutEffect ,useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import OptionModal from '../../components/Modal/OptionModal'
import {urlFor} from '../../sanity'
import ApiCall from '../../api/ApiCall'
import * as Animatable from 'react-native-animatable';

const ComboScreen = () => {

    const navigation = useNavigation()

    const [visibleModal,setVisibleModal] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [combos,setCombos] = useState([])
    const [inputText,setInputText] = useState('')
    const width = Dimensions.get('window').width
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    },[])

    useEffect(()=> {
        const getData = async () => {
            await ApiCall.getCombo().then(data => {
                setCombos(data)
            })
        }
        setIsLoading(true)
        getData()
        setIsLoading(false)
    },[])

    const handleSearch = async () => {
        setIsLoading(true)
        await ApiCall.searchCombo(inputText).then(data => {
            setCombos(data)
        })
        setIsLoading(false)
    }

  return (
    <View className = 'h-full'>
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
        <ImageBackground
            source={require('../../assets/backgroundCombo.png')}
            className = 'justify-center items-center'
            style = {{
                height : width/2 
            }}
        >
            <View
                className ='flex-row items-center w-full px-5'
            >
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                >
                    <Icon
                        name ='arrow-left'
                        color = '#fff'
                        size = {20}
                    />
                </TouchableOpacity>
                <Text className ='flex-1 text-center font-black text-2xl text-orange-400'>Combo Linh Hoạt</Text>
                <TouchableOpacity
                    onPress={() => setVisibleModal(true)}
                >
                    <Icon
                        name='ellipsis-h' 
                        color='#fff' 
                        size ={20}
                    />
                </TouchableOpacity>
            </View>
        </ImageBackground>
        <View 
            className = 'relative mt-3 justify-between'
        >
            <View className ='absolute top-1/2 left-10 ml-3 z-10'>
                <Icon 
                    name='search' 
                    color='#000' 
                    size = {20}
                />
            </View>
            <TextInput
                placeholder='Bạn muốn tìm combo ?'
                keyboardType='default'
                className = 'w-fit h-50 bg-white mt-5 mx-10 p-2.5 pl-10 rounded-full shadow'
                value= {inputText}
                onSubmitEditing = {handleSearch}
                onChangeText = {text => {
                    setInputText(text)
                }}
            />
        </View>
        <ScrollView
            className ='mt-5 px-3'
        >
            {isLoading ? 
            <View
                className = 'w-full h-full bg-white'
            >
                <Animatable.Image
                    source={require('../../assets/loading.gif')}
                    className = 'w-full h-56'
                    resizeMode='contain'
                />
            </View>
            : 
            combos.length == 0 ?
                <View
                    className ='w-full items-center mt-5'
                >
                    <Text
                        className = 'font-bold text-gray-300'
                    >
                        Hiện tại không có combo nào
                    </Text>
                </View>
            :
            combos?.map(item => (
                <TouchableOpacity
                    key={item._id}
                    className = 'mt-5'
                    onPress={() => navigation.navigate('ComboDetail', {item}) }
                >
                    <View
                        className = 'w-full bg-white rounded-sm shadow'
                        style = {{
                            height : width/2.5
                        }}
                    >
                        <Image
                        source={item ?
                            {uri:urlFor(item?.image).url()}:
                            require('../../assets/loading.jpg')}
                            className ='w-full flex-1'
                        />
                    </View>
                    <View
                        className = 'bg-white px-3 pb-2 rounded-bl-lg rounded-br-lg shadow'
                    >
                        <Text
                            className ='mt-2 text-lg font-bold'
                        >
                            {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))
            }
            
        </ScrollView>
    </View>
  )
}

export default ComboScreen