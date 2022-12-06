import { View, 
    Text,
    ScrollView, 
    TouchableOpacity, 
    Image,
    Dimensions,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import { urlFor } from '../../sanity'
import ApiCall from '../../api/ApiCall'

const ContentList = () => {

    const width = Dimensions.get('window').width
    const navigation = useNavigation()
    const {params:{id,title}} = useRoute() 
    const perPage = 15
    const [contents,setContents] = useState([])
    const [first,setFirst] = useState(0)
    const [isLoading,setIsLoading]  = useState(false)

    const getData = async (first,perPage)=> {
        await ApiCall.getContentWithId(id,first,perPage).then(data => {
            setContents(prev => [...prev,...data])
        })
       }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown : false
        }) 
    },[])

    useEffect(()=> {
        setIsLoading(true)
        getData(first,perPage)
        setIsLoading(false)
    },[first])

    const handleLoadMore = () => {
        setFirst(prev => prev + perPage)
    }
  return (
    <>
         <View
        className = 'bg-pink-500 w-full h-24 px-3 justify-end pb-2'
        >
            <View
                className = 'flex-row gap-x-2'
            >
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
                <Text
                    className ='flex-1 text-center text-white font-bold text-lg'
                >
                    Những bài viết về {title}
                </Text>
            </View>
        </View>
        <ScrollView
            contentContainerStyle ={{
                paddingBottom : 100
            }}
        >   
        
            <View
                className = 'mt-2 px-2'
            >
                {   
                    contents.length == 0 ?
                    <Text 
                        className = 'mt-4 font-bold text-center text-gray-400'
                    >không có bài viết nào cho địa điểm này</Text>
                    :
                    contents?.map(item => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={()=> navigation.navigate('ContentDetail',{item})}
                        >
                            <View
                                className = 'w-full  mt-3 bg-white rounded-sm shadow'
                                style = {{
                                    height : width / 2
                                }}
                            >
                                <Image
                                source={item ?
                                    {uri:urlFor(item?.image).url()}:
                                    require('../../assets/loading.jpg')}
                
                                    className ='w-full flex-1'
                                />
                            </View>
                            <View
                                className ='bg-white shadow p-2 rounded-bl-xl rounded-br-xl'
                            >
                                <Text
                                    className ='mt-2 text-xl font-bold'
                                >{item?.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            
            <View
                className = 'mt-10 items-center'
            >
                {isLoading ?
                    <View
                        className ='w-1/2 bg-white px-3 py-2 rounded-full shadow'
                    >
                        <Text
                            className ='text-center text-gray-400 font-bold'
                        >
                            Vui lòng chờ ...
                        </Text>
                    </View>
                :
                
                    <TouchableOpacity
                        onPress={handleLoadMore}
                        className ='w-1/2 bg-white px-3 py-2 rounded-full shadow'
                    >
                        <Text
                            className ='text-center text-pink-400 font-bold'
                        >
                            Xem thêm
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
    </>
  )
}

export default ContentList