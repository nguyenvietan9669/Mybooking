import { View, 
    Text,
    TouchableOpacity, 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';

import ApiCall from '../../api/ApiCall'
import DiscoverCard from './DiscoverCard'


const Discover = () => {

    const [datas, setDatas] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [first,setFirst] = useState(0)
    const perPage = 5

    useEffect(()=> {
        const getData = async () => {
            await ApiCall.getTourDomestic(first,perPage)
            .then(data => {
                setDatas(prev => [...prev,...data])
            })
            await ApiCall.getComboDomestic(first,perPage)
            .then(data => {
                setDatas(prev => [...prev,...data])
            })
            await ApiCall.getHotelDomestic(first,perPage)
            .then(data => {
                setDatas(prev => [...prev,...data])
            })
        }
        setIsLoading(true)
        getData()
        setIsLoading(false)
    },[first])

    const handleLoadMore = () => {
        setFirst(prev => prev + perPage)
    }

  return (
    <View
    >
      <View
        className ='px-4'
      >
        <Text
            className = 'text-pink-500 font-bold text-lg'
        >
            Khám phá thêm Việt Nam
        </Text>
      </View>
        <View
            className ='flex-row pl-4 flex-wrap mt-3'
        >
            {
                datas?.map((item) => (
                    <DiscoverCard 
                        key = {item._id}
                        item = {item}
                    />
                ) )
            }
            <View
                className = 'items-center w-full my-8'
            >
                { isLoading ? 
                    <>
                        <Animatable.Image
                            source={require('../../assets/spinner.gif')}
                            className = 'w-8 h-8'
                        />
                    </>
                :
                    <TouchableOpacity
                        onPress={handleLoadMore}
                        className = 'border rounded-lg shadow border-gray-400 px-5 py-2'
                    >
                        <Text
                            className = 'text-gray-400'
                        >
                            Xem thêm
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    </View>
  )
}

export default Discover