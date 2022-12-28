import { View, 
    Text,
    TouchableOpacity,
    ScrollView,

} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import HotelFiveStarSlide from '../../components/Hotel/HotelFiveStarSlide'
import Destination from '../../components/Destination'
import Reason from '../../components/Hotel/Reason'

const HotelScreen = () => {

    const navigation = useNavigation()
    
  return (
    <View
        className = 'mb-5'
    >
        <View>
            <View className = 'justify-end w-full h-24 pb-2 px-3 bg-pink-500 shadow'>
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
                        <TouchableOpacity 
                            onPress={() => {
                                
                            }}
                            className = 'relative flex-1'
                        >  
                        <View className='absolute top-2 left-3  z-10'>
                            <Icon 
                                name='search' 
                                color='#000' 
                                size = {20}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={()=> navigation.navigate('SearchHotel')}
                            className = 'flex-1 bg-white rounded-lg p-2 pl-10'
                        >
                            <Text className = 'text-gray-400'>Tên khách sạn, Địa điểm</Text>
                        </TouchableOpacity>
                        
                    </TouchableOpacity>
                       
                </View>                      
            </View>
        </View>
        <ScrollView
            showsVerticalScrollIndicator = {false}
            className = ' px-3'
            contentContainerStyle = {{
                paddingBottom: 100
            }}
        >
            <HotelFiveStarSlide title = {'khách sạn 4-5 sao'}/>
            {/* <HotelSlide /> */}
            <Destination />
            <Reason/>
        </ScrollView>
    </View>
  )
}

export default HotelScreen