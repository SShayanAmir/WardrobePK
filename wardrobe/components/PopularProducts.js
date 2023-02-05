import { View, Text, ScrollView, Pressable, Image, FlatList, SafeAreaView, Modal, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { Table, TableWrapper, Row, Rows} from 'react-native-table-component';

// Context
import CategoryContext from '../context/CategoryContext';
import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';

// React Native Vector Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Image Pinchable Library
import Pinchable from 'react-native-pinchable';

// REACT NATIVE AUTH0
import {useAuth0} from 'react-native-auth0';

// REACT NATIVE REANIMATED
import Animated, { BounceIn, BounceOut, FlipInXUp, FlipOutXUp, SlideInDown, SlideInLeft, SlideInRight, SlideInUp, SlideOutRight, useAnimatedStyle, withRepeat, withTiming} from 'react-native-reanimated';
import ScrollToTopContext from '../context/ScrollToTop';

const PopularProducts = () => {
  const {authorize, user} = useAuth0();

  const { addToCart, cart } = useContext(CartContext)
  const { addToFavorites } = useContext(FavoritesContext)
  const { brand, category } = useContext(CategoryContext)
  const { scrollToTop, setScrollToTop } = useContext(ScrollToTopContext)

  const [size, setSize] = useState(null)
  const [largeActiveStatus, setLargeActiveStatus] = useState(false)
  const [smallActiveStatus, setSmallActiveStatus] = useState(false)
  const [mediumActiveStatus, setMediumActiveStatus] = useState(false)
  const [xLargeActiveStatus, setXLargeActiveStatus] = useState(false)

  const [sizeAlert, setSizeAlert] = useState(false)
  
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false)
  
  const [addedToCart, setAddedToCart] = useState(false)
  
  const [sizeChartModal, setSizeChartModal] = useState(false)

  const [modal, setModal] = useState(false)
  const [value, setValue] = useState({})
  
  const [imageViewerNoti, setImageViewerNoti] = useState(false) 

  const [image1, setImage1] = useState(true)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)

  const numColumns = 2

  const [tableHead, setTableHead] = useState([
    'Size',
    "Chest",
    "Shoulder",
    "Waist",
    "Hip"
  ])

  const [tableTitle, setTableTitle] = useState([
    ["S", "19.5", "14", "19", "20.5"],
    ["M", "20.5", "14.5", "20", "22"],
    ["L", "22.5", "15", "22", "24.5"],
    ["XL", "24.5", "16", "24", "26.5"]
  ])

  const [imageViewerModal , setImageViewerModal] = useState(false)

  const toggleImage1 = () => {
      setImage1(true)
      setImage2(false)
      setImage3(false)
  }
  const toggleImage2 = () => {
      setImage1(false)
      setImage2(true)
      setImage3(false)
  }
  const toggleImage3 = () => {
      setImage1(false)
      setImage2(false)
      setImage3(true)
  }

  // Size Chart Logic
  const setSizeToLarge = () => {
    setSize("L")
    setLargeActiveStatus(true)
    setSmallActiveStatus(false)
    setMediumActiveStatus(false)
    setXLargeActiveStatus(false)
  }

  const setSizeToMedium = () => {
    setSize("M")
    setLargeActiveStatus(false)
    setSmallActiveStatus(false)
    setMediumActiveStatus(true)
    setXLargeActiveStatus(false)
  }

  const setSizeToSmall = () => {
    setSize("S")
    setLargeActiveStatus(false)
    setSmallActiveStatus(true)
    setMediumActiveStatus(false)
    setXLargeActiveStatus(false)
  }
  
  const setSizeToXLarge = () => {
    setSize("XL")
    setLargeActiveStatus(false)
    setSmallActiveStatus(false)
    setMediumActiveStatus(false)
    setXLargeActiveStatus(true)
  }

  const ProductModalClose = () => {
    setModal(false)
    setSize(null)
    setLargeActiveStatus(false)
    setSmallActiveStatus(false)
    setMediumActiveStatus(false)
    setXLargeActiveStatus(false)
  }


    const [products, setProducts] = useState([])

    const [loadMore, setLoadMore] = useState(true)

    const [height, setHeight] = useState(1080)
    const [height2, setHeight2] = useState(1050)

    const LoadMoreHandler = () => {
        if(height < 3487.5){
            if(height === 2685){
              setScrollToTop(true)
            }
            setHeight(height + 802.5)
            setHeight2(height2 + 810)
        } else {
            setLoadMore(false)
        }
    }

    const getProducts = async () => {
        const response = await fetch(`${process.env.SERVER_URL}/product`);
        const JsonData = await response.json(); 
  
        setProducts(JsonData);
    }

    useEffect(() => {
        getProducts()
    }, [])

    const openModal = (product_id, title, brand, description, price, image1, image2, image3, category, quantity) => {
        setValue({product_id: product_id, title: title, brand: brand, description: description, price: price, image1: image1, image2: image2, image3: image3, category: category, quantity: quantity})
        setModal(true)
        setImageViewerNoti(true)
        setTimeout(() => {
          setImageViewerNoti(false)
        }, 3500);
      }
  
      const FavoritesHandler = (product_id, title, image1, image2, image3, price, category, brand, description, quantity) => {
        addToFavorites(product_id, title, image1, image2, image3, price, category, brand, description, quantity)
        setIsAdded(true)
        setTimeout(() => {
          setIsAdded(false) 
        }, 2500)
      }
  
      const shoppingCartHandler = async (product_id, title, image1, price, quantity, brand) => {
        if (user) {
          if (size === null) {
            setSizeAlert(true)
            setTimeout(() => {
              setSizeAlert(false)
            }, 3000)
          } else {
            addToCart(product_id, title, image1, price, quantity, brand, size)
            setAddedToCart(true)
            setTimeout(() => {
              setAddedToCart(false)
            }, 2500)
          }
        } else {
          await authorize()
        }
      }

      const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { 
                translateY: withRepeat(withTiming(-15), -1, true)
            },
        ]
      }))

  return (
    <View>
        <View className='absolute bg-gray-700 mt-10 inset-x-0  rounded-t-3xl items-center mb-40' style={{elevation: 75, height: height2}}>
            <Text className='text-white font-semibold text-xl mt-5'>What You Might Like</Text>
        </View>
        <SafeAreaView>
            <FlatList initialNumToRender={4} style={{height: height}} className={scrollToTop ?  `mx-1 mt-24` :  `mx-1 mt-24`} numColumns={2} keyExtractor={item => {return item.product_id}} data={products} renderItem={(product) => {
                    return(
                        <View className='ml-1.5'>
                            <Pressable className='bg-white active:bg-slate-200 w-[180px] h-[260px] rounded-xl py-6 mt-2 items-center' onPress={() => openModal(product.item.product_id, product.item.title, product.item.brand, product.item.description, product.item.price, product.item.image1, product.item.image2, product.item.image3, product.item.category, product.item.quantity)}>
                                <Image className="w-[140px] h-[140px] rounded-lg" source={{uri: product.item.image1}} />
                                <View className='mt-1'>
                                    <Text numberOfLines={1} className='text-gray-600 font-medium text-lg w-[140px]'>{product.item.title}</Text>
                                    <Text className='text-red-600 font-semibold'>Rs. {product.item.price}</Text>
                                </View>
                                <View className='absolute items-end justify-end right-3 bottom-2'>
                                    <Text className='text-gray-400 font-semibold text-[11px]'>{product.item.category}</Text>
                                    <Text className='text-gray-500 font-semibold text-[13px]'>{product.item.brand}</Text>
                                </View>
                            </Pressable>
                        </View>
                    )
                }}/>
        </SafeAreaView>

        <Animated.View className='w-screen pb-[75px] -top-10'>
            {height !== 3487.5 && loadMore && 
            <Pressable className='inset-x-0 rounded-t-3xl bottom-1 items-center py-2 bg-gray-500 opacity-90' onPress={() => LoadMoreHandler()}>
                <Animated.View>
                    <Entypo name='chevron-down' style={{color: "white", fontSize: 35}} />
                </Animated.View>
            </Pressable>}
        </Animated.View>

                                                   {/* Modal For Product */}
        <Modal onRequestClose={() => ProductModalClose()} transparent={true} animationType="slide" visible={modal}>
          <View className='bg-white w-full h-screen border-t-2 border-gray'>
                                        
                                        {/* Noti for (Image Can be Viewed by pressing on it) */}
          {imageViewerNoti && <Animated.View entering={BounceIn.delay(600).duration(200)} exiting={FlipOutXUp.duration(200)} className='absolute mt-10 ml-10'>
            <View className='bg-black rounded-xl'>
              <Text className='text-white p-2'>Image Can Be Viewed By Pressing On It!</Text>
            </View>
            <View className='absolute mt-5'>
              <Entypo name='triangle-down' style={{color: "black", fontSize: 35}}/>
            </View>
          </Animated.View>}
                                        
                                                  {/* Noti for Added to Favorites */}
            {isAdded && <Animated.View entering={FlipInXUp.delay(200).duration(200)} exiting={FlipOutXUp.duration(200)} className='absolute flex-row right-14 mt-6'>
              <View className='bg-black rounded-xl py-2 px-4'>
                <Text className='text-white font-semibold'>Added To Favorites!</Text>
              </View>
              <View className='absolute'>
                <Entypo name='triangle-right' style={{color: "black", fontSize: 35, marginLeft: 145}}/>
              </View>
            </Animated.View>}

                                                  {/* Noti for Added to Cart */}
            {addedToCart &&
            <Animated.View entering={SlideInRight} exiting={SlideOutRight} className='absolute flex-row right-4 top-[60px]'>
              <View className='mr-[165px]'>
                <View className='absolute bg-black rounded-xl px-3 py-2'>
                  <Text className='text-white font-semibold'>Added To Your Cart!</Text>  
                </View>
                <View className='absolute'>
                  <Entypo name='triangle-right' style={{color: "black", fontSize: 40, marginLeft: 135, bottom: 2}}/>
                </View>
              </View>
              <View>
                <MaterialIcons name='shopping-cart' style={{color: "black", fontSize: 30}}/>
                <View className='absolute bg-red-600 rounded-full -top-1.5 right-0'>
                  <Text className='text-white font-semibold px-1.5'>{cart.length}</Text>
                </View>
              </View>
            </Animated.View>}

            <Animated.View entering={SlideInUp.delay(500).duration(600)} className='flex-row justify-between mt-3'>
              <Pressable className='items-center active:bg-gray-100 rounded-full mt-2 ml-3' onPress={() => ProductModalClose()}>
                <Entypo name='chevron-left' style={{color: "black", fontSize: 35, padding: 2}}/>
              </Pressable>
              <Pressable className='justify-center items-center active:bg-gray-200 rounded-full mt-2 mr-3 px-0.5' onPress={() => FavoritesHandler(value.product_id, value.title, value.image1, value.image2, value.image3, value.price, value.category, value.brand, value.description, value.quantity)} >
                <MaterialIcons name='favorite' style={{color: "red", fontSize: 30, padding: 2}}/>
              </Pressable>
            </Animated.View>
            
            <View className='border-b-2 border-gray-300 ml-2 mr-4'>
                <View className='flex-row'>
                                                                  {/* Image 1 */}
                  {image1 && <Pressable className='ml-5 mt-10' onPress={() => setImageViewerModal(true)}>
                      <Animated.Image entering={SlideInLeft.delay(300).duration(500)} className='w-[150px] h-[150px] rounded-lg' source={{uri: value.image1}} />
                  </Pressable>}
                                                                  {/* Image 2 */}
                  {image2 && <Pressable className='ml-5 mt-10' onPress={() => setImageViewerModal(true)}>
                      <Image className='w-[150px] h-[150px] rounded-lg' source={{uri: value.image2}} />
                  </Pressable>}  
                                                                  {/* Image 3 */}
                  {image3 && <Pressable className='ml-5 mt-10' onPress={() => setImageViewerModal(true)}>
                      <Image className='w-[150px] h-[150px] rounded-lg' source={{uri: value.image3}} />
                  </Pressable>}

                  <Animated.View className='mt-10 ml-6'>
                      <Animated.Text numberOfLines={2} entering={SlideInRight.delay(500).duration(500)} className='text-black font-bold text-lg w-[170px]'>{value.title}</Animated.Text>
                      <Animated.Text entering={SlideInRight.delay(500).duration(500)} className='text-red-500 font-bold text-[15px]'>Rs. {value.price}</Animated.Text>
                      <Animated.View entering={SlideInRight.delay(700).duration(500)} className='items-end justify-end mr-6 mt-10'>
                      <Text className='text-gray-500 text-[11px]'>{value.category}</Text>
                      <Text className='text-gray-500 font-medium text-[13px]'>{value.brand}</Text>
                      </Animated.View>
                  </Animated.View>
                </View>
                                                              {/* Image Selector */}
                <Animated.View entering={SlideInLeft.delay(300).duration(500)} className='flex-row mt-4 ml-8 pb-4'>
                  <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-400' onPress={() => toggleImage1()}>
                      <Text className='text-black font-bold text-lg px-2'>1</Text>
                  </Pressable>
                  <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-400' onPress={() => toggleImage2()}>
                      <Text className='text-black font-bold text-lg px-2'>2</Text>
                  </Pressable>
                  <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-400' onPress={() => toggleImage3()}>
                      <Text className='text-black font-bold text-lg px-2'>3</Text>
                  </Pressable>
                </Animated.View>
            </View>
                                                            {/* Size Chart Button */}
            <Animated.View entering={SlideInLeft.delay(500).duration(500)}>
              <Pressable className='mt-8 ml-6 bg-gray-700 active:bg-black w-[125px] items-center justify-center rounded-xl' onPress={() => setSizeChartModal(true)}>
                <Text className='text-white font-bold text-lg p-3'>Size Chart</Text>
              </Pressable>
            </Animated.View>

                                                                  {/* Sizes */}
            <Animated.View entering={SlideInLeft.delay(500).duration(500)} className='flex-row ml-3 mt-5'>
              <Pressable className={largeActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToLarge()}>
                <Text className={largeActiveStatus ? 'text-white font-bold px-2.5 py-1' : 'text-black font-bold px-2.5 py-1'}>L</Text>
              </Pressable>
              <Pressable className={mediumActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToMedium()}>
                <Text className={mediumActiveStatus ? 'text-white font-bold px-2.5 py-1' : 'text-black font-bold px-2.5 py-1'}>M</Text>
              </Pressable>
              <Pressable className={smallActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToSmall()}>
                <Text className={smallActiveStatus ? 'text-white font-bold px-2.5 py-1' : 'text-black font-bold px-2.5 py-1'}>S</Text>
              </Pressable>
              <Pressable className={xLargeActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToXLarge()}>
                <Text className={xLargeActiveStatus ? 'text-white font-bold px-2 py-1' : 'text-black font-bold px-2 py-1'}>XL</Text>
              </Pressable>

                                                        {/* Need to choose a SIZE NOTI ALERT */}
              {sizeAlert && <Animated.View entering={BounceIn.delay(200).duration(200)} exiting={BounceOut.duration(500)} style={{backgroundColor: "red"}} className='absolute right-1 -top-1 rounded-xl items-center justify-center'>
                <View className='absolute -left-4'>
                  <Entypo name='triangle-left' style={{color: "red", fontSize: 30}}/>
                </View>
                <Text className='text-white font-bold p-2'>You need to choose a size!</Text>
              </Animated.View>}
            </Animated.View>

            <Animated.View entering={SlideInDown.delay(500).duration(500)} className='items-center justify-center mt-52'>
              {loading ? <Pressable disabled={true} className='flex-row items-center justify-center bg-blue-700 w-[250px] h-[60px] rounded-3xl'><ActivityIndicator size='large'/></Pressable> : <Pressable className='flex-row items-center justify-center bg-blue-700 active:bg-blue-800 w-[250px] h-[60px] rounded-3xl' onPress={() => shoppingCartHandler(value.product_id, value.title, value.image1, value.price, value.quantity, value.brand)}>
                <Text className='text-white text-lg font-bold mt-0.5 ml-2'>ADD TO CART</Text>
                <FontAwesome5 name='shopping-cart' style={{color: "white", fontSize: 20, marginLeft: 10}}/>
              </Pressable>}
            </Animated.View>
          </View>
      </Modal>

                                                   {/* PINCHABLE IMAGES MODALL */}
                                                   <Modal onRequestClose={() => setImageViewerModal(false)} animationType='slide' visible={imageViewerModal} transparent={false}>
          <View className='items-center justify-center w-full h-full bg-white'>
            <Pressable className='-right-[160px] top-4 active:bg-gray-200 rounded-full' onPress={() => setImageViewerModal(false)}>
              <Entypo name='cross' style={{color: "black", fontSize: 35, padding: 2}}/>
            </Pressable>
            <ScrollView className='top-1/2' horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {<Pinchable className='mr-6 ml-4'>
                  <Image className='rounded-xl w-[350px] h-[350px]' source={{uri: value.image1}}/>
              </Pinchable>}

              {<Pinchable className='ml-3'>
                  <Image className='rounded-xl w-[350px] h-[350px]' source={{uri: value.image2}}/>
              </Pinchable>}

              {<Pinchable className='ml-8 w-[370px]'>
                  <Image className='rounded-xl w-[350px] h-[350px]' source={{uri: value.image3}}/>
              </Pinchable>}
            </ScrollView>
          </View>
      </Modal>

                                                  {/* Size Chart Modal */}
      <Modal visible={sizeChartModal} onRequestClose={() => setSizeChartModal(false)} animationType='slide' transparent={true}>
        <View className='absolute bg-white inset-x-3 inset-y-[270px] rounded-xl' style={{elevation: 15}}>
          <Pressable className='absolute z-20 active:bg-gray-200 top-2 right-1 rounded-full' onPress={() => setSizeChartModal(false)}>
            <Entypo name='cross' style={{color: "black", fontSize: 30}}/>
          </Pressable>
          <View style={styles.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: "black"}}>
              <TableWrapper>
                <Row
                data={tableHead}
                className='bg-black h-[40px]'
                textStyle={{color: "white", marginLeft: 6}}
                />
                <Rows 
                data={tableTitle}
                textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 13, paddingTop: 50},
    head: {height: 40, width: 355, backgroundColor: "#f1f8ff"},
    Head_text: {margin: 6, fontStyle: "bold", color: "black"},
    text: {margin: 6, color: "black",}
  })

export default PopularProducts