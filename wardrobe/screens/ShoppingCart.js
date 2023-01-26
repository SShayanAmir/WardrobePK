import {View, Text, Image, ScrollView, Pressable, Modal, TextInput, ActivityIndicator, Linking, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useContext, useState} from 'react';

import moment from "moment";

import 'react-native-get-random-values';
import { v4 as uuidv4} from 'uuid'

import CartContext from '../context/CartContext';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { useAuth0 } from 'react-native-auth0';

import Clipboard from '@react-native-clipboard/clipboard'

import Animated, { FadeInDown, FadeOutDown, SlideInDown, SlideInLeft, SlideInRight, SlideInUp, ZoomInEasyDown } from 'react-native-reanimated';

import { SERVER_URL } from '@env';

const ShoppingCart = ({navigation}) => {

  const {getCredentials} = useAuth0();

  const { cart, setCart, removeFromCart, clearCart } = useContext(CartContext);

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [postalCode, setPostalCode] = useState(null)
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [address, setAddress] = useState(null)

  const [uniquidID, setUniquidID] = useState("")
  const [createdAtDateStore, setCreatedAtDateStore] = useState("")

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery(COD)")
  
  const [shippingDetails, setShippingDetails] = useState(false)
  const [deliveryLocationModal, setDeliveryLocationModal] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [checkoutCompleteModal, setCheckoutCompleteModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const [textCopiedNoti, setTextCopiedNoti] = useState(false)

  let totalPrice = 0;
  let subTotal = 0;
  const shippingTax = 200;
  let grandTotal = 0;

  const copyText = () => {
    Clipboard.setString(uniquidID)
    setTextCopiedNoti(true)
    setTimeout(() => {
      setTextCopiedNoti(false)
    }, 2500)
  }
  
  const handleIncrement = (cartId) => {
    setCart((cart) => cart.map((carts) => cartId === carts.id ? {...carts, quantity: carts.quantity + (carts.quantity < 10 ? 1 : 0)} : carts ))
  }
  
  const handleDecrement = (cartId) => {
    setCart((cart) => cart.map((carts) => cartId === carts.id ? {...carts, quantity: carts.quantity - (carts.quantity > 1 ? 1 : 0)} : carts ))
  }
  
  const addShippingDetails = () => {
    setShippingDetails(true)
    setDeliveryLocationModal(false)
  }
  
  const Checkout = async () => {
    try {
      const createdAtDate = moment().format("MMMM Do YYYY");
      const trackingNumber = uuidv4();

      setCreatedAtDateStore(createdAtDate)
      setUniquidID(trackingNumber)
      
      const status = "Pending"

      setConfirmationModal(false)
      setLoading(true)
      
      const body = { trackingNumber, cart, paymentMethod, grandTotal, createdAtDate, status, firstName, lastName, email, phoneNumber, city, state, postalCode, address }
      
      const token = await getCredentials();

      const response = await fetch(`${SERVER_URL}/customer/order`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}`},
        body: JSON.stringify(body)
      })

      const subject = `Wardrobe\nYour Order Has Been Placed`
      const emailBody = `We have got your order!\n Name: ${firstName} ${lastName}\n Tracking Number: ${trackingNumber}\n Order Total: ${grandTotal}\n Address: ${state} \n ${city}\n ${address}`

      // const url = `mailto:${email}?subject=${subject}&body=${emailBody}`

      setLoading(false)
      setCheckoutCompleteModal(true)
    } catch (err) {
      console.error(err)
    }
  }

  const ContinueShoppingButton = async () => {
    await clearCart()
    setCheckoutCompleteModal(false)
    navigation.navigate("Home")
    
  }
  
  disabledTermDeliveryButton = firstName === null || lastName === null || email === null || phoneNumber === null || postalCode === null || city === null || state === null || address === null
  disabledCheckoutButton = cart.length === 0 ||  shippingDetails === false;

  return (
    <View>
      <View className='absolute flex-row bg-gray-300 h-[150px] w-screen'>
        <View>
          <Pressable className='bg-white active:bg-slate-200 items-center justify-center rounded-xl w-[45px] h-[45px] mt-4 ml-3' style={{elevation: 10}} onPress={() => navigation.navigate("Home")}>
            <Entypo name='chevron-left' style={{color: 'black', fontSize: 40, paddingLeft: 2}}/>
          </Pressable>
        </View>
        <View className='absolute inset-x-0 flex-row justify-center'>
          <Text className='text-gray-700 font-medium text-xl mt-6'>Order Details</Text>
        </View>
      </View>
      { cart.length === 0 ? 
      <View className='mx-3 mt-[75px] h-[255px] bg-white rounded-xl items-center' style={{elevation: 15}}>
        <Text className='text-gray-800 font-bold text-lg mt-20'>No Items On Cart Yet!</Text>
        <Text className='text-gray-600 font-bold text-lg'>Start Adding To Checkout Now!</Text>
      </View>
       :
      <ScrollView className='mx-3 mt-[75px] h-[255px] bg-white rounded-xl' style={{elevation: 15}}>
        {cart.map(carts => {
          totalPrice = carts.quantity * carts.price
          subTotal += carts.quantity * carts.price
          grandTotal = subTotal + shippingTax;
          return(
          <Animated.View entering={ZoomInEasyDown.delay(400)} key={carts.id} className='flex-row mt-[10px] ml-2'>
            <View>
              <Image
                className="rounded-lg w-[105px] h-[105px]"
                source={{uri: carts.image1}}
              />
            </View>
            <View>
              <Text numberOfLines={1} className='text-black text-lg font-bold w-[145px] ml-6'>{carts.title}</Text>
              <View className='flex-row'>
                <Text className='text-red-500 font-medium ml-6'>Rs. {carts.price}</Text>
                <Text className='absolute text-gray-400 ml-[90px]'> (Total: {totalPrice})</Text>
              </View>
              <View className='flex-row'>
                <Text className='text-black font-black ml-6'>Size:</Text>
                <Text className='text-gray-500 font-bold ml-1'>{carts.size}</Text>
              </View>
              <View className='flex-row justify-between absolute bottom-0 ml-4'>
                <Pressable onPress={() => handleDecrement(carts.id)} className='active:bg-gray-200 rounded-full'>
                  <AntDesign name='minuscircleo' style={{color: "gray", fontSize: 22,  padding: 5}}/>
                </Pressable>
                <Text className='text-gray-700 font-semibold ml-1 mt-1.5'>{carts.quantity}</Text>
                <Pressable onPress={() => handleIncrement(carts.id)} className='ml-1 active:bg-gray-200 rounded-full'>
                  <AntDesign name='pluscircleo' style={{color: "gray", fontSize: 22, padding: 5}}/>
                </Pressable>
              </View>
            </View>
            <View className='absolute right-2'>
              <Text style={{fontSize: 13}} className='text-gray-500 font-semibold ml-1'>{carts.brand}</Text>
              <Pressable className='ml-8 mt-[58px] active:bg-red-200 rounded-full' onPress={() => removeFromCart(carts.id)}>
                <MaterialCommunityIcons name='delete' style={{color: "red", fontSize: 22, padding: 5}}/>
              </Pressable>
            </View>
          </Animated.View>
          )
          })}
      </ScrollView>}
      <View className='mt-4 ml-4'>
      <View className='flex-row'>
          <Text className='text-gray-700 text-xl font-semibold'>Deleviry  Location</Text>
          <Text className='text-gray-400 font-bold mt-1 ml-2'>(Required)</Text>
        </View>
        <Pressable className='flex-row active:bg-gray-200 rounded-lg mt-2 pl-2 pb-5 mr-2' onPress={() => setDeliveryLocationModal(true)}>
          <View className='bg-white w-[50px] rounded-xl mt-4'>
            <FontAwesome5 name='truck' style={{color: "blue", fontSize: 25, padding: 10}}/>
          </View>
          {address === null || postalCode === null || city === null ? 
        <View>
          <Text className='text-gray-800 font-bold mt-5 ml-3'>Address</Text>
          <Text style={{fontSize: 11}} className='text-gray-400 ml-3'>Postal Code, City</Text>
        </View>
          :
           <View>
            <Text numberOfLines={1} className='text-gray-800 h-[20px] w-[150px] font-bold mt-5 ml-3'>{address}</Text>
            <Text style={{fontSize: 11}} className='text-gray-400 ml-3'>{postalCode}, {city}</Text>
          </View>}
          <View className='absolute right-2 mt-6'>
            <Entypo name='chevron-right' style={{color: "black", fontSize: 30}}/>
          </View>
        </Pressable>
      </View>
      <View className='mt-4 ml-4'>
        <View className='flex-row'>
          <Text className='text-gray-700 text-xl font-semibold'>Payment  Method</Text>
          <Text className='text-gray-400 font-bold mt-1 ml-2'>(Required)</Text>
        </View>
        <Pressable className='flex-row active:bg-gray-200 rounded-lg mt-2 pl-2 pb-5 mr-2'>
          <View className='bg-white w-[45px] rounded-xl mt-4'>
            <MaterialIcons name='payment' style={{color: "blue", fontSize: 25, padding: 10}}/>
          </View>
          <View>
            <Text className='text-gray-800 font-bold mt-5 ml-3'>{paymentMethod}</Text>
            <Text style={{fontSize: 11}} className='text-gray-400 ml-3'>Default</Text>
          </View>
          <View className='absolute right-2 mt-6'>
            <Entypo name='chevron-right' style={{color: "black", fontSize: 30}}/>
          </View>
        </Pressable>
      </View>
      <View className='ml-4 mt-2'>
        <Text className='text-gray-600 text-xl font-semibold'>Order Info</Text>
        <View className='flex-row justify-between mt-1'>
          <Text className='text-gray-400'>Subtotal</Text>
          <Text className='text-gray-400 mr-4'>{subTotal}</Text>
        </View>
        <View className='flex-row justify-between mt-1'>
          <Text className='text-gray-400'>Shipping Tax</Text>
          {cart.length === 0 ?  <Text className='text-gray-400 mr-4'>0</Text> :  <Text className='text-gray-400 mr-4'>+{shippingTax}</Text>}
        </View>
        <View className='flex-row justify-between mt-3'>
          <Text className='text-gray-400'>Total</Text>
          {cart.length === 0 ?  <Text className='text-black text-lg font-medium mr-4'>0</Text> : <Text className='text-black text-lg font-medium mr-4'>{subTotal + shippingTax}</Text>}
        </View>
      </View>
      <View className='mx-16 mt-7'>
        {loading ?
        <View className={'bg-blue-500 transition-all active:bg-blue-800 items-center rounded-3xl w-[280px]'}>
          <ActivityIndicator size={"large"} style={{padding: 10}}/>
        </View>
        :
        <Pressable disabled={disabledCheckoutButton} className={disabledCheckoutButton ? 'bg-blue-500 transition-all active:bg-blue-800 items-center rounded-3xl' : 'bg-blue-700 transition-all active:bg-blue-800 items-center rounded-3xl'} onPress={() => setConfirmationModal(true)}>
          {cart.length === 0 ? <Text className='p-3 text-white font-bold text-lg'>Checkout  (Rs. 0)</Text> : <Text className='p-3 text-white font-bold text-lg'>Checkout  (Rs. {subTotal + shippingTax})</Text>}
        </Pressable>}
      </View>

                                                    {/* Checkout Complete Modal */}
        <Modal visible={checkoutCompleteModal} transparent={true} animationType='slide'>
          <View className='bg-white rounded-t-3xl h-screen w-screen mt-12' style={{elevation: 25}}>
            <View className='absolute rounded-t-3xl w-full h-[150px] bg-gray-500 items-center justify-center' style={{elevation: 25}}>
              <Text className='text-white text-2xl font-black'>Your Order Has Been Placed!</Text>
            </View>
            <View className='flex-row ml-2 mt-[170px]'>
              <Text className='text-black font-black text-[15px]'>Payment Method Selected:</Text>
              <Text className='text-red-600 font-bold text-[15px] ml-2'>{paymentMethod}</Text>
            </View>
            <View className='flex-row ml-2 mt-5'>
              <Text className='text-black font-black text-[15px]'>Checkout Total:</Text>
              <Text className='text-red-500 font-black text-[15px] ml-2'>Rs. {subTotal + shippingTax}</Text>
            </View>
            <View className='flex-row ml-2 mt-5'>
              <Text className='text-black font-black text-[15px]'>Created At:</Text>
              <Text className='text-red-500 font-black text-[15px] ml-2'>{createdAtDateStore}</Text>
            </View>
            <View className='flex-row ml-2 mt-5'>
              <Text className='text-black font-black text-[15px]'>Your Tracking Number:</Text>
              <ScrollView horizontal className='mr-2 ml-2'>
                <Text className='text-red-500 font-black text-[15px] pr-2'>{uniquidID}</Text>
              </ScrollView>
            </View>
            <View className='items-center justify-center mt-6'>
              <Pressable className='bg-gray-700 active:bg-black w-[150px] rounded-xl' onPress={() => copyText()}>
                <View className='items-center justify-between p-3'>
                  <Text className='text-white font-bold'>Copy Tracking</Text>
                  <Text className='text-white font-bold'>Number</Text>
                </View>
              </Pressable>
            </View>
            <View className='items-center mt-2'>
              <Text className='text-gray-700 font-black'>(Can Be Used Later For Tracking Your Order)</Text>
            </View>

            <View className='items-center justify-center mt-[140px]'>
              <Pressable className='bg-green-600 active:bg-green-700 w-[220px] rounded-xl' onPress={() => ContinueShoppingButton()}>
                <View className='flex-row items-center justify-between p-5'>
                  <Text className='text-white text-lg font-bold'>Continue Shopping</Text>
                  <MaterialCommunityIcons name='logout' style={{color: "white", fontSize: 25, marginTop: 5, marginLeft: 10}}/>
                </View>
              </Pressable>
            </View>

            {textCopiedNoti && <Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutDown.duration(300)} className='w-screen h-screen items-center justify-center'>
              <View className='bottom-[340px] items-center justify-center w-[100px] bg-gray-500 rounded-2xl'>
                <Text className='text-white text-lg font-bold p-3'>Copied!</Text>
              </View>
            </Animated.View>}
          </View>
        </Modal>

                                                  {/* Order Confirmation Modal */}
      <Modal onRequestClose={() => setConfirmationModal(false)} visible={confirmationModal} transparent={true} animationType="slide">
        <View className='absolute bg-white inset-x-6 top-[300px] h-[200px] rounded-xl' style={{elevation: 50}}>
          <View className='items-center justify-center mt-[40px]'>
            <Text className='text-black font-bold text-xl'>Confirm Checkout?</Text>
          </View>
          <View className='flex-row mt-[25px] ml-9'>
            <Pressable className='items-center justify-center bg-red-500 active:bg-red-600 w-[120px] rounded-lg' onPress={() => setConfirmationModal(false)}>
              <Text className='text-white font-bold text-xl p-5'>Cancel</Text>
            </Pressable>
            <Pressable className='items-center justify-center bg-green-600 active:bg-green-700 w-[125px] rounded-lg ml-6' onPress={() => Checkout()}>
              <Text className='text-white font-bold text-xl p-5'>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
                                                {/* Modal for Shipping Details */}
      <Modal onRequestClose={() => setDeliveryLocationModal(false)} transparent={true} animationType='slide' visible={deliveryLocationModal}>
        <Animated.View className='bg-slate-200 h-screen'>

            <Animated.View entering={SlideInLeft.delay(300).duration(600)} className='z-10'>
              <Pressable className=' bg-white active:bg-slate-200 rounded-xl w-[45px] mt-5 ml-2' style={{elevation: 15}} onPress={() => setDeliveryLocationModal(false)}>
                <Entypo name='chevron-left' style={{color: 'black', fontSize: 40, paddingLeft: 2}}/>
              </Pressable>
            </Animated.View>
          
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} className='flex-row'>
              <Animated.View entering={SlideInUp.delay(300).duration(600)} className='absolute items-center bg-slate-400 h-[210px] w-screen'>
                <Text className='text-white font-bold text-2xl mt-[25px]'>Shipping Details</Text>
              </Animated.View>
          </TouchableWithoutFeedback>
          
          <Animated.View entering={SlideInUp.delay(500).duration(600)} className='ml-2 mt-16'>
            <View className='absolute z-10 mt-2 ml-2'>
              <MaterialIcons name='email' style={{color: "black", fontSize: 25}}/>
            </View>
            <TextInput onChangeText={(e) => setEmail(e)} value={email} keyboardType="email-address" placeholderTextColor={"gray"} placeholder='Email' className='bg-white w-[370px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-10'/>
          </Animated.View>
          
          <Animated.View className='flex-row ml-2 mt-4'>
            <Animated.View  entering={SlideInLeft.delay(500).duration(600)}>
              <View className='absolute z-10 mt-1.5 ml-1'>
                <Feather name='user' style={{color: "black", fontSize: 25}}/>
              </View>
              <TextInput onChangeText={(e) => setFirstName(e)} value={firstName} placeholderTextColor={"gray"} placeholder='First Name' className='bg-white w-[180px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-8'/>
            </Animated.View>
            <Animated.View  entering={SlideInRight.delay(500).duration(600)}>
              <View className='absolute z-10 ml-4 mt-1.5'>
                <Feather name='user' style={{color: "black", fontSize: 25}}/>
              </View>
              <TextInput onChangeText={(e) => setLastName(e)}  value={lastName} placeholderTextColor={"gray"} placeholder='Last Name' className='bg-white w-[180px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-9 ml-2'/>
            </Animated.View>
          </Animated.View>

          <Animated.View className='flex-row ml-2 mt-4'>
            <Animated.View entering={SlideInLeft.delay(700).duration(600)}>
              <View className='absolute z-10 mt-2 ml-1'>
                <Entypo name='phone' style={{color: "black", fontSize: 25}}/>
              </View>
              <TextInput onChangeText={(e) => setPhoneNumber(e)} value={phoneNumber} keyboardType="number-pad" placeholderTextColor={"gray"} placeholder='Phone Number' className='bg-white w-[250px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-8'/>
            </Animated.View>
            <Animated.View entering={SlideInRight.delay(700).duration(600)}>
              <View className='absolute z-10 ml-4 mt-2'>
                <MaterialCommunityIcons name='postage-stamp' style={{color: "black", fontSize: 25}}/>
              </View>
              <TextInput onChangeText={(e) => setPostalCode(e)} value={postalCode} keyboardType="number-pad" placeholderTextColor={"gray"} placeholder='Zip Code' className='bg-white w-[110px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-9 ml-2'/>
            </Animated.View>
          </Animated.View>

          <Animated.View className='flex-row ml-2 mt-4'>
            <Animated.View entering={SlideInLeft.delay(700).duration(600)}>
              <View className='absolute z-10 mt-2 ml-2'>
                <MaterialCommunityIcons name='home-city' style={{color: "black", fontSize: 25}}/>
              </View>
              <TextInput onChangeText={(e) => setCity(e)} value={city} placeholderTextColor={"gray"} placeholder='City' className='bg-white w-[180px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-10'/>
            </Animated.View>
            <Animated.View entering={SlideInRight.delay(700).duration(600)}>
              <View className='absolute z-10 ml-4 mt-2'>
                <MaterialIcons name='location-city' style={{color: "black", fontSize: 25}}/>
              </View>
              <TextInput onChangeText={(e) => setState(e)}  value={state} placeholderTextColor={"gray"} placeholder='State' className='bg-white w-[180px] h-[45px] text-black border-2 border-gray-700 rounded-xl pl-9 ml-2'/>
            </Animated.View>
          </Animated.View>

          <Animated.View entering={SlideInDown.delay(800).duration(600)} className='ml-2 mt-4'>
            <TextInput multiline={true} numberOfLines={8} onChangeText={(e) => setAddress(e)} value={address} placeholderTextColor={"gray"} placeholder='Address' className='bg-white w-[370px] text-black border-2 border-gray-700 rounded-xl pl-3'/>
          </Animated.View>

          <Animated.View entering={SlideInDown.delay(900).duration(600)} className='justify-center items-center mt-14'>
            <Pressable onPress={() => addShippingDetails()} className={disabledTermDeliveryButton ? 'bg-gray-400 active:bg-black items-center w-[250px] rounded-3xl' : 'bg-gray-800 active:bg-black items-center w-[280px] rounded-3xl'} disabled={disabledTermDeliveryButton}>
              <Text className='text-white font-bold text-xl p-3'>Add Shipping Details</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Modal>

    </View>
  );
};

export default ShoppingCart;
