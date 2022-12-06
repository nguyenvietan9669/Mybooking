import { View, Text, TouchableOpacity,Image,TextInput, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import OptionModal from '../../components/Modal/OptionModal';
import BottomPopup from '../../components/Modal/BottomPopup';
import MiddlePopup from '../../components/Modal/MiddlePopup';
import ApiCall from '../../api/ApiCall';

const TicketScreen = () => {
    const navigation = useNavigation()


    const [visibleModal,setVisibleModal] = useState(false)
    const [visiblePassenger,setVisiblePassenger] = useState(false)
    const [visibleSeat,setVisibleSeat] = useState(false)
    const [isCheck,setIsCheck] = useState(false)
    const [listSeat,setListSeat] = useState([])
    const [departure,setDeparture] = useState()
    const [destination,setDestination] = useState()
    const [passenger,setPassenger] = useState([])
    const [indexSeat,setIndexSeat] = useState(0)
    const [show, setShow] = useState(false);
    const [showReturn, setShowReturn] = useState(false);
  
    const [datePar,setDatePar] = useState(new Date().getDate())
    const [monthPar,setMonthPar] = useState(new Date().getMonth()+1)
    const [yearPar,setYearPar] = useState(new Date().getFullYear())

    const [dateReturn,setDateReturn] = useState(new Date().getDate())
    const [monthReturn,setMonthReturn] = useState(new Date().getMonth()+1)
    const [yearReturn,setYearReturn] = useState(new Date().getFullYear())


    const [numberPeople,setNumberPeople] = useState({title:'Người lớn',count: 0})
    const [numberChildren,setNumberChildren] = useState({title:'Trẻ em',count: 0})
    const [numberBaby,setNumberBaby] = useState({title:'Em bé',count: 0})


    const handlePlusPeople = () => {
        setNumberPeople(prev => {return ({...prev , count : prev.count += 1})})
    }

    const handleSubPeople = () => {
        if(numberPeople.count > 0) {
            setNumberPeople(prev => {return ({...prev , count : prev.count -= 1})})
        }
    }

    const handlePlusChildren = () => {
        setNumberChildren(prev => {return ({...prev , count : prev.count += 1})})
    }

    const handleSubChildren = () => {
        if(numberChildren.count > 0) {
            setNumberChildren(prev => {return ({...prev , count : prev.count -= 1})})
        }
    }
    const handlePlusBaby = () => {
        setNumberBaby(prev => {return ({...prev , count : prev.count += 1})})
    }

    const handleSubBaby = () => {
        if(numberBaby.count > 0) {
            setNumberBaby(prev => {return ({...prev , count : prev.count -= 1})})
        }
    }

    const handleSubmitPassenger = () => {
        setPassenger([])
        console.log(passenger)
        if(numberPeople.count > 0){
            setPassenger(prev => [...prev,numberPeople])
        }
        if(numberChildren.count > 0){
            setPassenger(prev =>[...prev,numberChildren])
        }
        if(numberBaby.count > 0){
            setPassenger(prev => [...prev,numberBaby])
        }
        setVisiblePassenger(false)
    }

    const handleChangeSeat = (index) => {
        setIndexSeat(index)
    }

    const handleDate = ()=> {
        setIsCheck(prev => (
            !prev
        )
    )
    }

    useLayoutEffect(()=> {
        navigation.setOptions(
            {
              headerShown:false,
            }
        )
    },[])

    useEffect(()=> {
        const getSeat = async () => {
            await ApiCall.getSeat()
            .then(data => {
                    setListSeat(data)
                }).catch(err => console.log(err))
        }
        getSeat()
    },[])

    const handleSearch = () => {
        let total = 0
        let returnDate = null
        if(passenger){
            passenger.forEach((item) => {
               if(item.title != 'Em bé'){
                    total += item.count
               }
            }         
            )
        }
        if(isCheck){
            returnDate = `${yearReturn}-${monthReturn}-${dateReturn}`
            console.log(returnDate)
        }
        if(departure && destination && total > 0) {
            navigation.navigate('Flight',{departure,destination,seat:listSeat[indexSeat],count:total,fromDate:`${yearPar}-${monthPar}-${datePar}`,returnDate})
        }
    }

  return (
    <View className = 'h-full read-only:'>
        <OptionModal 
            visible={visibleModal}
        >
            <View className ='flex-1'>
                <TouchableOpacity
                    onPress={() => setVisibleModal(false)}
                    className = 'h-1/2 items-end justify-end pb-5 pr-5 border-b-2 border-white'
                >
                    <Text className ='font-bold text-xl text-white'>Đóng</Text>
                </TouchableOpacity>
                <View className = 'flex-1 items-center justify-center gap-2'>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Home')}
                    >
                        <Text className = 'font-bold text-white text-xl'>VỀ TRANG CHỦ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            setVisibleModal(false)
                            navigation.navigate('SupportScreen')
                        }}
                    >
                        <Text className = 'font-bold text-white text-xl'>TRỢ GIÚP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </OptionModal>
        <View className = 'flex-row items-end w-full h-24 pb-2 px-3 bg-pink-500 shadow'>
            
            <TouchableOpacity
                className ='px-2'
                onPress = {() => {
                    navigation.goBack()
                }}
            >
                <Icon 
                    name='arrow-left' 
                    color='#fff' 
                    size ={20} 
                    
                />
            </TouchableOpacity>

            <Text className = 'flex-1 text-center font-bold text-lg text-white'>Vé máy bay</Text>
            
            <TouchableOpacity
                onPress={() => {setVisibleModal(true)}}
            >
                <Icon name='ellipsis-h' color='#fff' size ={20} />
            </TouchableOpacity>
        </View>
        <View className ='flex-1 bg-white justify-between'>
            <View className = 'py-3'>
                <View>
                    <View className ='mt-2 ml-4'>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Location',{setState:setDeparture})}
                            className = 'flex-row gap-3 items-center'
                        >
                            <Icon name='plane-departure' color='#000' size = {20} />
                            <View className ='w-5/6  border-b-2 border-gray-400 pb-1'>
                                <Text className ='text-sm text-gray-500'>Điểm khởi hành</Text>

                                <Text
                                    className ='font-bold'
                                >
                                    {departure ? 
                                    departure.location.city + ' - ' + departure.code : 
                                    'Chọn điểm khởi hành của bạn' }
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Location',{setState:setDestination})}
                            className = 'flex-row gap-3 items-center mt-3'
                        >
                            <Icon name='plane-arrival' color='#000' size = {20} />
                            <View className ='w-5/6  border-b-2 border-gray-400 pb-1'>
                                <Text className ='text-sm text-gray-500'>Điểm đến</Text>

                                <Text
                                    className ='font-bold'
                                >
                                    {destination ? 
                                    destination.location.city + ' - ' + destination.code : 
                                    'Chọn điểm đến của bạn' }
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=> setVisiblePassenger(true)} 
                            className = 'flex-row gap-3 items-center mt-3'
                        >
                            <Icon 
                                name='user-friends' color='#000' size = {20} 
                                />
                            <View className ='w-5/6  border-b-2 border-gray-400 pb-1'>
                                <Text className ='text-sm text-gray-500'>Hành khách</Text>

                                <Text
                                    className ='font-bold'
                                >
                                {passenger.length > 0 ? 
                                passenger.map(item => ' + ' + item.count + ' ' + item.title) :
                                'Nhập số lượng hành khách'
                                }
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {setVisibleSeat(true)}}
                            className = 'flex-row gap-3 items-center mt-3'
                        >
                            <Icon name='chair' color='#000' size = {20} />
                            <View className ='w-5/6  border-b-2 border-gray-400 pb-1'>
                                <Text className ='text-sm text-gray-500'>Hạng ghế</Text>

                                <Text
                                    className = 'font-bold'
                                >
                                {listSeat.length > 0 ? listSeat[indexSeat].name : 'Mời chọn hạng ghế'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    
                    </View>
                    <View className ='mt-4 bg-gray-200 p-4'>
                        <Text className ='font-bold text-sm'>Ngày bay</Text>
                    </View>
                    <View className ='ml-4'>
                        <View className ='flex-row'>
                            <TouchableOpacity 
                                onPress={() => setShow(true)}
                                className = 'flex-1 flex-row gap-3 items-center mt-3'
                            >
                                <Icon name='calendar' color='#000' size = {20} />
                                <View className ='w-5/6 pb-1'>
                                    <Text className ='text-sm text-gray-500'>Ngày khởi hành</Text>
                                    <Text className ='font-bold' >{datePar}/{monthPar}/{yearPar }</Text>
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                className='items-center'
                                onPress={handleDate}
                                
                            >
                            <Text className ='text-gray-500 mt-2'>khứ hồi?</Text>
                            {isCheck ?
                                <View>
                                    <Image
                                        source={require('../../assets/check.gif')}
                                        className = 'w-16 h-12'
                                    />
                                </View> :
                                <View>
                                    <Image
                                        source={require('../../assets/uncheck.gif')}
                                        className = 'w-16 h-12'
                                    />
                                </View>
                            }
                            </TouchableOpacity>
                        </View>
                        {isCheck ? 
                        <TouchableOpacity 
                            onPress={()=> {setShowReturn(true)}}
                            className = 'flex-1 flex-row gap-3 items-center mt-3'
                        >
                            <Icon name='calendar' color='#000' size = {20} />
                            <View className ='w-5/6 pb-1'>
                                <Text className ='text-sm text-gray-500'>Ngày quay về</Text>
                                <Text className ='font-bold' >{dateReturn}/{monthReturn}/{yearReturn}</Text>
                            </View>
                        </TouchableOpacity> :
                        <></>} 
                    </View>
                </View>
            </View>
            <TouchableOpacity 
                onPress={handleSearch}
                className ='w-full items-center mb-10'
            >
                <View className = 'w-1/2 bg-pink-500  px-2 py-3 rounded-full shadow'>
                    <Text className =' text-center text-white font-bold ' >Tìm</Text>
                </View>
            </TouchableOpacity>
        </View>
        
        {/* Nhập ngày tháng */}
        <MiddlePopup visible={show}>
            <View>
                <View
                    className ='w-full h-16 px-4 bg-pink-400 justify-center'
                >
                    <Text
                        className ='font-bold text-white'
                    >
                        {datePar} / {monthPar} / {yearPar}
                    </Text>
                </View>
                <View
                    className = 'flex-row  mt-5'
                >
                    <View
                        className ='w-1/3 p-2 items-center'
                    >
                        <Text
                            className ='font-bold text-lg'
                        >
                            Ngày
                        </Text>
                        <TextInput
                            className ='w-1/2 text-sm py-2 px-1 font-bold text-center border pl'
                            placeholder='date'
                            defaultValue={`${datePar}`}
                            // value= {datePar}
                            keyboardType ='numeric'
                            placeholderTextColor= '#d2d2d2'
                            onChangeText = {text => {
                                if(text < 32){
                                    setDatePar(text)
                                }
                            }}
                           
                        />
                    </View>
                    <View
                        className ='w-1/3 p-2 items-center'
                    >
                        <Text
                            className ='font-bold text-lg'
                        >Tháng</Text>
                        <TextInput
                            className ='w-1/2 text-sm py-2 px-1 font-bold text-center border pl'
                            placeholder='month'
                            placeholderTextColor= '#d2d2d2'
                            defaultValue={`${monthPar}`}
                            // value={monthPar}
                            keyboardType ='numeric'
                            onChangeText = {text => {
                                if(text < 13){
                                    setMonthPar(text)
                                }
                            }
                            }
                        />
                    </View>
                    <View
                        className ='w-1/3 p-2 items-center'
                    >
                        <Text
                            className ='text-center font-bold text-lg'
                        >Năm</Text>
                        <TextInput
                            className ='w-1/2 text-sm py-2 px-1 font-bold text-center border pl'
                            placeholder='year'
                            placeholderTextColor= '#d2d2d2'
                            defaultValue={`${yearPar}`}
                            // value={yearPar}
                            keyboardType ='numeric'
                            onChangeText = {text => {
                                if(text > 2021){
                                    setYearPar(text)
                                }
                            }}
                        />
                    </View>
                </View>
                <View
                    className ='w-full items-center mt-5'
                >
                    <TouchableOpacity
                        onPress={()=> {
                            if(datePar == ''){
                                setDatePar(new Date().getDate())
                            }
                            if(monthPar == ''){
                                setMonthPar(new Date().getMonth() + 1)
                            }
                            if(yearPar == ''){
                                setYearPar(new Date().getFullYear())
                            }
                            setShow(false)
                        }}
                        className = 'px-4 py-2 bg-pink-500 rounded-lg'
                    >
                        <Text
                            className ='font-bold text-lg text-white'
                        >
                            Chọn
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MiddlePopup>
        {/* Ngày quay về */}
        <MiddlePopup visible={showReturn} >
            <View
                className =''
            >
                <View
                    className ='w-full h-16 px-4 bg-pink-400 justify-center'
                >
                    <Text
                        className ='font-bold text-white'
                    >
                        {dateReturn} / {monthReturn} / {yearReturn}
                    </Text>
                </View>
                <View
                    className = 'flex-row gap-x-2 mt-5'
                >
                    <View
                        className ='flex-1 p-2 items-center'
                    >
                        <Text
                            className ='font-bold text-lg'
                        >Ngày</Text>
                        <TextInput
                            className ='w-1/2 text-sm font-bold py-3'
                            placeholder='nhập...'
                            defaultValue = {`${dateReturn}`}
                            keyboardType ='numeric'
                            onChangeText = {text => {
                                if(text < 32){
                                    setDateReturn(text)
                                }
                            }}
                            onPressOut = {() => {
                                console.log(dateReturn)
                                if(dateReturn == ''){
                                    setDateReturn(new Date().getDate())
                                }
                            }
                            }
                        />
                    </View>
                    <View
                        className ='flex-1 p-2 items-center'
                    >
                        <Text
                            className ='text-center font-bold text-lg'
                        >Tháng</Text>
                        <TextInput
                            className ='w-1/2 text-sm font-bold p-3'
                            placeholder='nhập...'
                            defaultValue= {`${monthReturn}`}
                            keyboardType ='numeric'
                            onChangeText = {text => {
                                if(text < 13){
                                    setMonthReturn(text)
                                }
                            }}
                        />
                    </View>
                    <View
                        className ='flex-1 p-2 items-center'
                    >
                        <Text
                            className ='text-center font-bold text-lg'
                        >Năm</Text>
                        <TextInput
                            className ='w-1/2 text-sm font-bold px-2 py-3'
                            placeholder='nhập'
                            value={`${yearReturn}`}
                            keyboardType ='numeric'
                            onChangeText = {text => {
                                if(text > 2021){
                                    setYearReturn(text)
                                }
                            }}
                        />
                    </View>
                </View>
                <View
                    className ='w-full items-center mt-5'
                >
                    <TouchableOpacity
                        onPress={()=>{
                            if(dateReturn == ''){
                                setDateReturn(new Date().getDate())
                            }
                            if(monthReturn == ''){
                                setMonthReturn(new Date().getMonth() + 1)
                            }
                            if(yearReturn == ''){
                                setYearReturn(new Date().getFullYear())
                            }
                            setShowReturn(false)
                            }}
                        className = 'px-4 py-2 bg-pink-500 rounded-lg'
                    >
                        <Text
                            className ='font-bold text-lg text-white'
                        >
                            Chọn
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MiddlePopup>
        {/* Hành khách */}
        <BottomPopup visible={visiblePassenger} setVisible = {setVisiblePassenger}>
            <View className='w-1/3 h-1 mt-3 bg-black rounded-full '/>
            <View className ='w-full h-12 border-b-2 justify-center border-gray-200'>
                <Text className ='font-bold text-center text-lg'>Thêm hành khách</Text>
            </View>
            <View className ='w-full flex-1 flex-row justify-center gap-2 mt-10'>
                <View className ='flex-1 items-center'>
                    <View className ='text-center'>
                        <Text className ='font-bold text-lg'>Người lớn</Text>
                        <Text className = 'text-gray-400'>Trên 12 tuổi</Text>
                    </View>
                    <View className ='flex-row w-full gap-4 justify-between items-center p-2 mt-8'>
                        <Button 
                            title='+' 
                            onPress={handlePlusPeople}
                        />
                        <Text className = 'font-bold'>
                            {numberPeople.count}
                        </Text>
                        <Button 
                            title='-' 
                            onPress={handleSubPeople}
                        />
                    </View>
                </View>
                <View className ='flex-1 items-center'>
                    <View className ='text-center'>
                        <Text className ='font-bold text-lg'>Trẻ em</Text>
                        <Text className = 'text-gray-400'>Từ 2 - 11 tuổi</Text>
                    </View>
                    <View className ='flex-row w-full gap-4 justify-between items-center p-2 mt-8'>
                        <Button 
                            title='+' 
                            onPress={handlePlusChildren}
                        />
                        <Text className = 'font-bold'>
                            {numberChildren.count}
                        </Text>
                        <Button 
                            title='-' 
                            onPress={handleSubChildren}
                        />
                    </View>
                </View>
                <View className ='flex-1 items-center'>
                    <View className ='text-center'>
                        <Text className ='font-bold text-lg'>Em bé</Text>
                        <Text className = 'text-gray-400'>Dưới 2 tuổi</Text>
                    </View>
                    <View className ='flex-row w-full gap-4 justify-between items-center p-2 mt-8'>
                        <Button 
                            title='+' 
                            onPress={handlePlusBaby}
                        />
                        <Text className = 'font-bold'>
                            {numberBaby.count}
                        </Text>
                        <Button 
                            title='-' 
                            onPress={handleSubBaby}
                        />
                    </View>
                </View>
            </View>
            <View className ='w-full flex-row pb-7 justify-center gap-2 mt-10'>
                <TouchableOpacity 
                    onPress={handleSubmitPassenger}
                    className ='w-1/3 py-2 bg-pink-500 rounded-full shadow'
                >
                    <Text className ='text-white font-bold text-center'>Chọn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setVisiblePassenger(false)} 
                    className ='w-1/3 py-2 bg-pink-500 rounded-full shadow'
                >
                    <Text className ='text-white font-bold text-center'>Huỷ</Text>
                </TouchableOpacity>
            </View>
        </BottomPopup>
        {/* Ghế */}
        <BottomPopup visible={visibleSeat} setVisible = {setVisibleSeat}>
            <View className='w-1/3 h-1 mt-3 bg-black rounded-full '/>
                <View className ='w-full h-12 border-b-2 justify-center border-gray-200'>
                    <Text className ='font-bold text-center text-lg'>CHỌN HẠNG GHẾ CỦA BẠN</Text>
                </View>
                <View className ='w-full flex-1 px-2 mt-5 items-center justify-between'>
                    <View className ='w-full mt-2 '>
                        {listSeat?.map((seat,index) => (
                            <TouchableOpacity 
                                onPress={() => handleChangeSeat(index)}
                                className ='w-fit flex-row items-center gap-x-2 pb-2 border-gray-200 border-b-2'
                                key={index}
                            >
                                    <Icon name='check-circle' color = { indexSeat == index ? 'blue' : '#000'} size = {20}/>
                                    <View 
                                        className = 'flex-1 px-2'
                                    >
                                        <Text className = 'font-bold text-xl'>{seat.name}</Text>
                                        <Text className = 'text-lg text-gray-500'>{seat.description}</Text>
                                    </View>
                                </TouchableOpacity>
                        )) }
                </View>  
                <TouchableOpacity 
                        onPress={()=>setVisibleSeat(false)}
                        className ='w-1/2 py-2 bg-pink-400 rounded-full shadow mb-5 mt-10'
                >
                        <Text className = 'text-white font-bold text-center'>Chọn</Text>
                </TouchableOpacity>
            </View>
        </BottomPopup>
    </View>
  )
}

export default TicketScreen