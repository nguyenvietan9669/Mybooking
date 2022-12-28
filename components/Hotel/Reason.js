import { View, 
    Text, 
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import React from 'react'

const Reason = () => {

    const width = Dimensions.get('window').width

  return (
    <View
        className = 'mt-5'
    >
        <View>
            <Text
                className = 'font-bold text-lg'
            >
                Tại sao bạn nên đặt phòng tại MYBooking?
            </Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
            className = 'mt-3'
        >
            <View
                style = {
                    {
                     width : width / 2.5,
                    }
                }
                className = 'mr-3'
            >
                <Image
                    source={require('../../assets/mienphitraphong.png')}
                    className = 'rounded-lg w-full'
                    style = {{
                        height : width / 2.5 / 5 * 4
                    }}
                />
                <View
                    className = 'w-full mt-2 '
                >
                    <Text 
                        className = 'text-center font-bold text-pink-500'
                    >
                        Miễn phí trả phòng
                    </Text>
                </View>
            </View>
            <View
                style = {
                    {
                     width : width / 2.5,
                    }
                }
                className = 'mr-3'
            >
                <Image
                    source={require('../../assets/thanhtoan.png')}
                    className = 'rounded-lg w-full'
                    style = {{
                        height : width / 2.5 / 5 * 4
                    }}
                />
                <View
                    className = 'w-full mt-2'
                >
                    <Text 
                        className = 'text-center font-bold text-pink-500'
                    >
                        Thanh toán khi nhận phòng
                    </Text>
                </View>
            </View>
            <View
                style = {
                    {
                     width : width / 2.5,
                    }
                }
                className = 'mr-3'
            >
                <Image
                    source={require('../../assets/doiphong.png')}
                    className = 'rounded-lg w-full'
                    style = {{
                        height : width / 2.5 / 5 * 4
                    }}
                />
               <View
                    className = 'w-full mt-2'
                >
                    <Text 
                        className = 'text-center font-bold text-pink-500'
                    >
                        Dễ dàng đổi lịch
                    </Text>
                </View>
            </View>
            <View
                style = {
                    {
                     width : width / 2.5,
                    }
                }
                className = 'mr-3'
            >
                <Image
                    source={require('../../assets/hotro.png')}
                    className = 'rounded-lg w-full'
                    style = {{
                        height : width / 2.5 / 5 * 4
                    }}
                />
                <View
                    className = 'w-full mt-2 '
                >
                    <Text 
                        className = 'text-center font-bold text-pink-500'
                    >
                        Hỗ trợ 24/7
                    </Text>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default Reason