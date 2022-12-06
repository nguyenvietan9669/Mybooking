import { View, 
  Text, 
  ScrollView,
  Image,
  Dimensions
} from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome5'

const HotelDetail = () => {

  const width = Dimensions.get('window').width

  return (
    <ScrollView>
      <View
        className = 'w-full'
        style = {{
          height : width/2
        }}
      >
        <Image
          source={require('../../assets/homeBackground.jpg')}
          className = 'w-full h-full'
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        className = 'mt-1'
      >
        <View
          style = {{
            width : width/4,
            height : (width/4)/ 10 * 7 
          }}
          className = 'mr-1'
        >
          <Image
            source={require('../../assets/backgroundCombo.png')}
            className = 'w-full h-full'
            resizeMode='contain'
          />
        </View>
        <View
          style = {{
            width : width/4,
            height : (width/4)/ 10 * 7 
          }}
          className = 'mr-1'
        >
          <Image
            source={require('../../assets/backgroundCombo.png')}
            className = 'w-full h-full'
            resizeMode='contain'
          />
        </View>
        <View
          style = {{
            width : width/4,
            height : (width/4)/ 10 * 7 
          }}
          className = 'mr-1'
        >
          <Image
            source={require('../../assets/backgroundCombo.png')}
            className = 'w-full h-full'
            resizeMode='contain'
          />
        </View>
        <View
          style = {{
            width : width/4,
            height : (width/4)/ 10 * 7 
          }}
          className = 'mr-1'
        >
          <Image
            source={require('../../assets/backgroundCombo.png')}
            className = 'w-full h-full'
            resizeMode='contain'
          />
        </View>
      </ScrollView>
      <View
        className ='mt-5 px-3'
      >
        <View>
          <Text
            className ='font-bold'
          >Tên khách sạn</Text>
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
              Khách sạn
            </Text>
          </View>
          <View
            className ='flex-row'
          >
            {Array(5).fill().map(() => (
              <View>
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
          <Text>dia chi</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default HotelDetail