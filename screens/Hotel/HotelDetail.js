import { View, 
  Text, 
  ScrollView,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native'
import React ,{useRef,useState} from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import { useNavigation,useRoute } from '@react-navigation/native'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from '@env'


import BottomPopup from '../../components/Modal/BottomPopup'
import OptionModal from '../../components/Modal/OptionModal'
import RoomCard from '../../components/Hotel/RoomCard'
import { urlFor } from '../../sanity'
import Utilities from '../../components/Hotel/Utilities'
import formatCash from '../../utills/formatCash'
import formatTitle from '../../utills/formatTitle'


const HotelDetail = () => {

  const navigation = useNavigation()
  const {params:{item}} = useRoute()

  const [visibleDetail,setVisibleDetail] = useState(false)
  const [visibleModal,setVisibleModal] = useState(false)
  const [hotel,setHotel] = useState({})

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height

  const fadeAnim = useRef(new Animated.Value(0)).current 

  const fadeOut = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }
    ).start();
}

  const fadeIn = (value) => {
      Animated.timing(
          fadeAnim,
          {
            toValue: value,
            duration: 50,
            useNativeDriver: false
          }
        ).start();
  }

  const handleScroll = (e) => {
    const {nativeEvent} = e
    if (nativeEvent && nativeEvent.contentOffset) {
      const currentOffset = nativeEvent.contentOffset.y
      if (currentOffset >= 190) {
          fadeIn(1)
      }else if (currentOffset >= 170) {
        fadeIn(0.9)
      }else if (currentOffset >= 150) {
        fadeIn(0.8)
      }else if (currentOffset >= 130) {
        fadeIn(0.7)
      }else if (currentOffset >= 110) {
        fadeIn(0.9)
      }else if (currentOffset >= 90) {
        fadeIn(0.5)
      }else if (currentOffset >= 70) {
        fadeIn(0.4)
      }else if (currentOffset >= 50) {
        fadeIn(0.3)
      }else if (currentOffset >= 30) {
        fadeIn(0.2)
      }else if (currentOffset >= 10) {
        fadeIn(0.1)
      }else {
        fadeOut()
      }
    } 
  }

  const currentPrice = (price,discount) => {
    const current = price - (price * discount / 100)
    return current
  }

  const arrImage = [item.background,...item.image]
  return (
   <>
      <OptionModal 
          visible={visibleModal}
        >
          <View className ='flex-1'>
            <TouchableOpacity
              onPress={() => setVisibleModal(false)}
              className = 'h-1/2 items-end justify-end pb-5 pr-5 border-b-2 border-white'
            >
              <Text className ='font-bold text-xl text-white'>????ng</Text>
            </TouchableOpacity>
            <View className = 'flex-1 items-center justify-center gap-2'>
              <TouchableOpacity
                onPress={()=> navigation.navigate('Home')}
              >
                <Text className = 'font-bold text-white text-xl'>V??? TRANG CH???</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                    setVisibleModal(false)
                    navigation.navigate('SupportScreen')
                }}
              >
                <Text className = 'font-bold text-white text-xl'>TR??? GI??P</Text>
              </TouchableOpacity>
            </View>
          </View>
      </OptionModal>
      <Animated.View
          style = {{
            opacity : fadeAnim
          }} 
          className = 'absolute z-10 bg-white w-full h-20 justify-end overflow-hidden' 
        >
          <View
            className ='flex-row pb-1 items-center'
          >
          <TouchableOpacity
            className ='px-5'
            onPress={()=> navigation.goBack()}
          >
            <Icon
              name='angle-left' 
              color='#ff5c8a' 
              size= {25}
            />
          </TouchableOpacity>
              <Text
                  className ='flex-1 text-center text-pink-500 font-bold text-lg -translate-x-5 '
              >{formatTitle(item.title,32)}</Text>
        </View>
      </Animated.View>
      <ScrollView
        className = 'bg-white'
        contentContainerStyle = {{
          paddingBottom:50
        }}
        scrollEventThrottle = {16}
          onScroll = {handleScroll}
      >
        <View>
          {!item.background ? 
            <View
              className ='bg-gray-200 w-full h-full'
            >
            </View>
          :
          <TouchableOpacity
            className = 'w-full'
              style = {{
                height : width/2
              }}
            onPress={()=> navigation.navigate('ImageDetail',{item:arrImage})}
          >
            <Image
              source={{uri : urlFor(item.background).url()}}
              className = 'w-full h-full'
            />
          </TouchableOpacity>
          }
          <TouchableOpacity
              onPress={()=> navigation.goBack()}
              className = 'absolute top-1/3 left-5 px-5'
          >
            <Icon
              name='angle-left'
              color='#fff'
              size = {30}
            />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> setVisibleModal(true)}
              className = 'absolute top-1/3 right-5'
            >
              <Icon
                name='ellipsis-h'
                color='#fff'
                size = {30}
              />
            </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          className = 'mt-1'
        >
            {!item.image ?
            <View
              style = {{
                width : width/4,
                height : (width/4)/ 10 * 7 
              }}
              className = 'bg-gray-200'
            >
              
            </View> :
              item.image?.map((item,index) => (
                <TouchableOpacity
                  onPress={()=> navigation.navigate('ImageDetail',{item:arrImage})}
                  key={index}
                  style = {{
                    width : width/4,
                    height : (width/4)/ 10 * 7 
                  }}
                  className = 'mr-1'
                >
                  <Image
                    source={{uri : urlFor(item).url()}}
                    className = 'w-full h-full'
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              ))
            }
        </ScrollView>
        <View
          className ='mt-5 px-3'
        >
          <View>
            <Text
              className ='font-bold text-lg'
            >{item.title}</Text>
          </View>
          <View
            className ='flex-row items-center mt-2 gap-x-4'
          >
            <View
              className = 'px-3 py-2 border-pink-500 border '
            >
              <Text
                className ='text-pink-500'
              >
                {item.type}
              </Text>
            </View>
            <View
              className ='flex-row'
            >
              {/* X???p h???ng theo sao  */}
              {Array(item.rank).fill().map((item,index) => (
                <View key={index}>
                  <Icon
                    name = 'star'
                    color= '#FFEA21'
                    size = {20}
                  />
                </View>
              ) )}
            </View>
          </View>
          <View
            className = 'mt-2 flex-row gap-x-2'
          >
            <Icon
              name = 'map-marker-alt'
              color= '#000'
              size = {20}
            />
            <View
              className ='flex-1'
            >
              <Text
              className ='text-sm text-gray-500'
              >
                {item.address.name}
              </Text>
            </View>
          </View>
        </View>
      
        {/* Ti???n nghi */}
      
        <View
          className ='px-3 mt-5 border-t border-gray-300'
        >
          <View
            className = 'mt-3'
          >
            <Text
              className = 'font-bold text-lg'
            >
              Ti???n nghi
            </Text>
          </View>
          <View
            className = 'w-full items-center mt-3'
          >
            <View
              className = 'w-5/6 flex-row justify-center'
            >
              {
                item.utilities?.slice(0,4).map(item => (
                  <View
                    key={item._id}
                    className = 'items-center mr-2'
                  >
                    <Image
                      source={{uri : urlFor(item.icon).url()}}
                      className = 'w-10 h-10'
                      resizeMode='contain'
                    />
                    <Text
                      className ='text-blue-400'
                    >
                      {item.name}
                    </Text>
                  </View>
                ))
              }             
            </View>
          </View>
          <TouchableOpacity
            onPress={()=> navigation.navigate('Utilities',{item : item.utilities})} 
            className ='mt-10'
          >
            <Text
              className ='text-blue-400 font-bold text-center'
            >
              XEM T???T C??? TI???N NGHI
            </Text>
          </TouchableOpacity>
        </View>
      
        {/* Ch??nh s??ch l??u tr?? */}
      
        <View
          className = 'mt-5 border-t border-gray-300 px-3'
        >
              <View>
                <Text
                  className ='font-bold mt-3 text-lg'
                >
                  Ch??nh s??ch l??u tr??
                </Text>
              </View>
              <View>
                {item.policy?.slice(0,2).map(item => (
                    <View
                      key={item._id}
                      className = 'flex-row mt-2'
                    >
                      <View
                        className = 'mr-2'
                      >
                        <Image
                          source={{uri : urlFor(item.icon).url()}}
                          className = 'w-5 h-5'
                        />
                      </View>
                      <View>
                        <Text
                          className = 'font-bold'
                        >
                          {item.title}
                        </Text>
                        <View
                          style = {{
                            width : width - 80
                          }}
                          className ='flex-1'
                        >
                          <SanityBlockContent
                            renderContainerOnSingleChild = {true}
                            blocks={item.description}
                            projectId={PROJECT_ID}
                            dataset="production"                    
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                
              </View>
            <TouchableOpacity
                onPress={()=> navigation.navigate('Policy',{item:item.policy})}
                className = 'mt-10'
            >
              <Text
                className = 'font-bold text-blue-400 text-center'
              >
                Xem Chi Ti???t
              </Text>
            </TouchableOpacity>
        </View>

        {/* M?? t???  */}    
        <View
          className = 'mt-5 px-3 border-t border-gray-300'
        >
            <Text
              className ='text-lg font-bold'
            >
              M?? t???
            </Text>
          <View
            className ='mt-3'
          >
            <SanityBlockContent
              renderContainerOnSingleChild = {true}
              blocks={item.description}
              projectId={PROJECT_ID}
              dataset="production"                    
            />
          </View>
          <TouchableOpacity
              onPress={()=> navigation.navigate('Description',{ item : item.description })}
              className ='mt-10'
          >
            <Text
              className = 'font-bold text-blue-400 text-center'
            >
              Xem Chi Ti???t
            </Text>
          </TouchableOpacity>
        </View>
      
        {/* Danh s??ch ph??ng  */}
        {item.room?.map((room,index) => (
          <RoomCard 
            key={index}
            setVisible = {setVisibleDetail} item = {room}
            setHotel = {setHotel}
            hotel = {item}
          />
        ))}
      </ScrollView>
      <BottomPopup visible={visibleDetail} setVisible = {setVisibleDetail}>
        {
          hotel &&
          <View
            style = {{
              width: width, 
              height : height / 10 * 9.5
            }}
          >
              <ScrollView
                className ='bg-white w-full h-full pb-5'
                contentContainerStyle = {{
                  paddingBottom:100
                }}
              >
                <View
                  style = {{
                    width : width,
                    height : width/2
                  }}
                >
                  <TouchableOpacity
                      onPress={()=> setVisibleDetail(false)}
                      className = 'absolute top-10 right-5 z-10'
                    >
                      <Text
                        className ='text-pink-500 text-lg font-black shadow'
                      >
                        ????ng
                      </Text>
                  </TouchableOpacity>
                  <ScrollView
                    horizontal
                  >
                    {
                      hotel.image?.map((item,index) => (
                        <View
                          key={index}
                          style = {{
                            width : width,
                            height : width/2
                          }}
                        >
                          <Image
                            source={{uri : urlFor(item).url()}}
                            className = 'w-full h-full'
                          />
                        </View>
                      ))
                    }
                  </ScrollView>
                </View>
                <View
                  className ='px-3'
                >
                  <View
                    className ='mt-3 border-b border-gray-300 pb-3'
                  >
                    <Text
                      className ='font-bold text-lg'
                    >
                      {hotel.title}
                    </Text>
                  </View>
                  <View
                    className = 'mt-5 flex-row flex-wrap border-b border-gray-300 pb-3'
                  >
                    <View
                      className = 'flex-row w-1/2 px-3'
                    >
                      <View
                        className = 'w-3 mr-3'
                      >
                        <Icon
                          name ='user'
                          color= '#f934b4'
                          size = {15}
                        />
                      </View>
                      <View
                        className ='flex-1'
                      >
                        <Text
                          className ='font-bold text-sm'
                        >
                          Kh??ch
                        </Text>
                        <Text>{hotel.guestNumber}</Text>
                      </View>
                    </View>
              
                    <View
                      className = 'flex-row w-1/2 px-3'
                    >
                      <View
                        className = 'w-3 mr-3'
                      >
                        <Icon
                          name ='ruler-combined'
                          color= '#f934b4'
                          size = {15}
                        />
                      </View>
                      <View
                        className ='flex-1'
                      >
                        <Text
                          className ='font-bold text-sm'
                        >
                          K??ch th?????c ph??ng
                        </Text>
                        <Text>{hotel.area}</Text>
                      </View>
                    </View>
              
                    <View
                      className = 'flex-row w-1/2 px-3'
                    >
                      <View
                        className = 'w-3 mr-3'
                      >
                        <Icon
                          name ='bed'
                          color= '#f934b4'
                          size = {15}
                        />
                      </View>
                      <View
                        className ='flex-1'
                      >
                        <Text
                          className ='font-bold text-sm'
                        >
                          Lo???i gi?????ng
                        </Text>
                        <Text>{hotel.bed}</Text>
                      </View>
                    </View>
                    <View
                      className = 'flex-row w-1/2 px-3'
                    >
                      <View
                        className = 'w-3 mr-3'
                      >
                        <Icon
                          name ='bed'
                          color= '#f934b4'
                          size = {15}
                        />
                      </View>
                      <View
                        className ='flex-1'
                      >
                        <Text
                          className ='font-bold text-sm'
                        >
                          H?????ng
                        </Text>
                        <Text>{hotel.direction}</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      className ='mt-3'
                    >
                      <Text
                        className ='font-bold text-lg'
                      >Ti???n nghi c???a ph??ng</Text>
                    </View>
                    <View
                      className = 'mt-3'
                    >
                      {
                        hotel.utilities && hotel.utilities.map((item,index) =>(
                          <Utilities key={index}  id = {item._ref} />
                        ))
                      }
                      
                    </View>
                  </View>
                </View>  
              </ScrollView>
              <View
                className = 'absolute bottom-0 w-full bg-white shadow-2xl py-2 px-3 pb-5'
              >
                <View>
                  <Text>T???ng ti???n cho 1 ng?????i, 1 ????m, 1 ph??ng</Text>
                </View>
                <View
                  className ='flex-row items-center'
                >
                  <View
                    className ='flex-1 mr-2'
                  >
                    <Text
                      className = 'font-bold text-orange-500 text-lg'
                    >
                      {formatCash(currentPrice(hotel.price,hotel.discount))}
                    </Text>
                    <Text
                      className = 'font-bold text-gray-400'
                    >
                      Gi?? ???? bao g???m thu???
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setVisibleDetail(false)
                        navigation.navigate('ReceiptHotel',{item:hotel,
                          hotelName: item.title ,
                          location : item.address.name
                        })
                      }}
                      className ='bg-orange-500 rounded-lg shadow px-5 py-2'
                    >
                      <Text
                        className ='font-bold text-lg text-white'
                      >
                        ?????t
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </View>
        }
          
      </BottomPopup>
   </>
  )
}

export default HotelDetail