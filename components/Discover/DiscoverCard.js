import { View, 
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
 } from 'react-native'
import React from 'react'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'
import formatCash from '../../utills/formatCash'


const DiscoverCard = ({item}) => {

    const navigation = useNavigation()

    const width = Dimensions.get('window').width / 2 - 20
    const height = Dimensions.get('window').width / 2  * 6 / 4

  return (
    <TouchableOpacity 
        onPress={()=> {
            if(item._type.includes('tour')){
                navigation.navigate('TourDetail',{item}) 
            }else {
                navigation.navigate('ComboDetail',{item}) 
            }
        }}
        className ='bg-white overflow-hidden mr-3'
        style = {{
            width, 
            height
        }}
    >
        <View
            className = 'bg-white w-full h-4/6'
        >
            <Image
                source={   
                    { uri : item && urlFor(item.background || item.image ).url()} 
                }
                className ='w-full h-full rounded-lg'
            />
            <View
                className = 'absolute flex-row bg-pink-400 py-1 px-2 z-10 rounded-tl-lg rounded-br-lg '
                style = {{
                    backgroundColor : item._type.includes('tour') ? '#FF5c8A' : '#1874cd'
                }}
            >
                <View
                    className ='mr-2'
                >
                    <Icon
                        name ='map-marker-alt'
                        color = '#fff'
                        size = {15}
                        />
                </View>
                <Text
                    className ='font-bold text-white'
                >
                    {item._type.includes('tour') ? 
                    item.destination[0].city : 
                    item.flight.destination.location.city}
                </Text>
            </View>
        </View>
        <View
            className = 'flex-1 mt-3 p-2'
        >
            <Text
                className ='font-bold text-sm'
            >{item.title && formatTitle(item.title,55)} </Text>
            <Text
                className ='mt-2 font-bold text-sm text-orange-400'
            >{item.price && formatCash(item.price)} </Text>
        </View>
    </TouchableOpacity>
  )
}

export default DiscoverCard