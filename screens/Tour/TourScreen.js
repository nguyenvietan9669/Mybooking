import { View, 
    Text, 
    ScrollView ,
    TouchableOpacity,
    Image 
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import React ,{useEffect, useLayoutEffect,useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import TourSlide from '../../components/Tours/TourSlide'
import More from '../../components/Tours/More'
import OptionModal from '../../components/Modal/OptionModal'
import client, { urlFor } from '../../sanity'


const TourScreen = () => {

    const navigation = useNavigation()

    const [visibleModal,setVisibleModal] = useState(false)

    const [categoryList,setCategoryList] = useState([])
    const [topicList,setTopicList] = useState([])
    const [locationList,setLocationList] = useState([])
    const [sales,setSales] = useState([])

    useLayoutEffect(()=> {
        navigation.setOptions(
            {
              headerShown:false,
            }
        )
    },[])

    useEffect(()=> {

        const getData = async () => {
            await client.fetch(`*[_type == 'location'] | order(city) [0...15] {
                ...
            }`).then(data => {
                data.forEach(element => {    
                    if(!element.nation.toLowerCase().includes('việt nam')){
                        setLocationList(prev => [...prev,element])
                    }
                });
                setCategoryList(data)
            }).catch(err => console.log(err))
            await client.fetch(`*[_type == 'topic']{
                ...
            }`).then(data => {
                setTopicList(data)
            }).catch(err => console.log(err))
            await client.fetch(`
                *[_type == 'sale' && ('Tour' in listSale[] -> title) ]| order(_updatedAt) [0...10]{
                    ...,   
                    listSale[] -> {
                        ...
                    }                
                }  
            `).then(data => {
                setSales(data)
            })
        }
        getData()
    },[])


  return (
    <View>
        <OptionModal 
            visible={visibleModal}
        >
            <View className ='flex-1'>
                <TouchableOpacity
                    onPress={() => setVisibleModal(false)}
                    className = 'h-1/2 items-end justify-end pb-5 pr-5 border-b-2 border-white'
                >
                    <Text className ='font-bold text-xl text-white'>Đóng</Text>
                </TouchableOpacity>
                <View className = 'flex-1 items-center justify-center gap-2'>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Home')}
                    >
                        <Text className = 'font-bold text-white text-xl'>VỀ TRANG CHỦ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                                setVisibleModal(false)
                                navigation.navigate('SupportScreen')
                            }}
                    >
                        <Text className = 'font-bold text-white text-xl'>TRỢ GIÚP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </OptionModal>
     <View>
        <View className = 'justify-end w-full h-24 pb-2 px-3 bg-pink-500 shadow'>
           <View className ='flex-row gap-3 items-center'>
            <TouchableOpacity
                className = 'px-3'
            >
                <Icon 
                    name='arrow-left' 
                    color='#fff' 
                    size ={20} 
                    onPress = {() => {
                        navigation.goBack()
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('SearchTour')
                    }}
                    className = 'relative flex-1'
                >  
                <View className='absolute top-2 left-3  z-10'>
                    <Icon 
                        name='search' 
                        color='#000' 
                        size = {20}
                    />
                 </View>
                <View className = 'flex-1 bg-white rounded-lg p-2 pl-10'>
                    <Text className = 'text-gray-400'>Tìm kiếm tour thích hợp</Text>
                </View>
                  
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {setVisibleModal(true)}}
                >
                    <Icon name='ellipsis-h' color='#fff' size ={20} />
                </TouchableOpacity>
            </View>                      
        </View>
     </View>
     <ScrollView 
        className = 'bg-white'
        contentContainerStyle = {{
            paddingBottom : 150,
    
        }}
    >
        <TourSlide 
            title='Các tour bán chạy' 
            category = {categoryList}  
            // tours = {tourList} 
        />
        <TourSlide 
            title='Tour theo chủ đề' 
            category = {topicList}  
            // tours = {tourList} 
        />
        <TourSlide 
            title='Du lịch khắp thế giới' 
            category = {locationList}  
            // tours = {tourList} 
        />

        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator = {false}
            className = 'mt-5 mx-3'
        >
            {
                sales?.map(item => (
                    <TouchableOpacity 
                        onPress={() => { navigation.navigate('SaleDetail',{sale:item})}}
                        key={item._id}
                        className ='mr-3 rounded-lg overflow-hidden'
                    >
                        <Image
                            className ='w-72 h-48'
                            source={{
                                uri:urlFor(item.image).url()
                            }}
                        />
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
        
        <More title='Khám phá thêm' 
            option = {[{
                id:0,
                name: 'Tour Quốc Tế',
            },
            {
                id:1,
                name: 'Tour Nội Địa',
            }]} 
        />
     </ScrollView>
    </View>
  )
}

export default TourScreen