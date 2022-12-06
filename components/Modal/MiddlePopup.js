import { View , Modal  } from 'react-native'
import React ,{useState,useEffect} from 'react'

const MiddlePopup =({visible,children}) => {
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
                className = 'flex-1 items-center justify-center bg-gray-400 opacity-50'
            >
            </View>
            <View
                className = 'flex-1 w-full absolute top-1/3'
            >
                <View className = 'bg-white overflow-hidden pb-10'>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default MiddlePopup