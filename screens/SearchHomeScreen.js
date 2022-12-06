import { View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image 
} from 'react-native'
import React ,{useLayoutEffect, useRef, useState,memo} from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import ApiCall from '../api/ApiCall'
import { urlFor } from '../sanity'

const SearchHomeScreen = () => {

  const inputRef = useRef()
  const navigation = useNavigation()

  const [result,setResult] = useState([])
  const [inputText,setInputText] = useState('')

  useLayoutEffect(()=> {
    inputRef.current.focus()
  },[])

  const handleSearch = async () => {
    await ApiCall.searchContent(inputText).then(data => {
      setResult(data)
    })
  }

  return (
    <>
      <View
        className = 'w-full h-24 bg-pink-500 justify-end pb-3 px-4'
      >
        <View
          
        >
          <View
            className ='w-full flex-row items-center gap-x-3'
          >
              <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className = 'px-2'
              >
                <Icon
                  name = 'arrow-left'
                  color= '#fff'
                  size = {20}
                />
              </TouchableOpacity>
              <TextInput
                ref={inputRef}
                value = {inputText}
                className = 'flex-1 bg-white p-2 rounded-lg shadow'
                placeholder = 'Tìm kiếm bài viết'
                placeholderTextColor='#cccccc'
                onChangeText={text => setInputText(text)}
                onSubmitEditing = {handleSearch}
              />
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle = {{
          paddingBottom: 50
        }}
      >
          {
            result.length == 0 ?
            <Text
              className ='text-gray-400 font-bold text-center mt-5'
            >
              Không tìm thấy bài viết phù hợp
            </Text>:
            <>
              <View
                className ='bg-white shadow p-3 m-4'
              >
                <Text
                  className ='font-bold text-lg'
                >
                  Bài viết có liên quan đến từ khóa
                </Text>
               {result?.map(item => (
                <View
                  key={item._id}
                  className ='flex-row p-2 mt-3 border-b-2 border-gray-300'
                >
                  <View
                    className ='w-32 h-32 mr-3 rounded-xl overflow-hidden'
                  >
                    <Image
                      source={{
                        uri:urlFor(item.image).url()
                      }}
                      className ='w-full h-full'
                    />
                  </View>
                  <View
                    className ='flex-1'
                  >
                    <View
                      className = 'flex-row'
                    >
                      <Text
                        className ='flex-1 font-bold mr-5'
                      >{item.title}</Text>
                      <TouchableOpacity
                        onPress={()=> navigation.navigate('ContentDetail',{item})}
                        className ='px-2'
                      >
                        <Icon
                          name = 'angle-right'
                          color = '#1e90ff'
                          size = {30}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              </View>
              <View
                className = 'm-4 bg-white shadow rounded-xl p-4'
              >
                <TouchableOpacity
                  className ='flex-row items-center'
                  onPress={() => {
                    navigation.navigate('Ticket')
                  }}
                >
                  
                  <View
                    className = 'w-10 h-10 mr-5'
                  >
                    <Image
                      source={require('../assets/fly.png')}
                      className = 'w-full h-full'
                    />
                  </View>
                  <Text
                    className = 'font-bold'
                  >
                    Tìm Kiếm chuyến bay
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {navigation.navigate('Tour')}}
                  className ='flex-row items-center mt-3'
                >
                  
                  <View
                    className = 'w-10 h-10 mr-5'
                  >
                    <Image
                      source={require('../assets/tour.png')}
                      className = 'w-full h-full'
                    />
                  </View>
                  <Text
                    className = 'font-bold'
                  >
                    Khám phá tour
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> navigation.navigate('Visa')} 
                  className ='flex-row items-center mt-3'
                >
                  
                  <View
                    className = 'w-10 h-10 mr-5'
                  >
                    <Image
                      source={require('../assets/visa.png')}
                      className = 'w-full h-full'
                    />
                  </View>
                  <Text
                    className = 'font-bold'
                  >
                    Tìm visa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Combo')}                    
                  className ='flex-row items-center mt-3'
                >                 
                  <View
                    className = 'w-10 h-10 mr-5'
                  >
                    <Image
                      source={require('../assets/combo.png')}
                      className = 'w-full h-full'
                    />
                  </View>
                  <Text
                    className = 'font-bold'
                  >
                    Các Combo ưu đãi
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
      </ScrollView>
    </>
  )
}

export default memo(SearchHomeScreen)