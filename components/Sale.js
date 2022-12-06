import { View, 
    Text, 
    ScrollView } from 'react-native'
import React ,{memo} from 'react'
import SaleCard from './SaleCard'

const Sale = ({title,sales = []}) => {
  return (
    <View className = 'mt-12'>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
        >
            {
                title.map((item,index)=> 
                   <View
                        key={index}
                        className = 'ml-4'
                   >
                     <View key={index} className = 'w-fit bg-red-600 rounded-full  px-4 py-1'>
                         <Text className = 'font-bold text-lg text-white'>{item}</Text>
                     </View>
                    <View
                        className ='mt-0.5 border-2 border-red-600 rounded-full' 
                     />
                   </View>
                )
            }
        </ScrollView>
        <ScrollView 
            contentContainerStyle= {{
                paddingHorizontal : 15,
                paddingTop: 15,
            }}
            horizontal
            showsHorizontalScrollIndicator = {false}
        >
            {sales?.map(item => (
                 <SaleCard
                    key={item._id} 
                    item = {item}
                />
            ))}
        
        </ScrollView>
    </View>
  )
}

export default memo(Sale)