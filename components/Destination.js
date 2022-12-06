import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState,memo } from 'react'
import DestinationCard from './DestinationCard'
import client, { urlFor } from '../sanity'

const Destination = ({title}) => {

    const [active,setActive] = useState(0)
    const isActive = 'w-fit ml-4 px-4 py-1 bg-pink-500 rounded-full'
    const noActive = 'w-fit ml-4 px-4 py-1 bg-white border-2 border-pink-500 rounded-full text-pink-500'
    const [destinations,setDestinations] = useState([])

    const getForeign = async () => {
        await client.fetch(`
            *[_type == 'nation' && !(name match 'việt nam') ]{
                _id,
                name,
                image
            }
        `).then(data => setDestinations(data))
    }
    const getInland= async () => {
        await client.fetch(`
            *[_type == 'location' && nation match 'việt nam' ]{
                _id,
                'name' : city,
                image
            }
        `).then(data => setDestinations(data))
    }

    useEffect(()=> {
        handlerPress(active)
    },[])
    const handlerPress = (i) => {
        setActive(i)
        if(i == 0){
            getInland()
        }else if (i == 1){
            getForeign()
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
            destinations.length > 0 ?
            destinations?.map(item => (
                <DestinationCard
                    key={item._id} 
                    id = {item._id}
                    url = {urlFor(item.image).url()}
                    title ={item.name}
                />
            ))
            : <View
                style = {{
                    height : 207
                }}
            >
                <Text>Hiện tại chưa có điểm đến nào</Text>
            </View>
        }
    </ScrollView>
</View>
  )
}

export default memo(Destination)