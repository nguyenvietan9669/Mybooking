import { View, 
    Text, 
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import React ,{
    useState,
    useEffect
} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import ApiCall from '../../api/ApiCall'
import { urlFor } from '../../sanity'
import formatCash from '../../utills/formatCash'

const HotelFiveStarSlide = ({title}) => {

    const width = Dimensions.get('window').width
    const navigation = useNavigation()
    const [index,setIndex] = useState('')
    const [locations,setLocation] = useState([])
    const [hotels,setHotels] = useState([])

    useEffect(()=> {
        const getData  = async () => {
            await ApiCall.getLocation().then(data => {
                setLocation(data)
                setIndex(data[0]._id)

                ApiCall.getHotelFiveStar(data[0]._id)
                .then(data => {
                    setHotels(data)
                })
            })
        }
        getData()
    },[])

    const handlePressLocation = async (id) => {
        setIndex(id)
        await ApiCall.getHotelFiveStar(id)
        .then(data => {
            setHotels([...data])
        })
    }

    const currentPrice = (price,discount) => {
        const current = price - (price * discount / 100)
        return current
    }

  return (
    <View
        className = 'mt-5'
    >
        <View>
            <Text
                className ='font-bold text-xl'
            >
                {title}
            </Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
            className ='mt-5'
        >
            {
                locations?.map(item => (
                    <TouchableOpacity
                        onPress={() => handlePressLocation(item._id)}
                        key={item._id}
                        className = {item._id == index ? 
                            'bg-pink-500 rounded-full px-3 py-2 mr-2' :
                            'border-pink-500 border rounded-full px-3 py-2 mr-2'
                        }
                    >
                        <Text
                            className = {item._id == index ?
                                'font-bold text-sm text-white' :
                                'font-bold text-sm text-pink-500' 
                            } 
                        >
                            {item.city} 
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
            className = 'mt-3'
        >
            {
                hotels.length > 0 ?
                hotels?.map(item => (
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('HotelDetail',{item})}
                        key={item._id}
                        style = {{
                            width : width / 2.5,
                        }}
                        className ='mr-2'
                    >
                        <View>
                            <Image
                                source={{uri : urlFor(item.background).url()}}
                                className = 'w-full'
                                style = {{
                                    height : width / 4 
                                }}
                            />
                            <View
                                className ='absolute top-0 left-0 bg-pink-500 px-2 py-1 rounded-br-lg'
                            >
                                <View
                                    className ='flex-row items-center gap-x-1'
                                >
                                    <Icon
                                        name = 'map-marker-alt'
                                        color = '#fff'
                                        size = {16}
                                    />
                                    <Text
                                        className = 'text-white'
                                    >
                                        {item.address.location.city}
                                    </Text>
                                </View>
                            </View>
                            <ImageBackground
                                className = 'absolute bottom-2 right-0 pl-6 pr-2 py-1 items-end'
                                source={require('../../assets/sale.png')}
                            >
                                <Text
                                    className = 'flex-1 text-white'
                                >Tiết kiệm {item.room.length > 0 && item.room[0].discount}%</Text>
                            </ImageBackground>
                        </View>
                        <View 
                            className = ' bg-white px-2 py-3 shadow rounded-br-lg rounded-bl-lg'
                            style = {{
                                height : width / 3
                            }}
                        >
                            <View
                                className = 'flex-1 h-10'
                            >
                                <Text
                                    className = 'font-bold text-sm'
                                >
                                    {item.title}
                                </Text>
                            </View>
                            <View
                                className = 'flex-row'
                            >
                            {Array(item.rank).fill().map((item,index) => (
                                    <View key={index}>
                                        <Icon
                                        name = 'star'
                                        color= '#FFEA21'
                                        size = {10}
                                        />
                                    </View>
                                ) )}
                            </View>
                            <View
    
                            >
                                <View
                                    className ='mt-2'
                                >
                                    <Text
                                        className = 'line-through text-gray-500'
                                    >
                                        {item.room.length > 0 && formatCash(item.room[0].price)}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        className = 'font-bold text-orange-500'
                                    >
                                        {item.room.length > 0 &&
                                         formatCash(currentPrice(item.room[0].price , item.room[0].discount))}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                 ))
                : <View
                    style = {{
                        height : 227.5
                    }}
                    className = 'justify-center'
                >
                    <Text
                        className = 'font-bold text-gray-300'
                    >
                        Chưa có khách sạn nào cho địa điểm này
                    </Text>
                </View>
            }
        </ScrollView>
    </View>
  )
}

export default HotelFiveStarSlide