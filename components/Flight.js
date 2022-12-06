import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import FlightCard from './FlightCard'
import ApiCall from '../api/ApiCall'

const Flight = ({title}) => {

    const [active,setActive] = useState(0)
    const [flights,setFlights] = useState([])
    const [seat,setSeat] = useState({})
    const isActive = 'w-fit ml-4 px-4 py-1 bg-pink-500 rounded-full'
    const noActive = 'w-fit ml-4 px-4 py-1 bg-white border-2 border-pink-500 rounded-full text-pink-500'
    
    const flightForeign =  async (id) => {   
        await ApiCall.getFlightForeign(id).then(data =>{
            setFlights(data)
            })
    }

    const flightInland =  async (id) => {
        await ApiCall.getFlightInland(id).then(data => {
            setFlights(data)
        })
    }

    useEffect(()=> {
        handlerPress(active)
    },[])

    const handlerPress = async (i) => {
        setActive(i)
        let id
        await ApiCall.getEconomyId().then(data => {
            id = data._id
            setSeat(data)
        } )
        if(i == 0){
            flightInland(id)
        }else if(i == 1) {
            flightForeign(id)
        }
    }

  return (
    <View className = 'mt-12'>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
        >
            {
                title.map((item,index)=> 
                    <TouchableOpacity onPress={() => handlerPress(index)} key={index} className = {active === index ? isActive : noActive} >
                        <Text 
                            className = {active === index ? 'font-bold text-sm text-white' : 'font-bold text-sm text-pink-500' }
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )
            }
        </ScrollView>
        <ScrollView 
            contentContainerStyle= {{
                paddingHorizontal : 15,
                paddingTop: 15,
            }}
            horizontal
            showsHorizontalScrollIndicator = {false}
        >
            {   
                flights.length > 0 ?
                flights?.map(item => (
                    <FlightCard 
                        key={item._id}
                        id = {item._id}
                        url = {item.destination.location.image}
                        seat = {seat}
                        departure = {item.departure}
                        destination = {item.destination}
                        fromDate = {item.date_departure}
                        brand = {item.plane.brand.name}
                    />
                )):
                <View
                    style = {{
                        height : 268
                    }}
                    className = 'justify-center'
                >
                    <Text
                        className = 'font-bold text-gray-300'
                    >
                        Hiện tại chưa có chuyến bay nào
                    </Text>
                </View>
            }
        </ScrollView>
    </View>
  )
}

export default memo(Flight)