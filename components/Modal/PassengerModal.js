import { View, Text, Modal, TouchableOpacity} from 'react-native'
import React ,{useState, useEffect} from 'react'

const PassengerModal = ({visible,children,setVisible}) => {
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
            animationType = 'slide'
            className ='relative' 
            transparent visible = {showModal}
        >
            <TouchableOpacity
                onPress={() => setVisible(false)}
                className = 'flex-1 items-center justify-start bg-gray-400 opacity-50'
            >
            </TouchableOpacity>
            <View className = 'absolute bottom-0 w-full h-2/5 bg-white items-center rounded-tr-xl rounded-tl-xl'>
                {children}
            </View>
        </Modal>
    )
}

export default PassengerModal