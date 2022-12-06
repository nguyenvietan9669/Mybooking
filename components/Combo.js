import { View, 
    Text,
    ScrollView 
} from 'react-native'
import React,{memo, useEffect, useState} from 'react'
import ComboCard from './ComboCard'
import client, { urlFor } from '../sanity'

const Combo = ({title}) => {

    const [combos,setCombos] = useState([])

    useEffect(()=> {
        client.fetch(`
        *[_type == 'combo' ]| order(_updatedAt) [0...10]{
            ...,
            flight -> {
                ...,
                departure -> {
                    ...
                },
                destination -> {
                    ...
                },
                plane -> {
                    ...,
                    brand -> {
                        ...
                    }
                }
            },
            visa -> {
                ...
            }
          }  
        `).then(data  => {
            setCombos(data)
        })
    },[])

  return (
    <View className = 'mt-12'>
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator = {false}
    >
        {
            title.map((item,index)=> 
            <View key={index} className = 'w-fit text-pink-500 rounded-full ml-4 px-4 py-1'>
                <Text className = 'font-bold text-sm text-white'>{item}</Text>
            </View>
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
            combos?.map(item => (
                <ComboCard 
                    key={item._id}
                    url = {urlFor(item.image).url()}
                    title= {item.title} 
                    item = {item}
                    des = {item.description}
                />
            ))
        }
        {/* <ComboCard url = 'https://tse4.explicit.bing.net/th?id=OIP.x0m6M0hPLcnwyteZhubGiwHaFj&pid=Api&P=0' 
        title='TIÊU ĐỀ COMBO' 
        des ='3 Ngày- 2 Đêm'/>
        <ComboCard url = 'https://tse4.explicit.bing.net/th?id=OIP.x0m6M0hPLcnwyteZhubGiwHaFj&pid=Api&P=0' 
        title='TIÊU ĐỀ COMBO' 
        des ='3 Ngày- 2 Đêm'/>
        <ComboCard url = 'https://tse4.explicit.bing.net/th?id=OIP.x0m6M0hPLcnwyteZhubGiwHaFj&pid=Api&P=0' 
        title='TIÊU ĐỀ COMBO' 
        des ='3 Ngày- 2 Đêm'/> */}
    </ScrollView>
</View>
  )
}

export default memo(Combo)