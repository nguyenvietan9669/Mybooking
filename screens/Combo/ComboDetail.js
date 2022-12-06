import { View, 
    Text, 
    ScrollView, 
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../../sanity'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from "@env"
import formatCash from '../../utills/formatCash'

const ComboDetail = () => {

    const navigation = useNavigation()
    const {params:{item}} = useRoute()
    const width = Dimensions.get('window').width
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown : false
        })
    },[])


  return (
   <>
     <ScrollView>
       <View
         className = 'w-full'
         style = {{
            height : width/2
         }}
       >
         <Image
             source= {{uri:urlFor(item.image).url()}}
             className = 'w-full h-full'
             // resizeMode='cover'
         />
         <TouchableOpacity
             onPress={()=> navigation.goBack()}
             className = 'absolute top-10 left-5 w-fit h-fit py-2 px-4 bg-pink-500 rounded-full'
         >
             <Icon
                 name='angle-left' 
                 color='#fff' 
                 size= {30}
             />
         </TouchableOpacity>
       </View>
       <View
         className = 'p-3'
       >
         <View
             className = 'items-center gap-y-2 mt-3 mx-3'
         >
             <View
                 className = 'w-4/5 p-3 bg-white rounded-xl shadow'
             >
                 <Text
                     className ='font-bold'
                 >
                     Vé máy bay
                 </Text>
                 <View>
                     <Text>{item.flight.date_departure}</Text>
                     <View
                         className ='flex-row gap-x-2'
                     >
                         <Text>
                             {item.flight.departure.name}
                         </Text>
                         <Icon
                             name = 'arrow-right'
                             color= '#000'
                             size = {15}
                         />
                         <Text>
                             {item.flight.destination.name}
                         </Text>
                     </View>
                     <Image
                         source={{uri:urlFor(item.flight.plane.brand.logo).url()}}
                         className = 'w-1/2 h-10'
                         resizeMode='contain'
                     />
                 </View>
             </View>
             <View
                 className ='w-4/5 p-3 bg-white rounded-xl shadow'
             >
                 <Text
                     className ='font-bold'
                 >
                     Visa
                 </Text>
                 <View
                     className ='flex-row justify-between'
                 >
                     <Text>{item.visa.name}</Text>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('VisaDetail',{item:item.visa})}
                    >
                      <Text
                          className = 'text-sky-400 text-xs'
                      >
                         xem chi tiết
                      </Text>
                    </TouchableOpacity>
                 </View>
             </View>  
             <View
                className ='bg-white w-4/5 px-3 py-5 rounded-lg'
             >
                <Text
                    className ='text-orange-500 font-bold'
                >
                   Giá: {formatCash(item.price)}
                </Text>
            </View>   
         </View>
         <View
             className = 'mt-4 p-3 bg-white rounded-lg shadow'
         >
             <Text
                 className ='font-bold text-sm'
             >
                 Mua combo bạn sẽ nhận được những gì?
             </Text>
             <View
                 className = 'overflow-hidden'
             >
                 <SanityBlockContent
                     blocks={item.content}
                     projectId = {PROJECT_ID}
                     dataset="production"
                     imageOptions={{fit: 'max'}}
                 />
             </View>
         </View>
       </View>
       
     </ScrollView>
     <View
        className = 'fixed bottom-0 h-16 px-5 bg-pink-500'
      > 
        <TouchableOpacity
            onPress={() => navigation.navigate('ReceiptCombo', {item})}
            className = 'w-full py-2 items-center'
        >
            <Text
                className =' text-white font-bold text-2xl'
            >
                Đặt
            </Text>
        </TouchableOpacity>
      </View>
   </>
  )
}

export default ComboDetail