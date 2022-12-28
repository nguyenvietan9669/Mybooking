import { View, 
  Text,
  Image, 
  TouchableOpacity,
  Animated, 
  ImageBackground
} from 'react-native'
import React ,{useRef, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import formatTitle from '../utills/formatTitle'

const DestinationCard = ({id,url,title}) => {

  const navigation = useNavigation()

  const fadeAnim = useRef(new Animated.Value(0)).current 
    
    const fadeIn = () => {
        Animated.timing(
            fadeAnim,
            {
              toValue: 100,
              duration: 10000,
              useNativeDriver: false
            }
          ).start();
    }

    useEffect(()=> {
        fadeIn()
    },[])

  return (
    <Animated.View
      style = {{opacity:fadeAnim}}
    >
      <TouchableOpacity 
        className ='relative mr-2'
        onPress={() => navigation.navigate('ContentList',{id,title})}
      >
          <Image
              source={{
                  uri:url
              }}
              className = 'h-48 w-72 rounded-lg '
          />
          <ImageBackground
            source={require('../assets/location.png')}
            className = 'absolute bottom-0 right-0 h-36 w-72 items-end justify-end p-2'
            resizeMode= 'fill'
          >
              <Text
                className = 'font-black uppercase text-xl text-white shadow'
              >
                {formatTitle(title,14)}
              </Text>
          </ImageBackground>
          {/* <View
            className ='flex-row items-center bg-pink-400 absolute top-0 left-0 px-2 shadow rounded-tl-lg rounded-br-lg'
          >
            <View
              className ='mr-2'
            >
              <Icon
                name = 'map-marker-alt'
                color = '#fff'
                size = {16}
              />
              </View>
            <Text className= ' font-bold text-lg text-white'>{title}</Text>
          </View> */}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default DestinationCard