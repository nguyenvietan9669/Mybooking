import { View, 
    Text, 
    ScrollView, 
    Image, 
    TouchableOpacity,
    StatusBar, 
    Dimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation,useRoute} from '@react-navigation/native'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from '@env'

import  Icon  from 'react-native-vector-icons/FontAwesome5'

import formatCash from '../../utills/formatCash'


const VisaDetail = () => {

    const width = Dimensions.get('window').width
    const navigation = useNavigation()

    const stutusBarHeight = StatusBar.currentHeight

    const {params:{item}} = useRoute()
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown:false
        })
        StatusBar.setBarStyle("light-content", false);
        // StatusBar.setBackgroundColor("#f95db2");
    },[])

    

  return (
   <>
    <TouchableOpacity
        onPress={()=> navigation.goBack()}
        className = 'absolute left-0 w-fit h-fit px-4 justify-end opacity-100 z-10'
        style = {
            {
                top : 0,
                height: 80,
            // backgroundColor : '#f95db2'
            }
        }
    >
        <Icon
            name='angle-left' 
            color='#f95db2' 
            size= {30}
        />
    </TouchableOpacity>
     <ScrollView
         showsVerticalScrollIndicator = {false}
         contentContainerStyle = {{
             paddingBottom:100
         }}
     >
         
         <View>
            
             <Image
                 source={require('../../assets/backgroundVisa.png')}
                 className = 'w-full'
                 style = {{
                    height : width/2
                 }}
                 resizeMode='cover'
             />
             <View
                 className = 'absolute bottom-5 left-3'
             >
                 <Text
                     className ='font-bold text-xl text-white' 
                 >
                     {item.title}
                 </Text>
             </View>
         </View>
         <View
             className = 'p-2'
         >
             <Text
                 className ='font-bold text-lg'
             >
                 Giới thiệu về dịch vụ
             </Text>
             <View
                 className = 'p-3'
             >
                 <SanityBlockContent
                     blocks={item.introdus}
                     projectId={PROJECT_ID}
                     dataset="production"
                     imageOptions={{fit: 'max'}}
                 />
             </View>   
         </View>
         <View
             className = 'p-2'
         >
             <Text
                 className ='font-bold text-lg'
             >
                 Quy trình làm việc
             </Text>
             <View
                 className = 'p-3'
             >
                 <SanityBlockContent
                     blocks={item.procedure}
                     projectId={PROJECT_ID}
                     dataset="production"
                     imageOptions={{fit: 'max'}}
                 />
             </View>   
         </View>
         <View
             className = 'p-2'
         >
             <Text
                 className ='font-bold text-lg'
             >
                 Gói dịch vụ
             </Text>
             <View
                 className = 'p-3'
             >
                 {item?.type.map((item,index) => (
                     <View
                         key={index}
                         className = 'bg-white py-2 px-4 rounded-lg shadow mt-3'
                     >
                         <Text
                             className ='font-bold text-sky-400 text-xl'
                         >
                             {item.name}
                         </Text>
                        <View
                            className ='flex-row items-center gap-x-2'
                        >
                            <Text
                                className =  'text-orange-500 flex-1 font-bold text-lg'
                            >
                                Giá: { item.price ? formatCash(item.price): ' ' }
                            </Text>
                            <TouchableOpacity
                                onPress={()=> navigation.navigate('ReceiptVisa',{item})}
                                className =' bg-pink-500 rounded-full px-3 py-2 shadow'
                            >
                                <Text
                                    className ='font-bold text-white text-lg text-center'
                                >
                                    Đặt
                                </Text>
                            </TouchableOpacity>
                        </View>
                     </View>
                 ))}
             </View>   
         </View>
     </ScrollView>
   </>
  )
}

export default VisaDetail