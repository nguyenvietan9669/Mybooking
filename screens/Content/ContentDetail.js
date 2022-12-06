import { View, 
    Text, 
    TouchableOpacity,
    Image, 
    ScrollView,
    Animated,
    Dimensions 
} from 'react-native'
import React ,
{
    useLayoutEffect,
    useEffect,
    useState ,
    useRef,
    memo,
} from 'react'
import { useNavigation,useRoute } from '@react-navigation/native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import SanityBlockContent from '@sanity/block-content-to-react'
import {PROJECT_ID} from '@env'
import formatDate from '../../utills/formatDate'
import client, { urlFor } from '../../sanity'
import formatTitle from '../../utills/formatTitle'
import ApiCall from '../../api/ApiCall'

const ContentDetail = () => {

    const {params:{item}} = useRoute()
    const navigation = useNavigation()
    const [navbar,setNavbar] = useState(false)
    const [visible,setVisible] = useState(false)
    const [moreContents,setMoreContents] = useState([])
    const [dataSource,setDataSource] = useState([])
    const [ref,setRef] = useState(null)
    const [items, setItems] = useState(item)

    const width = Dimensions.get('window').width
    
    useLayoutEffect(() => {
    navigation.setOptions({
        headerShown : false
    })
    
    }, [])

    const getMoreContent = async () => {
        await ApiCall.getMoreContent(item._id).then(data => {
            setMoreContents(data)
        })
    }

    useEffect(()=> {
        getMoreContent()
    },[items._id])

    useEffect(() => {
        if(visible){
           fadeIn()
        }else {
            fadeOut()
        }
    }, [visible])

    const navBarAnim = useRef(new Animated.Value(0)).current 
    const fadeAnim = useRef(new Animated.Value(0)).current 

    const fadeOutNavBar = () => {
        Animated.timing(
            navBarAnim,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false
            }
          ).start();
    }

    const fadeInNavbar = () => {
        Animated.timing(
            navBarAnim,
            {
              toValue: 90,
              duration: 500,
              useNativeDriver: false
            }
          ).start();
    }

    useEffect(()=> {
        if(navbar){
            fadeInNavbar()
        }else {
            fadeOutNavBar()
        }

    },[navbar])

    const fadeOut = () => {
        Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false
            }
          ).start();
    }

    const fadeIn = () => {
        Animated.timing(
            fadeAnim,
            {
              toValue: 200,
              duration: 500,
              useNativeDriver: false
            }
          ).start();
    }

    const scrollSmoothHandler = (index) => {
        ref.scrollTo({
            x:0,
            y: dataSource[index].y + dataSource[index].height,
            animated : true,
        })
    };

    const handleMoreContent = async (id) => {
        await client.fetch(`
            *[_type == 'content' && _id == '${id}' ]| order(_updatedAt) [0...15]{
                ...,
            }[0]
        `).then(data =>{
            setItems(data)
        })
        ref.scrollTo({
            x: 0,
            y: 0,
            animated : true,
        })
        setDataSource([])
    }

    const handleScroll = (e) => {
        const {nativeEvent} = e
        if (nativeEvent && nativeEvent.contentOffset) {
            const currentOffset = nativeEvent.contentOffset.y
            if (currentOffset >= 150) {
                setNavbar(true)
            }else {
                setNavbar(false)
            }
        } 
    }

  return (
    <>
        <Animated.View
            style = {{
                height : navBarAnim
            }} 
            className = 'absolute z-10 bg-pink-500 w-full justify-end overflow-hidden' 
        >
            <View
                className ='flex-row pb-1 items-center'
            >
                <TouchableOpacity
                    className ='px-5'
                    onPress={()=> navigation.goBack()}
                >
                    <Icon
                        name='angle-left' 
                        color='#fff' 
                        size= {30}
                        />
                </TouchableOpacity>
                <Text
                    className ='flex-1 text-center text-white font-bold text-sm -translate-x-3 '
                >{items.title ? formatTitle(items.title,50) : ''}</Text>
            </View>
        </Animated.View>
        <ScrollView
            scrollEventThrottle = {16}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{
                paddingBottom:70
            }}
            onScroll = {handleScroll}
            ref={ref => {
                setRef(ref)
            }}
        >
            {/* Ảnh nển  */}
            <View
                className = 'w-full'
                style = {{
                    height : width/2
                }}
            >
                <Image
                    source={{
                        uri : urlFor(items.image).url()
                    }}
                    className ='w-full h-full'
                />
                <TouchableOpacity
                    className = 'absolute left-5 top-1/3'
                    onPress={()=> navigation.goBack()}
                >
                    <Icon
                        name = 'arrow-left'
                        color = '#fff'
                        size = {30}
                    />
                </TouchableOpacity>
                <View
                    className ='absolute bottom-2 left-5 right-5'
                >
                    <Text
                        className ='font-bold text-xl text-white'
                    >  
                       {items.title}
                    </Text>
                </View>
            </View>
            {/* Ngày đăng  */}
            <View
                className = 'flex-row w-full bg-white p-4'
            >
                <Text
                    className ='font-bold text-gray-400 mr-2'
                >
                    MyBooking 
                </Text>
                <Text>{
                    formatDate(items._updatedAt)
                }</Text>
            </View>
            {/* Mục lục */}
            <View
                className ='mx-4 bg-white mt-3 p-3 rounded-lg'
            >
                <View
                    className ='flex-row justify-between border-b border-black pb-2'
                >
                    <View
                    >
                        <Text
                            className ='font-bold'
                        >
                            Mục lục bài viết
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={()=> {setVisible(prev => !prev)}}
                        className = 'px-5'
                    >
                        {visible 
                        ? <Icon
                            name = 'angle-down'
                            color='#000'
                            size = {20}
                        />: 
                        <Icon
                            name = 'angle-left'
                            color='#000'
                            size = {20} 
                        />
                    }
                    </TouchableOpacity>
                </View>
                <Animated.ScrollView
                    showsVerticalScrollIndicator = {false}
                    contentContainerStyle = {{
                        paddingBottom:20
                    }}
                    style = {{
                        height : fadeAnim
                    }}
                    className = 'h-fit'
                >
                    {items?.content?.map((item,index) => (
                        <TouchableOpacity
                            onPress={() => scrollSmoothHandler(index)}
                            key={index}
                            className = 'mt-2'
                        >
                            <Text>{index + 1}. {item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </View>
            {/* Mô tả về bài viết */}
            <View
                className = 'mt-4 mx-3 overflow-hidden'
            >
                <SanityBlockContent
                    blocks={items.description}
                    projectId = {PROJECT_ID}
                    dataset="production"
                    imageOptions={{fit: 'max'}}
                />
            </View>
            {/* Các mục của bài viết  */}
            <View>
                {items?.content?.map((item,index)=> (
                    <View
                        key={index}
                        className = 'mx-3 overflow-hidden'
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            dataSource[index] = layout
                            setDataSource(dataSource)
                        }}
                    >
                        <Text
                            className ='font-bold'
                        >
                            {index + 1}. {item.title}
                        </Text>
                        <SanityBlockContent
                            blocks={item.content}
                            projectId={PROJECT_ID}
                            dataset="production"
                            imageOptions={{fit: 'max'}}
                        />
                    </View>
                ))}
            </View>
            {/* Content liên quan */}
            <View
                className ='bg-white mt-3 p-3'
            >
               <Text
                className =' font-bold text-xl text-sky-400'
               >Có thể bạn sẽ thích</Text> 
               {
                moreContents?.map(item => (
                    <TouchableOpacity
                        key = {item._id} 
                        className = 'flex-row justify-between gap-5 mt-5 border-t border-gray-300'
                        onPress={()=>{handleMoreContent(item._id)}}
                        >
                        <View
                            className ='flex-1'
                        >
                            <Text className = 'font-bold text-sm'>{item.title}</Text>
                            <Text className = 'font-bold text-gray-400 mt-2'> {item.createAt ? 'MyBooking: ' + formatDate(items.createAt): ''}</Text>
                        </View>
                        <Image
                            source={{
                                uri:urlFor(item.image).url()
                            }}
                            className = 'w-32 h-32 rounded-lg'
                        />
                    </TouchableOpacity>
                ))
               }
            </View>
        </ScrollView>
    </>
  )
}

export default memo(ContentDetail)