import { View, 
    Text, 
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import { urlFor } from '../../sanity'
import formatCash from '../../utills/formatCash'
import { useNavigation } from '@react-navigation/native'

const RoomCard = ({setVisible,item,setHotel,hotel}) => {

    const width = Dimensions.get('window').width
    const navigation = useNavigation()
    const currentPrice = (price,discount) => {
        const current = price - (price * discount / 100)
        return current
    }

    const handleShowDetail = () => {
        setHotel(item)
        setVisible(true)
    }

  return (
    <View
        className = 'mt-5'
    >
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
        >
            {item && item.image.map((item,index) => (
                <View
                    key={index}
                    className = 'mr-1'
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
            ))}
            
      </ScrollView>
      <View
        className ='px-3'
      >
        <View
          className ='mt-3'
        >
          <Text
              className = 'font-bold text-lg'
          >
              {item.title}
          </Text>
        </View>
        <View
          className ='flex-row items-center gap-x-2 mt-2'
        >
          <View
            className = 'w-3'
          >
              <Icon
                  name ='info'
                  color= '#000'
                  size = {15}
              />
          </View>
          <View>
              <Text>
                  Phòng gồm {item.bed}
              </Text>
          </View>
        </View>
        <View
          className ='flex-row items-center gap-x-2 mt-2'
        >
          <View
            className = 'w-3'
          >
              <Icon
                  name ='ruler-combined'
                  color= '#000'
                  size = {15}
              />
          </View>
          <View>
              <Text>
                  Diện tích : {item.area}
              </Text>
          </View>
        </View>
        <View
            className ='flex-row justify-between mt-5 flex-1'
        >
            <Text
                className ='font-bold'
            >
                {item.title}
            </Text>
            <TouchableOpacity
                onPress={handleShowDetail}
            >
                <Text
                    className = 'text-blue-400 font-bold'
                >
                    Xem chi tiết
                </Text>
            </TouchableOpacity>
        </View>
        <View
          className ='flex-row items-center gap-x-2 mt-2'
        >
            <View
                className = 'w-5'
            >
              <Icon
                  name ='user'
                  color= '#000'
                  size = {15}
              />
            </View>
            <View>
                <Text>
                    {item.guestNumber} Người
                </Text>
            </View>
        </View>
        <View
          className ='flex-row items-center gap-x-2 mt-2'
        >
            <View
                className = 'w-5'
            >
                <Icon
                    name ='bed'
                    color= '#000'
                    size = {15}
                />
            </View>
          <View>
              <Text>
                  {item.bed}
              </Text>
          </View>
        </View>
        <View
          className ='flex-row items-center gap-x-2 mt-2'
        >
          <View
            className = 'w-5'
          >
              <Icon
                  name ='utensil-spoon'
                  color= '#000'
                  size = {15}
              />
          </View>
          <View>
              <Text>
                  {item.service}
              </Text>
          </View>
        </View> 
        <View
          className ='flex-row items-center gap-x-2 mt-2'
        >
          <View
            className = 'w-5'
          >
              <Icon
                  name ='wifi'
                  color= '#000'
                  size = {15}
              />
          </View>
          <View>
              <Text>
                  wifi
              </Text>
          </View>
        </View> 

        {/* Giá */}
        <View
            className = 'items-end'
        >
            <View>
                <View
                    className ='items-end'
                >
                    <Text
                        className ='font-bold line-through text-gray-500 text-lg'
                    >
                        {item.price && formatCash(item.price)}
                    </Text>
                    <Text
                        className ='font-bold text-orange-500 text-lg'
                    >
                        {item.discount && formatCash(currentPrice(item.price,item.discount))}
                    </Text>
                    <Text
                        className ='font-bold text-gray-300'
                    >
                        /căn hộ/dêm
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ReceiptHotel',{item:item,
                          hotelName: hotel.title ,
                          location : hotel.address.name
                        })
                      }}
                    className = 'px-3 py-2 bg-pink-500 rounded-lg mt-3'
                >
                    <Text
                        className ='text-white font-bold text-center'
                    >
                        Đặt
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

export default RoomCard