import { View, 
    Text, 
    TouchableOpacity, 
    Image, 
} from 'react-native'
import React, 
    {   useEffect, 
        useState, 
} from 'react'
import {useNavigation} from '@react-navigation/native'
import client, { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'

const More = ({title,option = []}) => {

    const navigation = useNavigation()

    const [activeOption,setActiveOption] = useState(option[0].id)
    const [nationList,setNationList] = useState([])


    const getData = async (id) => {
        if(id == 0){
            await client.fetch(`
            *[_type == 'location' && !(nation match 'việt nam')]  | order(_id) [0...10]{
                _id,
                city,
                nation,
                image
                }
            `).then(data => {
                setNationList(data)
            })
        }else if (id == 1){
            await client.fetch(`
            *[_type == 'location' && nation match 'việt nam']  | order(_id) [0...10]{
                _id,
                city,
                nation,
                image

                }
            `).then(data => {
                setNationList(data)
            })
        }
       
    }
    
    useEffect(()=> {
        setActiveOption(0)
        getData(0)
    },[])

    const handleOption = (id) => {
        setActiveOption(id)
        getData(id)
    }

    const handleShowDetail = (id,name) => {
        
        navigation.navigate('TourList',{id,name})
    }

  return (
    <View>
      <Text className = 'font-bold text-lg mt-5 mx-3'>{title}</Text>
      <View className = 'flex-row mt-3'>
        {option?.map(item => (
            <TouchableOpacity 
                onPress={() => handleOption(item.id)}
                key={item.id} className = {activeOption === item.id ? 
                'bg-pink-500 rounded-full p-2 ml-3':
                'bg-white rounded-full p-2 border-2 border-pink-500 ml-3'}
            >
                <Text className = {activeOption === item.id ? 
                'text-white font-bold':
                'text-pink-500 font-bold'} >{item.name}</Text>
            </TouchableOpacity>
        ))}
      </View>
      <View className ='flex-row mt-5 mx-3 flex-wrap'>
            {nationList?.map(item => (
                <TouchableOpacity
                    onPress={() => {
                        handleShowDetail(item._id,item.city)
                    }}
                    key={item._id} 
                    className ='relative w-1/2 h-24 pr-2 mb-2'
                >
                    <Image
                        source={{
                            uri: urlFor(item.image).url()
                        }}
                        className ='w-full h-full  rounded-xl'
                    />
                    <Text className ='absolute left-0 mx-3 w-full top-1/3 -translate-x-3 text-center text-white font-bold text-xl'>{item.city ? formatTitle(item.city.trim(),9): formatTitle(item.nation)}</Text>
                </TouchableOpacity>
            ))}
      </View>
    </View>
  )
}

export default More