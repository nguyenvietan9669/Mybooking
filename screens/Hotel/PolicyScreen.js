import { View, 
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation,useRoute } from '@react-navigation/native'
import { urlFor } from '../../sanity'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from '@env'

const PolicyScreen = () => {

    const navigation = useNavigation()
    const {params:{item}} = useRoute()
    const width = Dimensions.get('window').width
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
                        Chính sách lưu trú
                    </Text>
                </View>
            </View>
        </View>

        {/* Danh sách chính sách */}

        <ScrollView
            className = 'px-3'
        >
            {item && item.map((item,index) => (
                <View
                    key={index}
                    className = 'flex-row border-b border-gray-300 py-4'
                >
                    <View
                        className = 'w-10 h-10 mr-3'
                    >
                        <Image
                            source={{uri:urlFor(item.icon).url()}}
                            resizeMode = 'contain'
                            className = 'w-full h-full'
                        />
                    </View>
                    <View>
                        <View>
                            <Text
                                className ='font-bold text-lg'
                            >
                                {item.title}
                            </Text>
                        </View>
                        <View
                            style = {{
                                width : width / 5 * 4
                            }}
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
        </ScrollView>
    </View>
  )
}

export default PolicyScreen