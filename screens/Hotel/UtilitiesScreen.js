import { View, 
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation , useRoute } from '@react-navigation/native'
import { urlFor } from '../../sanity'

const UtilitiesScreen = () => {

    const navigation = useNavigation()
    const {params:{item}} = useRoute()


  return (
    <View
        className ='bg-white flex-1'
    >
        <View
            className = 'w-full h-24 bg-pink-500 justify-end pb-3 px-3'
        >
            <View
                className = 'flex-row'
            >
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                >
                    <Icon
                        name = 'arrow-left'
                        color='#fff'
                        size = {20}
                    />
                </TouchableOpacity>
                <View
                    className ='flex-1'
                >
                    <Text
                        className ='text-white font-bold text-center'
                    >
                        Tất cả tiện ích
                    </Text>
                </View>
            </View>
        </View>

        {/* Danh sách tiện ích  */}

        <ScrollView
            className = 'px-3'
        >
            {
                item && item.map((item,index) => (
                    <View
                        key={index}
                        className = 'flex-row gap-x-2 items-center mt-2'
                    >
                        <View
                            className ='w-16 h-16'
                        >
                            <Image
                                source={{uri: urlFor(item.icon).url()}}
                                resizeMode = 'contain'
                                className = 'w-full h-full'
                            />
                        </View>
                        <View>
                            <Text
                                className = 'text-lg'
                            >
                                {item.name}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    </View>
  )
}

export default UtilitiesScreen