import { View, Text, Image} from 'react-native'
import React from 'react'

const PaymentPartner = () => {
  return (
    <View
        className = 'flex-row gap-2 p-4 flex-wrap'
    >
      <View
            className = 'w-24 h-12 rounded-lg overflow-hidden'
      >
        <Image
            source={require('../assets/mastercard.jpg')}
            className = 'w-full h-full'
        />
      </View>
      <View
            className = 'w-24 h-12 rounded-lg overflow-hidden'
      >
        <Image
            source={require('../assets/visa.jpg')}
            className = 'w-full h-full'
        />
      </View>
      <View
            className = 'w-24 h-12 rounded-lg overflow-hidden'
      >
        <Image
            source={require('../assets/paypal.jpg')}
            className = 'w-full h-full'
        />
      </View>
      <View
            className = 'w-24 h-12 rounded-lg overflow-hidden'
      >
        <Image
            source={require('../assets/momo.png')}
            className = 'w-full h-full'
            resizeMode='contain'
        />
      </View>
    </View>
  )
}

export default PaymentPartner