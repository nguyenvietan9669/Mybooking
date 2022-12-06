import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useLayoutEffect ,useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {useNavigation,useRoute} from '@react-navigation/native'
import BottomPopup from '../../components/Modal/BottomPopup'
import client,{urlFor} from '../../sanity'
import formatCash from '../../utills/formatCash'
import ApiCall from '../../api/ApiCall'

const FlightScreen = () => {

    const navigation = useNavigation()

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:false
        })
    },[])

    const {
        params:{
            departure,
            destination,
            seat,
            count,
            fromDate,
            returnDate
        }
    } = useRoute()
    const [listFlight,setListFlight] = useState([])
    const [visibleDetail,setVisibleDetail] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [isNull,setIsNull] = useState(false)
    const [detail,setDetail] = useState([])
    const [price,setPrice] = useState(0)
    const [pricedifference,setPriceDifference] = useState(0)
    const [flightClass,setFlightClass] = useState(0)
    
    useEffect(()=> {
            const getFlight = async () => {
                if(returnDate){
                    await ApiCall.searchFlightWithReturn(departure._id,destination._id,fromDate,returnDate,seat._id,count)
                    .then(data => {
                        setIsLoading(false)
                        if(!data || data.length === 0) {
                            setIsNull(true)
                        }
                        setListFlight([...data])
                    })
                }else {
                    await ApiCall.searchFlight(departure._id,destination._id,fromDate,seat._id,count) 
                    .then(data => {
                        setIsLoading(false)
                        if(!data || data.length === 0) {
                            setIsNull(true)
                        }
                        setListFlight([...data])
                    })
                }
            }
           getFlight()
       
    },[departure._id,destination._id])

    const handleShowDetail = async (id) => {
        await ApiCall.searchFlightDetail(id)
         .then(data => {
            if(data.length != 0){
                setDetail([data])
                setPrice(() => {
                    let price = 0
                    data.seat.forEach(item => {
                        if(item.name._ref == seat._id){      
                            price = item.price
                        }
                    });
                    return price
                })
            }
            setVisibleDetail(true)
        }
        ).catch(err => console.log(err))
    }

    const handleChangeFlightClass = (item,index) => {
        if(item.pricedifference > 0){
            if(pricedifference > 0){
                setPrice(prev => prev - pricedifference + item.pricedifference )
            }else if(pricedifference == 0) {
                setPrice(prev => prev += item.pricedifference)
            }
            setPriceDifference(item.pricedifference)
        }else if (item.pricedifference == 0){
            if(pricedifference > 0){
                setPrice(prev => prev -= pricedifference)
            }else if(pricedifference == 0){

            }
            setPriceDifference(item.pricedifference)
        }
        setFlightClass(index)
    }

    const plusTime = (departureTime,flightTime) => {
        const departure = new Date(departureTime)
        const depMin = departure.getMinutes()
        const depHour = departure.getHours()
        let destinationMin = parseInt(depMin + flightTime.flightMinites)
        let destinationHour = parseInt(depHour + flightTime.flightHour)
        let destinationDay
        if(destinationMin >= 60){
            destinationMin -= 60
            destinationHour += 1
        }if(destinationHour >= 24){
            destinationHour -=24
            destinationDay += 1
        }
        if(destinationDay > 0){
            return ('sau' + destinationDay + 'ngày')
        }else {
            return (destinationHour + " : " + destinationMin)
        }
    }

    const handleContinue = () => {
        setVisibleDetail(false)
        navigation.navigate('BookTickets',{items:detail, seat,flightClass,count})
    }

  return (
    <View className ='bg-white flex-1'>
        <View className = 'flex-row items-end w-full h-24 pb-2 px-3 bg-pink-500 shadow'>
            <View className = 'flex-row items-center w-full'>
                <TouchableOpacity
                    className = 'p-2'
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
                <View className = 'flex-1'>
                    <View className = 'flex-row items-center justify-center'>
                        <Text
                             className = 'font-bold text-lg text-white'
                        >
                            {departure.location.city}
                        </Text>
                        <View
                            className = 'mx-3'
                        >
                            <Icon
                                name = 'arrow-right'
                                color = "#fff"
                                size = {16}
                            />
                        </View> 
                        <Text
                           className ='font-bold text-lg text-white'
                        >
                            {destination.location.city}
                        </Text>
                        
                    </View>
                    <View className = 'flex-row items-center justify-center '> 
                        <Text
                            className ='text-white'
                        >
                            {fromDate}  
                        </Text>
                        <View
                            className = 'ml-2'
                        >
                            <Icon
                                name = 'user'
                                color = "#fff"
                                size = {12}
                            />
                        </View> 
                        <Text
                             className ='text-white'
                        >
                            {count} Khách
                        </Text> 
                        <View
                            className = 'ml-2'
                        >
                            <Icon
                                name = 'chair'
                                color = "#fff"
                                size = {12}
                            />
                        </View> 
                        <Text
                             className ='text-white'
                        >
                            {seat.name}
                        </Text>
                     </View>
                </View>
            </View>
        </View>
        <ScrollView
            showsVerticalScrollIndicator = {false}
        >
            {
            isLoading ? 
                <View
                    className ='mt-10 items-center'
                >
                    <Text
                        className ='text-lg'
                    >
                        Loading....
                    </Text>
                </View>
            :
            isNull ?
                <View
                    className ='mt-20 items-center'
                >
                    <Text
                        className = 'font-bold text-lg text-gray-300'
                    >Không tìm thấy vé phù hợp</Text>
                </View>
            :
            listFlight?.map(item => (
                <View
                    key={item._id}
                    className ='bg-white rounded-lg'
                >
                <View
                    className ='w-full items-center mt-4'
                >
                    <View
                        className ='bg-gray-100 w-4/5 rounded-lg p-3'
                    >
                        <View
                            className ='flex-row gap-x-10 items-center justify-center'
                        >
                            <View>
                                <Text
                                    className ='font-bold text-lg'
                                >
                                    {new Date(item.time_departure).getHours()}
                                    :
                                    {new Date(item.time_departure).getMinutes()}
                                </Text>
                                <View
                                    className ='bg-white rounded-full p-2'
                                >
                                    <Text  className = 'text-center'>
                                        {departure.code}
                                    </Text>
                                </View>
                            </View>
                            <View
                                className ='items-center'
                            >
                                <Text
                                    className ='text-sm'
                                >
                                    {item.flightTime.hour + 'h ' + item.flightTime.miunite + 'm'}
                                </Text>
                                <Icon
                                    name='arrow-right'
                                />
                            
                                <Text>
                                    {item.note}
                                </Text>
                            
                            </View>
                            <View>
                                <Text
                                    className ='font-bold text-lg'
                                >
                                { 
                                        plusTime(item.time_departure,
                                            {
                                                flightHour : item.flightTime.hour,
                                                flightMinites : item.flightTime.miunite,
                                            })
                                    }
                                </Text>
                                <View
                                    className ='bg-white rounded-full p-2'
                                >
                                    <Text className ='text-center'>
                                        {item.destination.code}
                                    </Text>
                            </View>
                        </View>

                        </View>
                <View
                    className ='mt-5 flex-row items-center justify-between'
                >   
                    <View className = 'w-1/2'>
                        <Image
                            source={{
                                uri: urlFor(item.plane.brand.logo).url()
                            }}
                            style={{
                                width: '100%' ,
                                height: 32,
                                resizeMode: 'contain'
                            }}
                            />
                    </View>
                    <TouchableOpacity
                        onPress={() => handleShowDetail(item._id)}
                    >
                        <Icon
                            name = 'chevron-right'
                            color='blue'
                            size = {20}
                        />
                    </TouchableOpacity>
                </View>
                    <View 
                        className = 'items-end opacity-80'
                    >{item.date_return && <Text>vé khứ hồi</Text>}</View>
                </View>
                
            </View>
            </View>
            ))
            }
          
        </ScrollView>
        <BottomPopup visible={visibleDetail} setVisible = {setVisibleDetail} >
            { detail?.map(item =>(
                <View 
                    key={item._id}
                    className = 'bg-white w-full py-5 shadow'
                >
                <View>
                    <View/>
                    <View
                        className = 'flex-row w-full px-5'
                    >
                        <TouchableOpacity
                            onPress={()=> setVisibleDetail(false)}
                        >

                            <Icon
                                name= 'arrow-left'
                                color= '#000'
                                size = {20}
                            />
                        </TouchableOpacity>
                        <View
                            className ='flex-1 flex-row justify-center items-center gap-x-2'  
                        >
                            <Text
                                className ='font-bold text-lg'
                            > 
                                {departure.location.city} 
                            </Text>
                            <Icon
                                name= 'arrow-right'
                                color= '#000'
                                size = {20}
                            />
                            <Text
                                className ='font-bold text-lg'
                            > 
                                {destination.location.city} 
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    className = 'flex-row bg-gray-200 mt-5 py-3'
                >
                    <Icon/>
                    <Text
                        className ='font-bold text-gray-400 px-5'
                    >
                        {item.date_departure}
                    </Text>
                </View>
                <View
                    className ='w-full items-center mt-4'
                >
                    <View
                    className ='bg-gray-100 w-4/5 rounded-lg p-3'
                    >
                    <View
                        className ='flex-row gap-x-10 items-center justify-center'
                    >
                    <View>
                        <Text
                            className ='font-bold text-lg'
                        >
                            {new Date(item.time_departure).getHours()}
                                :
                            {new Date(item.time_departure).getMinutes()}
                        </Text>
                        <View
                            className ='bg-white rounded-full p-2'
                        >
                            <Text>
                                {item.departure.code}
                            </Text>
                        </View>
                    </View>
                    <View
                        className ='items-center'
                    >
                        <Text
                            className ='text-sm'
                        >
                            {
                               item.flightTime.hour + 'h ' + item.flightTime.miunite + 'm'
                            }
                        </Text>
                        <Icon
                            name='arrow-right'
                        />
                    
                        <Text>
                           {item.note}
                        </Text>
                    
                    </View>
                    <View>
                            <Text
                                className ='font-bold text-lg'
                            >
                                {
                                    plusTime(item.time_departure,
                                        {
                                            flightHour : item.flightTime.hour,
                                            flightMinites : item.flightTime.miunite,
                                        })
                                }
                            </Text>
                            <View
                                className ='bg-white rounded-full p-2'
                            >
                                <Text
                                    className = 'text-center'
                                >
                                    {item.destination.code}
                                </Text>
                        </View>
                    </View>
                    </View>
                    <View className ='flex-row mt-3'>
                        <View className = 'w-1/2'>
                            <Image
                                source={{
                                    uri: urlFor(item.plane.brand.logo).url()
                                }}
                                style={{
                                    width: '100%' ,
                                    height: 32,
                                    resizeMode: 'contain'
                                }}
                                />
                        </View>
                        {/* <Text
                            className ='font-bold text-lg'
                        >
                            {item.plane.brand.name}
                        </Text> */}
                    </View>
                    </View>
                </View>
               {item.flightclass?.length > 0 && <View>
                    <View
                        className =' mt-10'
                    >
                        <Text
                            className ='font-bold text-xl text-center'
                        >
                            Hạng chuyến bay
                        </Text>
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle = {{
                            padding:20
                        }}
                        showsHorizontalScrollIndicator = {false}
                    >
                        {item.flightclass?.map((item,index) => (
                            <TouchableOpacity
                                key={item.name}
                                onPress ={() => handleChangeFlightClass(item,index)}
                                className = 'mr-3 bg-gray-200 rounded-lg p-4'
                            >
                                <View
                                    className = 'flex-row items-center justify-between'
                                >
                                    <Text
                                        className ='font-bold text-lg'
                                    >{item.name}</Text>
                                    {flightClass == index 
                                        ? 
                                            <Text className ='text-sky-400 font-bold' >
                                                Lựa chọn hiện tại
                                            </Text>
                                        :
                                            <></>
                                    }
                                </View>
                                <View
                                    className ='mt-5 gap-y-1'
                                >
                                    
                                        {item.content?.map((item,index) => (
                                            <View
                                                className ='flex-row gap-x-2'
                                                key={index}
                                            >
                                                <Icon
                                                    name='check-circle'
                                                    color ='#000'
                                                    size ={20}
                                                />
                                                <Text
                                                
                                                >
                                                    {item}
                                                </Text>
                                            </View>
                                        ))}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    
                </View>}
                <View
                    className ='p-5  mt-20 bg-gray-200'
                >
                    <Text
                        className ='font-bold text-lg'
                    >
                        Tổng tiền cho 1 người
                    </Text>
                    <View
                        className ='flex-row items-center justify-between '
                    >
                        <Text
                            className ='text-orange-500 font-bold'
                        >
                            {formatCash(price)}
                        </Text>
                        <TouchableOpacity
                            onPress={handleContinue}
                            className ='bg-orange-500 rounded-full p-2'
                        >
                            <Text
                                className ='font-bold text-white text-sm'
                            >
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            ))}
       
        </BottomPopup>
    </View>
  )
}
export default FlightScreen