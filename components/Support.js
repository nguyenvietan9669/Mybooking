import { Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'
import React, { useEffect, useState,memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import client, { urlFor } from '../sanity'

const Support = () => {

    const navigation = useNavigation()
    const [supports,setSupports] = useState([])
    const width = Dimensions.get('window').width
    useEffect(()=> {
        const getData = async () => {
            await client.fetch(`
            *[_type == 'support' ]| order(_updatedAt) []{
                ...,
              }  
            `).then(data => {
                setSupports(data)
            }) 
        }
        getData()
    },[])

  return (
    <ScrollView
      className = 'mt-3'
    >
      <Text
        className ='font-bold text-xl ml-4 mt-4'
      >Bạn cần biết những thông tin này</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle = {{
          margin:20,
        }}
      >
        {
          supports?.map(item => (
            <TouchableOpacity
              key={item._id}
              onPress={()=> {navigation.navigate('SupportDetail',{item})}}
              className = 'mr-4  overflow-hidden shadow bg-white'
              style = {{
                width : width/3,
                height : width/3,
              }}
            >
              <Image
                source={{uri:urlFor(item.icon).url()}}
                resizeMode = 'contain'
                className = 'w-full h-full'
              />
            </TouchableOpacity>
            )
          )
        }
      </ScrollView>
    </ScrollView>
  )
}

export default memo(Support)