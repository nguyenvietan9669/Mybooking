import { View, 
        Text,
        Image,
 } from 'react-native'
import React, { useEffect, useState } from 'react'
import ApiCall from '../../api/ApiCall'
import { urlFor } from '../../sanity'

const Utilities = ({id}) => {

    const [util,setUtil] = useState([])

    useEffect(()=> {
        ApiCall.getUtilities(id)
        .then(data => {
            setUtil(data)
        })
    },[])
  return (
    <View
        className ='flex-row gap-x-2 mt-2'
    >
        {  util && util?.map(item => (
            <View
                key={item._id}
                className = 'flex-row gap-x-3'
            >
                <View>
                    <Image
                        source={{uri : urlFor(item.icon).url()}}
                        className = 'w-5 h-5'
                    />
                </View>
                <Text>
                    {item.name}
                </Text>
            </View>
        ))           
        }
    </View>
  )
}

export default Utilities