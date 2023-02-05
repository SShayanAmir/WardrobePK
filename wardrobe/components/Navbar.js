import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Pressable, Modal, TextInput, FlatList, Image, StyleSheet, ScrollView} from 'react-native';
import { Avatar} from "react-native-paper";
import { Table, TableWrapper, Row, Rows} from 'react-native-table-component';

// REACT NATIVE AUTH0
import {useAuth0} from 'react-native-auth0';

// Navigation
import { useNavigation } from '@react-navigation/native';

// React Native Vector Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Image Pinchable Library
import Pinchable from 'react-native-pinchable';

// Context API
import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';

// React Native Reanimated
import Animated, { SlideInLeft, SlideInRight, SlideInUp, SlideOutRight, BounceIn, BounceOut, FlipInXUp, FlipOutXUp, FadeIn, SlideInDown } from 'react-native-reanimated';

// REACT NATIVE OPEN ANYTHING
import {Call} from 'react-native-openanything';

const Navbar = () => {
  const {authorize, user, clearSession, getCredentials} = useAuth0();
  
  const navigation = useNavigation()

  const { addToCart, cart } = useContext(CartContext)
  const { favorite } = useContext(FavoritesContext)
  const { addToFavorites } = useContext(FavoritesContext)

  
  const [searchValue, setSearchValue] = useState("")

  const [menuToggle, setMenuToggle] = useState(false);
  const [searchModal, setSearchModal] = useState(false)

  const [filteredData, setFilteredData] = useState();
  const [products, setProducts] = useState();

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
  
  // Check For Admin Role
  const userRoles = user && user[`${process.env.ROLE_ACCESS_API}`];
  const userHasAccess = userRoles?.some(function (role) {
      return "admin" === role;
    })

    // Login Function
  const login = async () => {
    try {
      await authorize({scope: "create:brand delete:brand edit:brand create:product delete:product edit:OrderStatus" ,audience: process.env.AUDIENCE});
    } catch (e) {
      console.log(e)
    }
  }
  
  // Logout Function
  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e)
    }
  }

  // Navigate To Home Screen
  const navigateToHome = () => {
    setMenuToggle(false)
    setTimeout(() => {
      navigation.navigate("Home")
    }, 200)
  }

  // Navigate To Dashboard Screen
  const navigateToDashboard = () => {
    setMenuToggle(false)
    setTimeout(() => {
      navigation.navigate("Dashboard")
    }, 200)
  }
  
  // Navigate To Shopping Cart Screen 
  const navigateToCart = async () => {
    if (user) {
      setMenuToggle(false)
      setTimeout(() => {
        navigation.navigate("ShoppingCart")
      }, 200)
    } else {
      await authorize()
    }
  }
  
  // Navigate To Favorites Screen
  const navigateToFavorites = () => {
    setMenuToggle(false)
    setTimeout(() => {
      navigation.navigate("Favorites")
    }, 200)
  }

  // Navigate To Track My Order Screen
  const navigateToTrackMyOrder = () => {
    setMenuToggle(false)
    setTimeout(() => {
      navigation.navigate("TrackMyOrder")
    }, 200)
  }

  // Navigate To Policies Screen
  const navigateToPolicies = () => {
    setMenuToggle(false)
    setTimeout(() => {
      navigation.navigate("Policies")
    }, 200)
  }
  
  const getAllProducts = async () => {
    try {
    const response = await fetch(`${process.env.SERVER_URL}/product`);
    const JsonData = await response.json();

    setProducts(JsonData);
    } catch (err) {
    console.error(err.message);
    }
};

  useEffect(() => {
    async function tempFunction(){
      await getAllProducts();
    }
    tempFunction();
    return () => {};
  }, []);

  const searchFilterFunction = (text) => {
    setSearchValue(text)
    if(text){
      const newData = products.filter(item => {
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      }) 
      setFilteredData(newData)
    } else {
      setFilteredData([])
    }
  }

  const clearTextInput = () => {
    setSearchValue("")
    setFilteredData([])
  }

  const goBackFromSearchModal = () => {
    setSearchModal(false)
    setSearchValue("")
    setFilteredData([])
  }

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

  return (
    <SafeAreaView className="bg-slate-900 h-[120px] z-10" style={{elevation: 98}}>
      <View className="flex flex-row justify-between">
        <Pressable className='' onPress={() => navigateToHome()}>
            <Animated.Text entering={SlideInLeft.duration(500)} className="text-2xl font-extrabold text-white mt-6 ml-4">
              Wardrobe
            </Animated.Text>
        </Pressable>
        <View className='flex-row'>
          <Pressable
            onPress={() => navigateToCart()}
            className="mr-8 mt-[30px]">
              <Animated.View entering={SlideInRight.duration(500)}>
                <MaterialIcons name='shopping-cart' style={{color: "white", fontSize: 25}}/>
                <View className='-right-2.5 -top-8'>
                  <Text className='absolute text-white font-semibold bg-red-500 rounded-full px-1.5'>{user ? cart?.length : 0}</Text>
                </View>
              </Animated.View>
          </Pressable>
          <Pressable
            className="mr-7 mt-[30px]"
            onPress={() => setMenuToggle(true)}>
              <Animated.View entering={SlideInRight.duration(500)}>
                <FontAwesome name="bars" style={{color: 'white', fontSize: 25}} />
              </Animated.View>
          </Pressable>
        </View>
      </View>

                                                          {/* Search bar */}
        <Animated.View entering={SlideInUp.duration(500)}>
          <Pressable onPress={() => setSearchModal(!searchModal)} className='absolute bg-white rounded-3xl h-[40px] inset-x-3 mt-2 z-10'>
            <Text className='font-medium text-gray-600 px-4 mt-2'>Search here...</Text>
          </Pressable>
        </Animated.View>       
                                          {/*    ****Side Menu****     */}
        {menuToggle && <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutRight.duration(300)} className="absolute z-20 right-0 h-screen w-[260px] bg-white rounded-l-2xl" style={{elevation: 30}}>
                                        
                                        {/*Avatar Image and Cross Icon*/}
          <View className='mt-6 flex-row justify-between'>
            {user && <Avatar.Image style={{elevation: 15}} source={{ uri: user.picture}} size={50} className='ml-4'/>}
            <Pressable
              className={user ?  "active:bg-gray-200 mr-3 mt-2 px-1 rounded-full items-center justify-center" : "ml-[215px]"}
              onPress={() => setMenuToggle(false)}>
              <Entypo name="cross" style={{color: 'black', fontSize: 35}} />
            </Pressable>
          </View>
                                      {/*Dashboard Button for Admin Only*/}
          {userHasAccess && <Pressable className='mt-10 ml-3 mr-4 border-b border-stone-300 active:bg-gray-100 rounded-lg' onPress={() => navigateToDashboard()}>
            <View className='flex-row justify-between'>
              <Text className='text-black text-lg font-semibold pb-1 pl-2'>Dashboard</Text>
              <MaterialCommunityIcons name='view-dashboard' style={{color: "black", fontSize: 25}}/>
            </View>
          </Pressable>}
                                            {/*Shopping Cart Button*/}
          <Pressable className={user ? 'mt-5 ml-3 mr-4 border-b border-stone-300 active:bg-gray-100 rounded-lg pt-1' : 'mt-10 ml-3 mr-4 border-b border-stone-300 shadow-2xl transition-all active:bg-gray-100 rounded-lg pt-1'} onPress={() => navigateToCart()}>
            <View className='flex-row justify-between'>
              <View className=''>
                <Text className='text-black text-lg font-semibold pb-1 pl-2'>Shopping Cart</Text>
              </View>
              <View className='flex-row'>
                <MaterialIcons name='shopping-cart' style={{color: "black", fontSize: 25}}/>
                <View className='absolute -right-1 -top-1.5 items-center justify-center'>
                  <Text className={cart.length !== 0 ? 'text-white font-semibold bg-red-500 rounded-full px-1.5' : "hidden"}>{cart.length}</Text>
                </View>
              </View>
            </View>
          </Pressable>
                                              {/*Favorite Button*/}
          <Pressable className='mt-5 ml-3 mr-4 border-b border-stone-300 active:bg-gray-100 rounded-lg pt-1' onPress={() => navigateToFavorites()}>
            <View className='flex-row justify-between'>
              <View className=''>
                <Text className='text-black text-lg font-semibold pb-1 pl-2'>Favorites</Text>
              </View>
              <View className='flex-row'>
                <MaterialIcons name='favorite' style={{color: "black", fontSize: 25}}/>
                <View className='absolute -right-1.5 -top-1.5 items-center justify-center'>
                  <Text className={favorite.length !== 0 ? 'text-white font-semibold bg-red-500 rounded-full px-1.5' : "hidden"}>{favorite.length}</Text>
                </View>
              </View>
            </View>
          </Pressable>
                                           {/*Track My Orders Button*/}
          <Pressable className='mt-5 ml-3 mr-4 border-b border-stone-300 active:bg-gray-100 rounded-lg' onPress={() => navigateToTrackMyOrder()}>
            <View className='flex-row justify-between'>
              <Text className='text-black text-lg font-semibold pb-1 pl-2'>Track my order</Text>
              <View className='flex-row'>
                <Feather name='package' style={{color: "gray", fontSize: 25}}/>
                <Entypo name='location-pin' style={{color: "black", fontSize: 25, position: 'absolute', marginLeft: 8}}/>
              </View>
            </View>
          </Pressable>
                                                {/*Policies Button*/}
          <Pressable className='mt-5 ml-3 mr-4 border-b border-stone-300 active:bg-gray-100 rounded-lg' onPress={() => navigateToPolicies()}>  
            <View className='flex-row justify-between'>
              <Text className='text-black text-lg font-semibold pb-1 pl-2'>Policies</Text>
              <Foundation name='info' style={{color: "black", fontSize: 25, marginRight: 4, marginTop: 1}}/>
            </View>
          </Pressable>
                                                {/*Contact Us Button*/}
          <Pressable className='mt-5 ml-3 mr-4 border-b border-stone-300 active:bg-gray-100 rounded-lg' onPress={() => Call("03158000900", prompt = true)}>
            <View className='flex-row justify-between'>
              <Text className='text-black text-lg font-semibold pb-1 pl-2'>Contact us</Text>
              <MaterialIcons name='contact-support' style={{color: "black", fontSize: 25, marginTop: 2}}/>
            </View>
          </Pressable>
                                                {/*Logout Button*/}
          {user && <View className='absolute bottom-[90px] ml-4'>
            <Pressable style={{elevation: 10}} className='bg-red-500 active:bg-red-600 absolute rounded-lg w-[230px] flex-row items-center justify-center' onPress={() => logout()}>
              <Text className='text-white text-lg font-bold py-3'>Log out</Text>
              <Entypo name='log-out' style={{color: "white", fontSize: 25, position: "absolute", right: 16}}/>
            </Pressable>
          </View>}
                                                {/*Login Button*/}
          {!user && <View className='absolute bottom-[90px] ml-4'>
            <Pressable style={{elevation: 10}} className='bg-gray-700 active:bg-black absolute rounded-lg w-[230px] flex-row items-center justify-center' onPress={() => login()}>
              <Text className='text-white text-lg font-bold py-3'>Log in</Text>
              <Entypo name='login' style={{color: "white", fontSize: 25, position: "absolute", right: 16}}/>
            </Pressable>
          </View>}
        </Animated.View>}                                  
 

                                              {/***Modal for Search Bar***/}
      <Modal onRequestClose={() => goBackFromSearchModal()} visible={searchModal} animationType='slide' transparent={true}>
        <View className='absolute bg-gray-200 inset-x-0 h-screen'>
          <View className='flex-row bg-slate-800 h-[80px] items-center'>
            
            <Animated.View entering={SlideInLeft.delay(200)}>
              <Pressable className='active:bg-gray-700 w-[40px] rounded-full ml-1' onPress={() => goBackFromSearchModal()}>
                <Entypo name='chevron-left' style={{color: "white", fontSize: 40}}/>
              </Pressable>
            </Animated.View>

            <Animated.View entering={SlideInUp.delay(500)} className='absolute ml-8 inset-x-3 bg-white h-[40px] rounded-3xl'>
              <TextInput onChangeText={(e) => searchFilterFunction(e)} defaultValue={searchValue} autoFocus={true} placeholder='Search here...' placeholderTextColor={"gray"} className='px-4 text-black'/>
              <Pressable onPress={() => clearTextInput()} className='absolute right-2 top-1 bg-white active:bg-gray-200 rounded-full'>
                <Entypo name='cross' style={{color: "black", fontSize: 30}}/>
              </Pressable>
            </Animated.View>
         
          </View>
          <View className='h-screen'>
            <FlatList initialNumToRender={6} className='h-screen mb-[85px]' keyboardDismissMode='on-drag' numColumns={2} data={filteredData} keyExtractor={item => {return item.product_id}} renderItem={(product) => {
              return(
                <Animated.View entering={FadeIn.duration(500)}>
                  <Pressable className='bg-white active:bg-slate-100 w-[180px] h-[265px] rounded-xl py-6 mt-3 ml-2 items-center' onPress={() => openModal(product.item.product_id, product.item.title, product.item.brand, product.item.description, product.item.price, product.item.image1, product.item.image2, product.item.image3, product.item.category, product.item.quantity)}>
                      <Image className="w-[140px] h-[140px] rounded-lg" source={{uri: product.item.image1}} />
                      <View className='mt-1'>
                          <Text numberOfLines={1} className='text-gray-600 font-medium text-lg w-[140px]'>{product.item.title}</Text>
                          <Text className='text-red-600 font-semibold'>Rs. {product.item.price}</Text>
                      </View>
                      <View className='absolute items-end justify-end right-3 bottom-2'>
                          <Text className='text-gray-400 font-semibold text-[11px]' numberOfLines={1}>{product.item.category}</Text>
                          <Text className='text-gray-500 font-semibold text-[13px]'>{product.item.brand}</Text>
                      </View>
                  </Pressable>
                </ Animated.View>
              )
            }}/>
          </View>
        </View>
      </Modal>

                                                           {/* Modal For Product */}
      <Modal onRequestClose={() => ProductModalClose()} transparent={true} animationType="slide" visible={modal}>
          <View className='bg-white w-full h-screen border-t-2 border-gray'>
                                        {/* Noti for (Image Can be Viewed by pressing on it) */}
          {imageViewerNoti && <Animated.View entering={BounceIn.delay(300).duration(200)} exiting={FlipOutXUp.duration(200)} className='absolute mt-10 ml-10'>
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
              <Pressable className='items-center active:bg-gray-200 rounded-full mt-2 ml-3' onPress={() => ProductModalClose()}>
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

            <Animated.View entering={SlideInLeft.delay(500).duration(500)}>
              <Pressable className='mt-8 ml-6 bg-gray-700 active:bg-black w-[125px] items-center justify-center rounded-xl' onPress={() => setSizeChartModal(true)}>
                <Text className='text-white font-bold text-lg p-3'>Size Chart</Text>
              </Pressable>
            </Animated.View>

            <Animated.View entering={SlideInLeft.delay(500).duration(500)} className='flex-row ml-3 mt-5'>
              <Pressable className={largeActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToLarge()}>
                <Text className={largeActiveStatus ? 'text-white font-bold px-2.5 py-1' : 'text-black font-bold px-2.5 py-1'}>L</Text>
              </Pressable>
              <Pressable className={mediumActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToMedium()}>
                <Text className={mediumActiveStatus ? 'text-white font-bold px-2.5 py-1' : 'text-black font-bold px-2.5 py-1'}>M</Text>
              </Pressable>
              <Pressable className={smallActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToSmall()}>
                <Text className={ smallActiveStatus ? 'text-white font-bold px-2.5 py-1' : 'text-black font-bold px-2.5 py-1'}>S</Text>
              </Pressable>
              <Pressable className={xLargeActiveStatus ? 'bg-black border border-gray-300 rounded-full ml-3' : 'border border-gray-300 rounded-full ml-3'} onPress={() => setSizeToXLarge()}>
                <Text className={ xLargeActiveStatus ? 'text-white font-bold px-2 py-1' : 'text-black font-bold px-2 py-1'}>XL</Text>
              </Pressable>

              {sizeAlert && <Animated.View entering={BounceIn.delay(200).duration(200)} exiting={BounceOut.duration(500)} style={{backgroundColor: "red"}} className='absolute right-1 -top-1 rounded-xl items-center justify-center'>
                <View className='absolute -left-4'>
                  <Entypo name='triangle-left' style={{color: "red", fontSize: 30}}/>
                </View>
                <Text className='text-white font-bold p-2'>You need to choose a size</Text>
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
                  <Image  className='rounded-xl w-[350px] h-[350px]' source={{uri: value.image1}}/>
              </Pinchable>}

              {<Pinchable className='ml-3'>
                  <Image  className='rounded-xl w-[350px] h-[350px]' source={{uri: value.image2}}/>
              </Pinchable>}

              {<Pinchable className='ml-8 w-[370px]'>
                  <Image  className='rounded-xl w-[350px] h-[350px]' source={{uri: value.image3}}/>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 13, paddingTop: 50},
  head: {height: 40, width: 355, backgroundColor: "#f1f8ff"},
  Head_text: {margin: 6, fontStyle: "bold", color: "black"},
  text: {margin: 6, color: "black",}
})

export default Navbar;
