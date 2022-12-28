import { View, 
        Text,
        TouchableOpacity,
        ScrollView,
        Image,
        TextInput,
        Platform 
} from 'react-native'
import React ,{useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import * as Animatable from 'react-native-animatable';

import ApiCall from '../../api/ApiCall'


const ReceiptTour = () => {

    const {params:{item}} = useRoute()
    const [isLoading, setIsLoading] = useState(false)
    const [ref,setRef] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [count, setCount] = useState(1)
    const [error,setError] = useState('')
    const [succes,setSucces] = useState('')
    let remain = 0

    const navigation = useNavigation()

    const setRemain = () => {
        remain =  item ? item.count - count : 0
    }

    const handleSubmit = async () => {
        if(!name || phone.length < 8 || email.length <= 10  ){
            setError('Vui lòng nhập đầy đủ thông tin')
        }else if (!email.includes('@')) {
            setError('Vui lòng nhập đúng email')
        }else if (parseInt(count) <= 0 ) {
            setError('Vui lòng nhập số lượng lớn hơn 0')
        }else {
            setError('')
            setIsLoading(true)
            setRemain()
            let customerID
            await ApiCall.createCustomer(name,phone,email)
            .then(result => customerID = result._id)
            .catch(() => setError('Đã có lỗi xảy ra vui lòng thử lại'))
            await ApiCall.createReceiptTour(customerID,item._id,count)
            .then(() => {
                setTimeout(()=> {
                    setIsLoading(false)
                    setSucces('Bạn đã đặt thành công nhân viên sẽ gọi cho bạn để xác nhận lại')
                },1000) 
                console.log('sucess')
            })
            .catch(() => {
                setError('Đã có lỗi xảy ra vui lòng thử lại')
                setIsLoading(false)
            })   
            await ApiCall.setTourCount(item._id,remain)       
        }
    }
  return (
    <View
        className ='bg-white flex-1'
    >   
    {
        isLoading ?
        <View
            className ='w-full h-full justify-center items-center'
            style = {{
                backgroundColor : '#fbf3cb'
            }}
        >
            <Animatable.Image
                source={require('../../assets/loadbooking.gif')}
                className ='w-1/2 h-1/2'
                resizeMode = 'contain'
            />
        </View> :
         succes ? 
         <View
             className ='w-full h-full items-center justify-between  pb-20'
             style = {{
                 backgroundColor : '#e8e4d5'
             }}
         >
             <View
                 className = 'px-10'
             >   
                <View
                     className = 'flex-1 justify-center items-center'
                >
                 <View
                     className = 'border-4 p-2 rounded-full'
                     style = {{
                         borderColor : '#66cd00'
                     }}
                 >
                     <Icon
                         name = 'check'
                         color= '#66cd00'
                         size = {50}
                      />
                      </View>
                  <Text
                      className = 'mt-5 text-lg text-center font-bold text-green-500'
                  >
                      {succes}
                  </Text> 
                </View>
             </View>
             <TouchableOpacity
                 onPress={()=> navigation.navigate('Home')}
                 className ='flex-row mt-4 items-center gap-x-2'
             >
                 <Text
                     className ='text-blue-400'
                 >Quay về trang chủ</Text>
                 <Icon
                     name = 'arrow-right'
                     color = '#1c86ee'
                     size = {20}
                 />
             </TouchableOpacity>
         </View> : 
        <View>
            <View
                className = {Platform.OS == 'android' ?  
                'items-end flex-row  h-20 px-3 py-2 bg-pink-500' :
                'items-center flex-row h-22 px-3 py-2 bg-pink-500' }
            >
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    className = 'w-8 p-2 mr-2 rounded-full '
                >
                    <Icon
                        name = 'angle-left'
                        color= '#fff'
                        size = {20}
                    />
                </TouchableOpacity>
                <View
                    className = 'flex-1'
                >
                    <Text
                        className = 'font-bold text-lg text-white text-center'
                    >
                        Vui lòng điền thông tin
                    </Text>
                </View>
            </View>
            <ScrollView
                ref={ref => {
                    setRef(ref)
                }}
                contentContainerStyle = {{
                    paddingBottom : 100
                }}
            >
                <View
                    className = ' w-full h-48 items-center justify-center'
                >
                    <Image
                        source={require('../../assets/icon.png')}
                        className ='w-1/2'
                        resizeMode='contain'
                    />
                </View>
                <View
                    className ='mx-8'
                >  
                    <Text
                        className ='text-red-500'
                    >
                        {error}
                    </Text>
                    {/* Họ tên */}
                    <View
                    >
                        <Text
                            className ='font-bold'
                        >
                            Họ tên:
                        </Text>
                        <TextInput
                            value={name}
                            onChangeText = {text => setName(text)}
                            className ='border-2 px-3 py-2 rounded-lg'
                            placeholder='Vui lòng nhập tên'
                            onFocus = {() => {
                                ref.scrollTo({
                                    x:0,
                                    y:200,
                                    animated : true,
                                })
                            }}
                            
                        />
                    </View>
                    {/* Số điện thoại */}
                    <View
                        className ='mt-3'
                    >
                        <Text
                            className ='font-bold'
                        >
                            Số điện thoại:
                        </Text>
                        <TextInput
                            value={phone}
                            onChangeText = {text => setPhone(text)}
                            className ='border-2 px-3 py-2 rounded-lg'
                            placeholder='vd: 028 3936 2020'
                            keyboardType='numeric'
                        />
                    </View>
                    {/* email */}
                    <View
                        className ='mt-3'
                    >
                        <Text
                            className ='font-bold'
                        >
                            Email:
                        </Text>
                        <TextInput
                            value={email}
                            className ='border-2 px-3 py-2 rounded-lg'
                            placeholder='vd: mybooking@gmail.com'
                            keyboardType='email-address'
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                    {/* Số lượng */}
                    <View
                        className ='mt-3'
                    >
                        <Text
                            className ='font-bold'
                        >
                            Số lượng:
                        </Text>
                        <TextInput
                            defaultValue = {`${count}`}
                            className ='border-2 px-3 py-2 rounded-lg'
                            placeholder='nhập số lượng'
                            keyboardType='numeric'
                            onChangeText={text => setCount(text)}
                        />
                    </View>
                </View>
                <View
                    className ='w-full mt-16 items-center'
                >
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className ='bg-pink-500 px-3 py-2 rounded-full shadow'
                    >
                        <Text
                            className ='font-bold text-white text-lg'
                        >
                            Xác nhận
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    }
        
    </View>
  )
}

export default ReceiptTour