import { View, Text, Pressable, FlatList, Modal, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useAuth0 } from 'react-native-auth0';

import Animated, { SlideInDown, SlideInLeft, SlideInRight, SlideInUp, ZoomInEasyDown } from 'react-native-reanimated';

import { SERVER_URL } from '@env';

const Orders = () => {

    const {getCredentials} = useAuth0();

    const [orders, setOrders] = useState([])

    const [value, setValue] = useState({})

    const [toggleOrderInfoModal, setToggleOrderInfoModal] = useState(false)
    const [toggleCartModal, setToggleCartModal] = useState(false)
    const [toggleStatusModal, setToggleStatusModal] = useState(false)

    const [pending, setPending] = useState(true)
    const [shipped, setShipped] = useState(false)
    const [delivered, setDelivered] = useState(false)
    const [canceled, setCanceled] = useState(false)

    const [loading, setLoading] = useState(false)

    const getAllOrders = async () => {
        try {
            const status = "Pending"
            
            setLoading(true)

            const token = await getCredentials();

            const response = await fetch(`${SERVER_URL}/admin/order/${status}`, {headers: {Authorization: `Bearer ${token.accessToken}`}})
            const jsonData = await response.json()
            
            setLoading(false)
            setOrders(jsonData)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const orderInfoModal = (orderNumber, trackingNumber, cart, paymentMethod, grandTotal, createdAtDate, status, firstName, lastName, email, phoneNumber, city, state, postalCode, address) => {
      setValue({orderNumber: orderNumber,trackingNumber: trackingNumber, cart: cart, paymentMethod: paymentMethod, grandTotal: grandTotal, createdAtDate: createdAtDate, status: status, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city, state: state, postalCode: postalCode, address: address})
      setToggleOrderInfoModal(true)
    }

    const changeStatusToShipped = async (id) => {
      const status = ("Shipped")
      const body = { status }
      setToggleStatusModal(false)

      const token = await getCredentials();

      const response = await fetch(`${SERVER_URL}/admin/order/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}`},
        body: JSON.stringify(body)
      })
      setToggleOrderInfoModal(false)
      getAllOrders()
    }

    const changeStatusToDelivered = async (id) => {
      const status = ("Delivered")
      const body = { status }
      setToggleStatusModal(false)

      const token = await getCredentials();

      const response = await fetch(`${SERVER_URL}/admin/order/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}`},
        body: JSON.stringify(body)
      })
      setToggleOrderInfoModal(false)
      getAllOrders()
    }

    const changeStatusFilterToPending = async () => {
      setPending(true)
      setShipped(false)
      setDelivered(false)
      setCanceled(false)

      const status = "Pending"

      setLoading(true)
      
      const token = await getCredentials();
      const response = await fetch(`${SERVER_URL}/admin/order/${status}`, {headers: {Authorization: `Bearer ${token.accessToken}`}})
      const jsonData = await response.json()
      setLoading(false)
      setOrders(jsonData)
    }

    const changeStatusFilterToShipped = async () => {
      setPending(false)
      setShipped(true)
      setDelivered(false)
      setCanceled(false)
      
      const status = "Shipped"

      setLoading(true)
      
      const token = await getCredentials();
      const response = await fetch(`${SERVER_URL}/admin/order/${status}`, {headers: {Authorization: `Bearer ${token.accessToken}`}})
      const jsonData = await response.json()
      setLoading(false)
      setOrders(jsonData)
    }

    const changeStatusFilterToDelivered = async () => {
      setPending(false)
      setShipped(false)
      setDelivered(true)
      setCanceled(false)
      
      const status = "Delivered"

      setLoading(true)
      
      const token = await getCredentials();
      const response = await fetch(`${SERVER_URL}/admin/order/${status}`, {headers: {Authorization: `Bearer ${token.accessToken}`}})
      const jsonData = await response.json()
      setLoading(false)
      setOrders(jsonData)
    }

    const changeStatusFilterToCanceled = async () => {
      setPending(false)
      setShipped(false)
      setDelivered(false)
      setCanceled(true)

      const status = "Canceled"

      setLoading(true)
      
      const token = await getCredentials();
      const response = await fetch(`${SERVER_URL}/admin/order/${status}`, {headers: {Authorization: `Bearer ${token.accessToken}`}})
      const jsonData = await response.json()
      setLoading(false)
      setOrders(jsonData)
    }

  return (
    <View>
      <Animated.View className='items-center justify-center mb-6'>
        <Animated.Text entering={SlideInUp.duration(600)} className='text-gray-600 font-bold text-2xl'>Orders</Animated.Text>
      </Animated.View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='absolute ml-8 mt-10'>
        <Animated.View entering={SlideInLeft.duration(500)}>
          <Pressable className={pending ? 'bg-gray-800 rounded-full' : 'bg-gray-400 rounded-full' } onPress={() => changeStatusFilterToPending()}>
            <Text className='text-white font-bold px-6 py-2'>Pending</Text>
          </Pressable>
        </Animated.View>
        <Animated.View entering={SlideInLeft.duration(500)}>
          <Pressable className={shipped ? 'bg-gray-800 rounded-full ml-2' : 'bg-gray-400 rounded-full ml-2'} onPress={() => changeStatusFilterToShipped()}>
            <Text className='text-white font-bold px-6 py-2'>Shipped</Text>
          </Pressable>
        </Animated.View>
        <Animated.View entering={SlideInLeft.duration(500)}>
          <Pressable className={delivered ? 'bg-gray-800 rounded-full ml-2' : 'bg-gray-400 rounded-full ml-2'} onPress={() => changeStatusFilterToDelivered()}>
            <Text className='text-white font-bold px-6 py-2'>Delivered</Text>
          </Pressable>
        </Animated.View>
        <Animated.View entering={SlideInLeft.duration(500)}>
          <Pressable className={canceled ? 'bg-gray-800 rounded-full ml-2' : 'bg-gray-400 rounded-full ml-2'} onPress={() => changeStatusFilterToCanceled()}>
            <Text className='text-white font-bold px-6 py-2'>Canceled</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>

      {loading ? <View className='items-center justify-center mt-[250px]'><ActivityIndicator size={"large"}/></View>
       :
      <View className='ml-8 mr-2'>
        <FlatList className='mt-10 mb-[370px]' data={orders} keyExtractor={item => {return item.trackingnumber}} renderItem={order => {
          return(
              <Pressable className='bg-white active:bg-slate-200 rounded-2xl p-4 mt-2' style={{elevation: 2}} onPress={() => orderInfoModal(order.item.ordernumber, order.item.trackingnumber, order.item.cart, order.item.paymentmethod, order.item.grandtotal, order.item.createdatdate, order.item.status, order.item.firstname, order.item.lastname, order.item.email, order.item.phonenumber, order.item.city, order.item.state, order.item.postalcode, order.item.address)}>
                <View className='flex-row items-center'>
                  <Text className='text-black font-bold text-lg'>{order.item.ordernumber}</Text>
                  <View className='ml-1'>
                    <View className='flex-row'>
                      <Text className='text-black font-black ml-4 mt-1'>Email:</Text>
                      <Text numberOfLines={1} className='text-gray-700 font-medium w-[230px] ml-2 mt-1'>{order.item.email}</Text>
                    </View>
                    <View className='flex-row'>
                      <Text className='text-black font-black ml-4 mt-1'>Phone Number:</Text>
                      <Text className='text-gray-700 font-medium w-[150px] h-[20px] ml-2 mt-1'>{order.item.phonenumber}</Text>
                    </View>
                    <View className='flex-row'>
                      <Text className='text-black font-black ml-4 mt-1'>Payment Method:</Text>
                      <Text className='text-gray-700 font-medium w-[150px] h-[20px] ml-2 mt-1'>{order.item.paymentmethod}</Text>
                    </View>
                    <View className='flex-row'>
                      <Text className='text-black font-black ml-4 mt-1'>Status:</Text>
                     {order.item.status === 'Pending' && <Text className="text-yellow-400 font-bold w-[150px] h-[20px] ml-2 mt-1">{order.item.status}</Text>}
                     {order.item.status === 'Shipped' && <Text className="text-green-600 font-bold w-[150px] h-[20px] ml-2 mt-1">{order.item.status}</Text>}
                     {order.item.status === 'Delivered' && <Text className="text-blue-600 font-bold w-[150px] h-[20px] ml-2 mt-1">{order.item.status}</Text>}
                     {order.item.status === 'Canceled' && <Text className="text-red-600 font-bold w-[150px] h-[20px] ml-2 mt-1">{order.item.status}</Text>}
                    </View>
                  </View>
                </View>
              </Pressable>
          )
        }}/>
      </View>}
                                                          
                                                        {/* Order Info Modal */}
      <Modal onRequestClose={() => setToggleOrderInfoModal(false)} visible={toggleOrderInfoModal} animationType='slide' transparent={true}>
        <Animated.View className='bg-slate-200 h-screen w-screen'>
          <View className='items-end mr-2'>
            <Pressable className='items-center active:bg-blue-400 mt-4 rounded-full z-20' onPress={() => setToggleOrderInfoModal(false)}>
              <Entypo name='cross' style={{color: "black", fontSize: 35}}/>
            </Pressable>
          </View>
          <Animated.View entering={SlideInUp.delay(200).duration(600)} className='absolute z-10 ml-4 mt-3 flex-row'>
            <Text className='text-xl text-white font-medium'>Order</Text>
            <Text className='text-2xl text-white font-black ml-1'>#{value.orderNumber}</Text>
          </Animated.View>

          <Animated.View entering={SlideInUp.duration(500)} className='absolute w-screen h-[170px] items-center justify-center bg-blue-500'>
            <Text className='text-white font-bold text-2xl mb-10'>Order Details</Text>
          </Animated.View>

        <Animated.View entering={ZoomInEasyDown.delay(400).duration(500)}>
          <ScrollView className='bg-white rounded-2xl h-[350px] mx-3 mt-14' style={{elevation: 15}}>
            <View className='flex-row ml-5 mt-6 items-baseline'>
              <Text className='text-black text-xl font-semibold'>Name:</Text>
              <ScrollView horizontal className='w-screen mr-4 ml-4'>
                <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.firstName} {value.lastName}</Text>
              </ScrollView>
            </View>
            <View className='flex-row ml-5 mt-2 items-baseline'>
              <Text className='text-black text-xl font-semibold'>Email:</Text>
              <ScrollView horizontal className='w-screen mr-4 ml-5'>
                <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.email}</Text>
              </ScrollView>
            </View>
            <View className='flex-row ml-5 mt-2 items-baseline'>
              <Text className='text-black text-xl font-semibold'>Phone Number:</Text>
              <ScrollView horizontal className='w-screen mr-4 ml-4'>
                <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.phoneNumber}</Text>
              </ScrollView>
            </View>
            <View className='flex-row ml-5 mt-2 items-baseline'>
              <Text className='text-black text-xl font-semibold'>Payment Method:</Text>
              {value.paymentMethod === 'Cash On Delivery(COD)' && <ScrollView horizontal className='w-screen mr-4 ml-2'><Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>Cash On Delivery(COD)</Text></ScrollView>}
            </View>
            <View className='flex-row ml-5 mt-2 items-baseline'>
              <Text className='text-black text-xl font-semibold h-[30px]'>Created At:</Text>
              <ScrollView horizontal className='w-screen mr-4 ml-3'>
                <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.createdAtDate}</Text>
              </ScrollView>
            </View>
            <View className='flex-row ml-5 mt-2 items-baseline'>
              <Text className='text-black text-xl font-semibold h-[30px]'>Tracking Number:</Text>
              <ScrollView horizontal className='w-screen mr-4 ml-2'>
                <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.trackingNumber}</Text>
              </ScrollView>
            </View>
              <View className='flex-row ml-5 mt-2 items-baseline'>
                <Text className='text-black text-xl font-semibold'>City:</Text>
                <ScrollView horizontal className='w-screen mr-4 ml-3'>
                  <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.city}</Text>
                </ScrollView>
              </View>
              <View className='flex-row ml-5 mt-2 items-baseline'>
                <Text className='text-black text-xl font-semibold ml-0.5'>State:</Text>
                <ScrollView horizontal className='w-screen mr-4 ml-3'>
                  <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.state}</Text>
                </ScrollView>
              </View>
            <View className='flex-row ml-5 mt-2 items-baseline'>
              <Text className='text-black text-xl font-semibold'>Postal Code:</Text>
              <ScrollView horizontal className='w-screen mr-4 ml-2'>
                <Text numberOfLines={1} className='text-gray-600 text-lg font-medium'>{value.postalCode}</Text>
              </ScrollView>
            </View>
            <View className='flex-row ml-5 mt-2'>
              <Text className='text-black text-xl font-semibold'>Address:</Text>
              <ScrollView className='w-screen mr-3'>
                <Text className='text-gray-600 text-lg font-medium ml-2'>{value.address}</Text>
              </ScrollView>
            </View>
            <View className='flex-row ml-5 mt-2 mb-4 items-baseline'>
              <Text className='text-black text-xl font-semibold'>Status:</Text>
              {value.status === 'Pending' && <Text className='text-yellow-300 text-lg font-medium ml-2 w-[150px]'>{value.status}</Text>}
              {value.status === 'Shipped' && <Text className='text-green-600 text-lg font-medium ml-2 w-[150px]'>{value.status}</Text>}
              {value.status === 'Delivered' && <Text className='text-blue-600 text-lg font-medium ml-2 w-[150px]'>{value.status}</Text>}
              {value.status === 'Canceled' && <Text className='text-red-600 text-lg font-medium ml-2 w-[150px]'>{value.status}</Text>}
            </View>
            <View className='border-t-2 border-gray-300 mx-3 py-3'>
              <View className='flex-row justify-between items-baseline'>
                <Text className='text-black text-xl font-semibold'>Subtotal:</Text>
                <Text className='text-gray-400 text-[15px] font-medium mr-4'>Rs. {value.grandTotal - 200}</Text>
              </View>
              <View className='flex-row justify-between items-baseline'>
                <Text className='text-black text-xl font-semibold'>Shipping Tax:</Text>
                <Text className='text-gray-400 text-[15px] font-medium mr-4'>Rs. 200</Text>
              </View>
              <View className='flex-row justify-between mb-5 items-baseline'>
                <Text className='text-black text-xl font-semibold'>Cart Total:</Text>
                <Text className='text-gray-600 text-lg font-black mr-4'>Rs. {value.grandTotal}</Text>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
          
          <Animated.View entering={SlideInDown.delay(500).duration(500)} className='absolute bottom-56 flex-row ml-3'>
            <Pressable className='w-[160px] bg-gray-700 active:bg-black active:scale-105 rounded-xl mr-2' style={{elevation: 15}} onPress={() => setToggleCartModal(true)}>
              <View className='p-6 flex-row items-center'>
                <Text className='font-black text-xl text-white mr-1.5'>View Cart</Text>
                <MaterialIcons name='shopping-cart' style={{color: "white", fontSize: 25}}/>
              </View>
            </Pressable>
            <Pressable className='w-[190px] bg-green-500 active:bg-green-600 active:scale-105 rounded-xl' style={{elevation: 15}} onPress={() => setToggleStatusModal(true)}>
              <View className='p-6 flex-row justify-center items-center'>
                <Text className='font-black text-xl text-white'>Change Status</Text>
              </View>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Modal>

      <Modal visible={toggleCartModal} onRequestClose={() => setToggleCartModal(false)} transparent={true} animationType='slide'>
        <View style={{elevation: 20}} className='absolute inset-x-5 inset-y-12 rounded-2xl bg-white flex items-center justify-center'>
            <Pressable className='absolute top-3 right-3 active:bg-gray-300 rounded-full z-10' onPress={() => setToggleCartModal(false)}>
              <Entypo name='chevron-down' style={{color: "black", fontSize: 40}}/>
            </Pressable>
            <ScrollView className='absolute inset-y-4 top-12'>
              <Text className='text-black font-medium p-4'>{value.cart}</Text>
            </ScrollView>
        </View>
      </Modal>

      <Modal visible={toggleStatusModal} onRequestClose={() => setToggleStatusModal(false)} transparent={true} animationType='slide'>
        <View className='absolute inset-x-4 inset-y-[310px] items-center bg-gray-50 rounded-2xl' style={{elevation: 25}}>
          
          <Animated.View entering={SlideInRight.delay(200).duration(500)} className='absolute top-3 right-3'>
            <Pressable className='active:bg-gray-200 rounded-full' onPress={() => setToggleStatusModal(false)}>
              <Entypo name='cross' style={{color: "black", fontSize: 35}}/>
            </Pressable>
          </Animated.View>

          <Animated.View className='mt-5'>
            <Animated.Text entering={SlideInDown.delay(200).duration(500)} className='text-black font-semibold text-xl'>Set Status To:</Animated.Text>
          </Animated.View>
          
          <Animated.View className='flex-row mt-8'>
            <Animated.View entering={SlideInLeft.delay(600).duration(500)}>
              <Pressable style={{elevation: 20}} className='items-center justify-center bg-green-500 active:bg-green-600 active:scale-105 w-[150px] h-[80px] rounded-xl' onPress={() => changeStatusToShipped(value.trackingNumber)}>
                <Text className='text-white text-xl font-bold'>To Shipped</Text>
              </Pressable>
            </Animated.View>
          
            <Animated.View entering={SlideInRight.delay(600).duration(500)}>
              <Pressable style={{elevation: 20}} className='items-center justify-center ml-3 bg-blue-600 active:bg-blue-700 active:scale-105 w-[150px] h-[80px] rounded-xl' onPress={() => changeStatusToDelivered(value.trackingNumber)}>
                <Text className='text-white text-xl font-bold'>To Delivered</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default Orders