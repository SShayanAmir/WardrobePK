import { View, Text, TextInput, Pressable, ActivityIndicator, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Animated, { FadeIn, FadeOut, SlideInDown, SlideInUp } from 'react-native-reanimated';

import { useAuth0 } from 'react-native-auth0';

const TrackMyOrder = () => {
    const {getCredentials} = useAuth0();

    const [value, setValue] = useState("0")
    const [trackingNumber, setTrackingNumber] = useState("")

    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const [cancelModal, setCancelModal] = useState(false)

      const getOrder = async () => {
        try {
            setLoading(true)
            setTrackingNumber(value)

            const response = await fetch(`${process.env.SERVER_URL}/customer/order/${value}`)
            const jsonData = await response.json()
            
            setLoading(false)
            setOrder(jsonData)

            if(order.length === 0) {
                setNotFound(true)
                setTimeout(() => {
                    setNotFound(false)
                }, 4500)
            }
        } catch (err) {
            console.error(err)
        }
      }

      const cancelOrder = async () => {
        try {
            const status = ("Canceled") 
            const body = { status }
            setCancelModal(false)
            setLoading(true)
            
            const token = await getCredentials();

            const response = await fetch(`${process.env.SERVER_URL}/customer/order/${trackingNumber}`, {method: "PUT", headers: {"Content-Type": "application/json",  Authorization: `Bearer ${token.accessToken}`}, body: JSON.stringify(body)})
            
            setOrder([])
            setLoading(false)
        } catch (err) {
            console.error(err)
        }
      }

  return (
    <View>
        <View>
            <Navbar />
        </View>
        <View className='bg-blue-600 w-screen h-[120px]'>
            <Animated.View entering={SlideInUp.duration(500)} className='items-center mt-8'>
                <Text className='text-white text-2xl font-bold'>Track My Order</Text>
            </Animated.View>

            <Animated.View entering={SlideInDown.duration(500)} className='absolute top-[100px] inset-x-10 flex-row'>
                <TextInput onSubmitEditing={() => getOrder()} onChangeText={(e => setValue(e))} placeholderTextColor={"gray"} placeholder='Enter Your Tracking Number...' className='bg-white rounded-xl h-[40px] w-[300px] pl-4 text-black' style={{elevation: 20}}/>
                <View className='absolute right-3 top-1'>
                    <Ionicons name='search' style={{color: "black", fontSize: 25, backgroundColor: "white"}}/>
                </View>
            </Animated.View>

            {loading ?
             <View className='absolute w-screen h-screen items-center justify-center'>
                <ActivityIndicator size={"large"}/>
             </View>
             :
        <View>
            {order.length === 0 && notFound ? 
                <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} style={{backgroundColor: "red"}} className='absolute z-30 inset-x-20 items-center justify-center rounded-3xl -top-1'>
                    <Text className='text-white font-semibold p-2'>Sorry, Order Does Not Exist!</Text>
                    <View className='absolute left-0 top-5'>
                        <Entypo name='triangle-down' style={{color: "red", fontSize: 35}}/>
                    </View>
                </Animated.View>
               :
            <View className='mt-[130px]'>
                {order.map(orders => {
                    return (
                        <Animated.View>
                            {
                             <Animated.View entering={SlideInDown.duration(800)} className='absolute inset-x-3 bg-white rounded-xl' style={{elevation: 15}}>
                                <View style={{elevation: 20}} className='absolute inset-x-0 bg-gray-800 h-[80px] items-center justify-center rounded-t-xl'>
                                    <Text className='text-white text-xl font-bold'>Order Summary</Text>
                                </View>
                                
                                <View className='flex-row ml-5 mt-[90px] items-baseline'>
                                    <Text className='text-gray-700 font-black text-lg'>Name:</Text>
                                    <ScrollView horizontal className='w-full mr-4 ml-2'>
                                        <Text numberOfLines={1} className='text-black font-medium text-lg'>{orders.firstname} {orders.lastname}</Text>
                                    </ScrollView>
                                </View>

                                <View className='flex-row ml-5 mt-1 items-baseline'>
                                    <Text className='text-gray-700 font-black text-lg'>Email:</Text>
                                    <ScrollView horizontal className='w-full mr-4 ml-2'>
                                        <Text numberOfLines={1} className='text-black font-medium text-lg'>{orders.email}</Text>
                                    </ScrollView>
                                </View>
                                
                                <View className='flex-row ml-5 mt-1 items-baseline'>
                                    <Text className='text-gray-700 font-black text-lg'>Order Placed At:</Text>
                                    <ScrollView horizontal className='w-screen mr-4 ml-2'>
                                        <Text numberOfLines={1} className='text-black font-medium text-lg'>{orders.createdatdate}</Text>
                                    </ScrollView>
                                </View>
                                
                                <View className='flex-row ml-5 mt-1 items-baseline'>
                                    <Text className='text-gray-700 font-black text-lg'>Total:</Text>
                                    <ScrollView horizontal className='w-screen mr-4 ml-2'>
                                        <Text style={{color: "red"}} className='font-semibold text-lg'>Rs. {orders.grandtotal}</Text>
                                    </ScrollView>
                                </View>

                                <View className='flex-row ml-5 mt-1 items-baseline'>
                                    <Text className='text-gray-700 font-black text-lg'>Payment Method:</Text>
                                    <ScrollView horizontal className='w-screen mr-4 ml-2'>
                                        <Text className='text-black font-medium text-lg'>{orders.paymentmethod}</Text>
                                    </ScrollView>
                                </View>

                                <View className='flex-row ml-5 pb-6 mt-1 items-baseline'>
                                    <Text className='text-gray-700 font-black text-lg'>Status:</Text>
                                    {orders.status === "Pending" && <Text className='text-yellow-300 font-semibold text-lg ml-2 mt-[1px]'>{orders.status}</Text>}
                                    {orders.status === "Shipped" && <Text className='text-green-600 font-semibold text-lg ml-2 mt-[1px]'>{orders.status}</Text>}
                                    {orders.status === "Delivered" && <Text style={{color: "blue"}} className='font-semibold text-lg ml-2 mt-[1px]'>{orders.status}</Text>}
                                    {orders.status === "Canceled" && <Text style={{color: "red"}} className='font-semibold text-lg ml-2 mt-[1px]'>{orders.status}</Text>}
                                </View>
                                {(orders.status !== "Canceled" && orders.status !== "Delivered") && <View className='items-center justify-center'>
                                    <Pressable style={{elevation: 20}} className='items-center justify-center bg-red-500 active:bg-red-600 rounded-2xl mb-8' onPress={() => setCancelModal(true)}>
                                        <Text className='text-white font-black text-lg p-5'>Cancel Order</Text>
                                    </Pressable>
                                </View>}
                            </Animated.View>}
                        </Animated.View>
                    )
                })}
                </View>}
            </View>}
        </View>
        
        <Modal className='' onRequestClose={() => setCancelModal(false)} visible={cancelModal} animationType='slide' transparent={true}>
            <View className='absolute bg-white inset-y-[280px] mt-20 inset-x-10 rounded-2xl' style={{elevation: 25}}>
                <View className='items-center justify-center mt-8'>
                    <Text className='text-black text-lg font-black'>Are You Absolutely Sure?</Text>
                </View>
                <View className='flex-row justify-between mx-8 mt-6'>
                    <Pressable style={{elevation: 25}} className='bg-red-500 active:bg-red-600 w-[100px] rounded-xl items-center justify-center ml-2' onPress={() => setCancelModal(false)}>
                        <Text className='text-white font-bold text-lg p-4'>No</Text>
                    </Pressable>
                    <Pressable style={{elevation: 25}} className='bg-green-600 active:bg-green-700 w-[100px] rounded-xl items-center justify-center mr-2' onPress={() => cancelOrder()}>
                        <Text className='text-white font-bold text-lg p-4'>Yes</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default TrackMyOrder