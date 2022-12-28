import { View, 
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation ,useRoute } from '@react-navigation/native'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from '@env'


const DescriptionScreen = () => {

    const navigation = useNavigation()
    const {params : {item}} = useRoute()

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
                        Mô tả về khách sạn
                    </Text>
                </View>
            </View>
        </View>

        {/*Nội dung mô tả */}

        <ScrollView
            className = 'px-3'
        >
            <View
               className = 'mt-3'     
            >
                <SanityBlockContent
                    renderContainerOnSingleChild = {true}
                    blocks={item}
                    projectId={PROJECT_ID}
                    dataset="production"                    
                />
            </View>
        </ScrollView>
    </View>
  )
}

export default DescriptionScreen