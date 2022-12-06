import { View, Text, ScrollView } from 'react-native'
import React ,{memo, useEffect, useState} from 'react'
import ContentCard from './ContentCard'
import client, { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'

const Content = ({title}) => {

    const [contents , setContents] = useState([])

    useEffect(()=> {
        const getData = async() => {
            await client.fetch(`
                *[_type == 'content' ]| order(_updatedAt) [0...15]{
                    ...,
                }  
            `).then(data => {
                setContents(data)
            })
        }
        getData()
    },[])

  return (
    <ScrollView 
        className = 'mt-12 ml-5'
    >
        <Text className ='font-bold text-xl'>{title}</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle = {{
                paddingTop:15,
                paddingHorizontal:10,
            }}
        >
            {
                contents?.map(item => (
                    <ContentCard 
                        key={item._id}
                        item = {item}
                        vertical
                        url = {urlFor(item.image).url()}
                        title = {contents.title ? formatTitle(item.title,20) : '' }
                    /> 
                ))
            }
       
        </ScrollView>
    </ScrollView>
  )
}

export default memo(Content)