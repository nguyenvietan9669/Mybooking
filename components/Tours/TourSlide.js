import { View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  } from 'react-native'
import React, { useEffect, useState } from 'react'
import TourCard from './TourCard'
import client from '../../sanity'
import * as Animatable from 'react-native-animatable';

const TourSlide = ({title,category = []}) => {
    const [activeCategory,setActiveCategory] = useState()
    const [tours,setTours] = useState([])
    const [isLoading,setIsLoading] = useState(true)
  

    const getData = async (id) => {
      setIsLoading(true)
      await client.fetch(`
      *[_type == 'tour' && 
        (('${id}' in destination[]._ref) 
        || topic._ref == '${id}') &&
        count > 0        
        ]| order(_updatedAt) [0...15]{
          background,
          departure,
          destination[]->,
          highlights,
          image[],
          count,
          title,
          price,
          introduces,
          schedule,
          time,
          time_departure,
          vehicle,
          _id,
      }
      `).then(data => {
        setTours([...data])
        setIsLoading(false)
      }).catch(err => console.log(err))
    }

    const handleCategory = async (id) => {
        setActiveCategory(id)
        getData(id)
    }
    useEffect(()=> {
      setActiveCategory(category[0]?._id)
      getData(category[0]?._id)
    },[category])

  return (
    <View>
      <Text className = 'font-bold text-lg mt-3 mx-3'>{title}</Text>
      <ScrollView
        className = 'mx-2 mt-3'
        horizontal
        showsHorizontalScrollIndicator = {false}
      >
        {category?.map((item,index) => (
            <TouchableOpacity 
                onPress={() => handleCategory(item._id)}
                key={index} className = {activeCategory === item._id ? 
                'bg-pink-500 rounded-full p-2 ml-3':
                'bg-white rounded-full p-2 border-2 border-pink-500 ml-3'}
            >
                <Text className = {activeCategory === item._id ? 
            'text-white font-bold':
            'text-pink-500 font-bold'} >{item.city || item.name}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ?
      <View
        className =''
      >
        <Animatable.Image
          source={require('../../assets/loading.gif')}
          className = 'w-48 h-32 rounded-xl'
        />
        <View className = 'w-48 h-24 m-1 '>
          <View className = 'w-full mt-5 h-5 bg-gray-100' />
          <View className = 'w-1/2 mt-2 h-5 bg-gray-100' />
        </View>
      </View>
      :
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator = {false}
        className ='mt-5 mx-3'
      >
        {tours.length == 0 ?
          
          <View
            style = {{
              height : 212
            }}
            className = 'justify-center'
          >
            <Text
              className ='font-bold text-gray-300 '
            >Chưa có tour nào cho địa điểm này</Text>
          </View>
        :
          tours?.map((item) => (
            <TourCard key={item._id}  item = {item} />
          ))
        }        
      </ScrollView>}
    </View>
  )
}

export default TourSlide