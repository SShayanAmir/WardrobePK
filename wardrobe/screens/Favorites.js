import {View, Text, Pressable, FlatList, Image, Modal, ScrollView, StyleSheet, useWindowDimensions, ActivityIndicator} from 'react-native';
import React, { useContext, useState } from 'react';

import {useAuth0} from 'react-native-auth0';

import Navbar from '../components/Navbar';

import FavoritesContext from '../context/FavoritesContext';


import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';

import Pinchable from 'react-native-pinchable';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartContext from '../context/CartContext';

import Animated, { BounceIn, BounceOut, FadeInDown, FlipOutXUp, SlideInDown, SlideInLeft, SlideInRight, SlideInUp, SlideOutLeft, SlideOutRight, ZoomInEasyDown, ZoomInEasyUp, ZoomOutEasyUp } from 'react-native-reanimated';
import { LazyLoadImage } from 'react-native-lazy-load-image';

const Favorites = ({navigation}) => {
  const {authorize, user} = useAuth0();

  const {width} = useWindowDimensions();

  const { favorite, removeFromFavorites } = useContext(FavoritesContext)
  const { addToCart, cart } = useContext(CartContext)

  const [value, setValue] = useState({})

  const [loading, setLoading] = useState(false);
  
  const [size, setSize] = useState(null) 
  const [largeActiveStatus, setLargeActiveStatus] = useState(false)
  const [smallActiveStatus, setSmallActiveStatus] = useState(false)
  const [mediumActiveStatus, setMediumActiveStatus] = useState(false)
  const [xLargeActiveStatus, setXLargeActiveStatus] = useState(false)

  const [sizeAlert, setSizeAlert] = useState(false)

  const [sizeChartModal, setSizeChartModal] = useState(false)

  const [modal, setModal] = useState(false)
  const [imageViewerModal , setImageViewerModal] = useState(false)
  
  const [image1, setImage1] = useState(true)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false) 

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

  const [imageViewerNoti, setImageViewerNoti] = useState(false) 
  const [addedToCart, setAddedToCart] = useState(false)

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

  const openModal = (product_id, title, brand, description, price, image1, image2, image3, category, quantity) => {
    setValue({product_id: product_id, title: title, brand: brand, description: description, price: price, image1: image1, image2: image2, image3: image3, category: category, quantity: quantity})
    setModal(true)
    setImageViewerNoti(true)
    setTimeout(() => {
      setImageViewerNoti(false)
    }, 2500);
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

  const removeFromFavoritesHandler = (id) => {
    removeFromFavorites(value.product_id)
    removeFromFavorites(id)
    setModal(false)
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

  const setSizeToUnstitched = () => {
    setSize("Unstitched")
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

  return (  
    <View> 
    <Navbar />
    <View className='absolute inset-x-0 mt-[120px] h-[180px] justify-center items-center bg-red-600' style={{elevation: 25}}>
      <Animated.Text entering={SlideInUp.duration(500)} className={favorite.length === 0 ? `absolute items-center justify-center text-white text-3xl font-bold` : 'absolute top-6 text-white text-3xl font-bold'}>Favorites</Animated.Text>
      <Animated.Text entering={SlideInRight.delay(500).duration(500)} className={favorite.length === 0 ? 'hidden' : 'absolute items-center justify-center text-white text-[10px] font-bold pb-10'}>(Make Sure Your Favorites Are Still Available Before Adding Them To The Cart)</Animated.Text>
    </View>
    { favorite.length == 0 ? 
      <Animated.View className='absolute flex items-center justify-center h-screen w-full'>
        <Animated.Text entering={SlideInLeft.duration(500)} className='text-gray-600 text-2xl font-black'>No Favorites Yet!</Animated.Text>
        <Animated.Text entering={SlideInRight.duration(500)} className='text-gray-600 text-2xl font-bold'>Start Adding!</Animated.Text>
      </ Animated.View>
       :
       <FlatList initialNumToRender={2} numColumns={width > 590 ? 3 : 2} className='mt-20 mb-[120px] md:ml-4' keyExtractor={item => {return item.product_id}} data={favorite} renderItem={(favorites) => {
        // 
        return(
           <Animated.View entering={ZoomInEasyDown.duration(1000)} className='ml-1.5'>
              <Pressable className='absolute z-20 -right-2 active:bg-red-400 rounded-full' onPress={() => removeFromFavoritesHandler(favorites.item.id)}>
                <MaterialIcons name='favorite' style={{color: "red", fontSize: 30, padding: 2}}/>
              </Pressable>
              <Pressable style={{elevation: 5}} className='z-10 bg-white active:bg-slate-200 rounded-xl w-[180px] h-[260px] py-6 mt-4 items-center' onPress={() => openModal(favorites.item.id, favorites.item.title, favorites.item.brand, favorites.item.description, favorites.item.price, favorites.item.image1, favorites.item.image2, favorites.item.image3, favorites.item.category, favorites.item.quantity)}>
                  <Image className="w-[140px] h-[140px] rounded-lg" source={{uri: favorites.item.image1}} />
                  <View className='mt-1'>
                      <Text numberOfLines={1} className='text-gray-600 font-medium text-lg w-[140px]'>{favorites.item.title}</Text>
                      <Text className='text-red-600 font-semibold'>Rs. {favorites.item.price}</Text>
                  </View>
                  {favorites.item.category === "Out Of Stock" ?
                    <View className='absolute items-end justify-end right-3 bottom-2'>
                        <Text className='text-gray-400 font-semibold text-[11px]'>{favorites.item.brand}</Text>
                        <Text className={favorites.item.category === "Out Of Stock" ? 'text-red-700 font-bold text-[13px]' : 'text-gray-400 font-semibold text-[11px]'} numberOfLines={1}>{favorites.item.category}</Text>
                    </View>
                    :
                    <View className='absolute items-end justify-end right-3 bottom-2'>
                        <Text className={favorites.item.category === "Out Of Stock" ? 'text-red-700 font-bold text-[13px]' : 'text-gray-400 font-semibold text-[11px]'} numberOfLines={1}>{favorites.item.category}</Text>
                        <Text className='text-gray-500 font-semibold text-[13px]'>{favorites.item.brand}</Text>
                    </View>
                  }
              </Pressable>
      </ Animated.View>
         )
       }}/>
      }
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
              <Pressable className='items-center active:bg-gray-200 rounded-full mt-2 ml-3' onPress={() => setModal(false)}>
                <Entypo name='chevron-left' style={{color: "black", fontSize: 35, padding: 2}}/>
              </Pressable>
              <Pressable className='items-center active:bg-gray-200 rounded-full mt-2 mr-3 px-0.5' onPress={() => removeFromFavoritesHandler(value.id)}>
                <Ionicons name='heart-dislike' style={{color: "grey", fontSize: 30, padding: 2}}/>
              </Pressable>
            </Animated.View>
            <View className='border-b-2 border-gray-300 mr-4'>
                <Animated.View className='flex-row'>
                  <Animated.View entering={SlideInLeft.delay(300).duration(500)}>
                                                                    {/* Image 1 */}
                    {image1 && <Pressable className='ml-5 mt-10' onPress={() => setImageViewerModal(true)}>
                        <LazyLoadImage className='w-[160px] h-[170px] rounded-lg' source={{uri: value.image1}} />
                    </Pressable>}
                                                                    {/* Image 2 */}
                    {image2 && <Pressable className='ml-5 mt-10' onPress={() => setImageViewerModal(true)}>
                        <LazyLoadImage className='w-[160px] h-[170px] rounded-lg' source={{uri: value.image2}} />
                    </Pressable>}  
                                                                    {/* Image 3 */}
                    {image3 && <Pressable className='ml-5 mt-10' onPress={() => setImageViewerModal(true)}>
                        <LazyLoadImage className='w-[160px] h-[170px] rounded-lg' source={{uri: value.image3}} />
                    </Pressable>}
                  </Animated.View>

                  {value.category === "Out Of Stock" ?
                    <Animated.View className='mt-10 ml-6'>
                        <Animated.Text numberOfLines={2} entering={SlideInRight.delay(500).duration(500)} className='text-black font-bold text-lg w-[170px]'>{value.title}</Animated.Text>
                        <Animated.Text entering={SlideInRight.delay(500).duration(500)} className='text-red-500 font-bold text-[15px]'>Rs. {value.price}</Animated.Text>
                        <Animated.View entering={SlideInRight.delay(700).duration(500)} className='items-end justify-end mr-6 mt-10'>
                        <Text className='text-gray-500 text-[12px] mt-4'>{value.brand}</Text>
                        <Text className={value.category === "Out Of Stock" ? 'text-red-700 font-bold text-[13px]' : 'text-gray-500 text-[11px]'}>{value.category}</Text>
                        </Animated.View>
                    </Animated.View> 
                    :
                    <Animated.View className='mt-10 ml-6'>
                        <Animated.Text numberOfLines={2} entering={SlideInRight.delay(500).duration(500)} className='text-black font-bold text-lg w-[170px]'>{value.title}</Animated.Text>
                        <Animated.Text entering={SlideInRight.delay(500).duration(500)} className='text-red-500 font-bold text-[15px]'>Rs. {value.price}</Animated.Text>
                        <Animated.View entering={SlideInRight.delay(700).duration(500)} className='items-end justify-end mr-6 mt-10'>
                        <Text className={value.category === "Out Of Stock" ? 'text-red-700 font-bold text-[11px] mt-4' : 'text-gray-500 text-[11px] mt-4'}>{value.category}</Text>
                        <Text className='text-gray-500 font-medium text-[13px]'>{value.brand}</Text>
                        </Animated.View>
                    </Animated.View> 
                    }
                </Animated.View>
           
                <Animated.View entering={SlideInLeft.delay(300).duration(500)} className='flex-row mt-4 ml-8 pb-4'>
                  <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-400' onPress={() => toggleImage1()}>
                      <Text className='text-black font-semibold text-[17px] px-2'>1</Text>
                  </Pressable>
                  <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-400' onPress={() => toggleImage2()}>
                      <Text className='text-black font-semibold text-[17px] px-2'>2</Text>
                  </Pressable>
                  <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-400' onPress={() => toggleImage3()}>
                      <Text className='text-black font-semibold text-[17px] px-2'>3</Text>
                  </Pressable>
                </Animated.View>
            </View>

            {value.category === "Stitched" && <Animated.View entering={SlideInLeft.delay(500).duration(500)}>
              <Pressable className='mt-6 ml-6 bg-gray-700 active:bg-black w-[125px] items-center justify-center rounded-xl' onPress={() => setSizeChartModal(true)}>
                <Text className='text-white font-bold text-lg p-3'>Size Chart</Text>
              </Pressable>
            </Animated.View>}

            <Animated.View entering={SlideInLeft.delay(500).duration(500)} className='flex-row ml-3 mt-5'>
              {value.category === "Stitched" ? <View className="flex-row">
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
              </View>:
              <View>
                <Pressable className={xLargeActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToUnstitched()}>
                  <Text className={xLargeActiveStatus ? 'text-white font-bold px-2 py-1' : 'text-black font-bold px-2 py-1'}>Unstitched</Text>
                </Pressable>
              </View>}

              {sizeAlert && <Animated.View entering={BounceIn.delay(200).duration(200)} exiting={BounceOut.duration(500)} style={{backgroundColor: "red"}} className='absolute right-0 rounded-xl items-center justify-center'>
                <View className='absolute -left-4'>
                  <Entypo name='triangle-left' style={{color: "red", fontSize: 30}}/>
                </View>
                <Text className='text-white font-bold p-2'>You need to choose a size</Text>
              </Animated.View>}
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(600).duration(500)}>
              <Text className='ml-7 mt-2 text-gray-600 font-bold text-xl'>Description</Text>
              <ScrollView className='ml-7 mr-3 mt-1 h-[220px]'>
                <Text className='text-gray-400 font-medium ml-2'>{value.description}</Text>
              </ScrollView>
            </Animated.View>

            {value.category !== "Out Of Stock" ? 
              <Animated.View entering={SlideInDown.delay(500).duration(500)} className={value.category === "Stitched" ? 'items-center justify-center mt-5' : 'items-center justify-center mt-16'}>
                {loading ?
                <Pressable style={{elevation: 25}} disabled={true} className='flex-row items-center justify-center bg-blue-700 w-[250px] h-[60px] rounded-3xl'><ActivityIndicator size='large'/></Pressable> 
                :
                <Pressable style={{elevation: 25}} className='flex-row items-center justify-center bg-blue-700 active:bg-blue-800 w-[250px] h-[60px] rounded-3xl' onPress={() => shoppingCartHandler(value.product_id, value.title, value.image1, value.price, value.quantity, value.brand)}>
                  <Text className='text-white text-lg font-bold mt-0.5 ml-2'>ADD TO CART</Text>
                  <FontAwesome5 name='shopping-cart' style={{color: "white", fontSize: 20, marginLeft: 10}}/>
                </Pressable>}
              </Animated.View>
              :
              <Animated.View entering={SlideInDown.delay(500).duration(500)} className={value.category === "Stitched" ? 'items-center justify-center mt-5' : 'items-center justify-center mt-16'}>
                {loading ?
                <Pressable style={{elevation: 25}} disabled={true} className='flex-row items-center justify-center bg-red-700 w-[250px] h-[60px] rounded-3xl'><ActivityIndicator size='large'/></Pressable> 
                :
                <Pressable style={{elevation: 25}} className='flex-row items-center justify-center bg-red-700 w-[250px] h-[60px] rounded-3xl'>
                  <Text className='text-white text-lg font-bold mt-0.5 ml-2'>OUT OF STOCK</Text>
                  <FontAwesome5 name='shopping-cart' style={{color: "white", fontSize: 20, marginLeft: 10}}/>
                </Pressable>}
              </Animated.View>
            }
          </View>
      </Modal>

                                                          {/* PINCHABLE IMAGES MODALL */}
        <Modal onRequestClose={() => setImageViewerModal(false)} animationType='slide' visible={imageViewerModal} transparent={false}>
          <View className='items-center justify-center w-full h-full bg-white'>
            <Pressable className='-right-[160px] md:-right-[250px] top-4 active:bg-gray-200 rounded-full' onPress={() => setImageViewerModal(false)}>
              <Entypo name='cross' style={{color: "black", fontSize: 35, padding: 2}}/>
            </Pressable>
            <ScrollView className='top-1/2 md:top-[150px]' horizontal pagingEnabled showsHorizontalScrollIndicator={true}>
              {<Pinchable className='mr-6 ml-4 md:ml-[85px]'>
                  <LazyLoadImage  className='rounded-xl w-[350px] md:w-[450px] h-[440px] md:h-[560px]' source={{uri: value.image1}}/>
              </Pinchable>}

              {<Pinchable className='ml-3 md:ml-[120px]'>
                  <LazyLoadImage  className='rounded-xl w-[350px] md:w-[450px] h-[440px] md:h-[560px]' source={{uri: value.image2}}/>
              </Pinchable>}

              {<Pinchable className='ml-8 md:ml-[110px] mr-[80px]'>
                  <LazyLoadImage  className='rounded-xl w-[350px] md:w-[450px] h-[440px] md:h-[560px]' source={{uri: value.image3}}/>
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
                // style={styles.head}
                // textStyle={styles.Head_text}
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
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 13, paddingTop: 50},
  head: {height: 40, width: 355, backgroundColor: "#f1f8ff"},
  Head_text: {margin: 6, fontStyle: "bold", color: "black"},
  text: {margin: 6, color: "black",}
})


export default Favorites;
