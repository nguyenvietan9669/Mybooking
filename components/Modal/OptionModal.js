
import { View, Text , Modal } from 'react-native'
import React, {useState, useEffect} from 'react'

const OptionModal = ({visible,children}) => {
    const [showModal,setShowModal] = useState(visible)
    const toggleModal = () => {
        if(visible){
            setShowModal(true)
        }else {
            setShowModal(false)
        }
    }

    useEffect(()=> {
        toggleModal()
    },[visible])

    return (
        <Modal
            animationType = 'fade'
            className ='relative' 
            transparent visible = {showModal}
        >
            <View
                className = 'flex-1 items-center justify-start bg-gray-400 opacity-50'
            >
            </View>
            <View className = 'absolute w-full h-1/4 bg-sky-400 rounded-br-xl rounded-bl-xl'>
                {children}
            </View>
        </Modal>
    )
}

export default OptionModal