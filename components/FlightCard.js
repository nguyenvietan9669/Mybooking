import { View, 
    Text, 
    TouchableOpacity,
    Image,
    Animated
} from 'react-native'
import React ,{useEffect,useRef} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'

const FlightCard = ({id,url,departure,destination,seat,fromDate,brand}) => {

    const navigation = useNavigation()

    const handleShowFlightDetail = async () => {
        navigation.navigate('Flight',{departure,destination,seat,count:1,fromDate})
    }

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
   <>
   <Animated.View
        style = {{opacity:fadeAnim}}
   >
     <TouchableOpacity 
        onPress={()=> handleShowFlightDetail(id)}
        className = 'w-64 bg-white rounded-lg overflow-hidden mr-4 shadow-xl'
     >
        <Image
            source={{
            uri:urlFor(url).url()
            }}
            className = 'w-full h-48 '
        />
        <View className = 'items-center shadow-2xl px-1 pb-3'>
            <View className = 'w-full flex-row items-center justify-center'>
            <Text className = ' font-bold text-sm mr-3'>{departure.location.city}</Text>
            <View 
                className = 'mr-3'
            >
                <Icon 
                    name = 'arrow-right'
                    color= '#000'
                    size = {15}
                />
            </View>
                <Text className = ' font-bold text-sm'>{destination.location.city}</Text>
            </View>
            <View className = 'gap-y-1 items-center' >
                <Text className = 'font-bold text-gray-400 text-sm'>{fromDate}</Text>
                <Text className = 'font-bold text-gray-400 text-sm'>{brand}</Text>
            </View>
        </View>
     </TouchableOpacity>
     </Animated.View>
   </>
  )
}

export default FlightCard