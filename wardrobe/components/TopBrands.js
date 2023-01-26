import { View, Text, Pressable, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../context/CategoryContext'

const TopBrands = () => {
    const [brand1, setBrand1] = useState("Maria B")
    const [brand2, setBrand2] = useState("Sapphire")
    const [brand3, setBrand3] = useState("Khaadi")

    const navigation = useNavigation()

    const { setCategory, setBrand } = useContext(CategoryContext)

    const navigateToBrand1 = () => {
        setCategory("")
        setBrand(brand1)
        navigation.navigate("ProductPage")
    } 

    const navigateToBrand2 = () => {
        setCategory("")
        setBrand(brand2)
        navigation.navigate("ProductPage")
    }

    const navigateToBrand3 = () => {
        setCategory("")
        setBrand(brand3)
        navigation.navigate("ProductPage")
    }

  return (
    <Animated.View className='mt-16'>
        <Animated.View entering={SlideInDown.delay(300).duration(400)} className='absolute bg-gray-700 rounded-t-3xl h-[440px] inset-x-0 items-center' style={{elevation: 10}}>
            <Animated.Text entering={SlideInLeft.delay(400).duration(500)} className='text-xl ml-3 mt-3 font-semibold text-white'>Top Brands</Animated.Text>
        </Animated.View>
        <Animated.View className='mt-16'>
            <Animated.View entering={SlideInDown.delay(400).duration(600)}  className='items-center justify-between px-4' style={{flexDirection: "row", flexWrap: 'wrap'}}>
                <Pressable className='items-center h-[195px] bg-white rounded-xl active:scale-105' style={{elevation: 10}} onPress={() => navigateToBrand1()}>
                    <Image className='w-[170px] h-[160px] rounded-xl' source={{uri: "https://scontent.flhe2-4.fna.fbcdn.net/v/t1.6435-9/117803196_10158903569932577_1720628910233082397_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFk2KpyR-LYqTB6DA184JohXZIVJsXJoeZdkhUmxcmh5sF9MIDsyjMD1pU_5GATwGCNsSRVdzsXCpoWbJW0nLAM&_nc_ohc=e93YD_qwhgYAX-DHH9M&_nc_ht=scontent.flhe2-4.fna&oh=00_AfD8fE4geF1C4dUewzvKUdAA8aCH0ACDL8c69LkGf5hGGw&oe=63F4C265"}}/>
                    <Text className='text-black font-bold text-[16px]'>{brand1}</Text>
                </Pressable>
                <Pressable className='items-center h-[195px] bg-white rounded-xl active:scale-105' style={{elevation: 10}} onPress={() => navigateToBrand2()}>
                    <Image className='w-[170px] h-[160px] rounded-xl' resizeMode='contain' source={{uri: "https://scontent.flhe2-4.fna.fbcdn.net/v/t39.30808-6/313941178_3751961795034022_3315200451099141795_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHdjtcFcB8wSwBvC4AvbqDkQg_nAGLQ0KlCD-cAYtDQqds7PAVjuGe5Wr93OGzMQ6x8PAyo6IeOxeoMO4E6OZvO&_nc_ohc=2pumw-3EqFoAX8ShNQ6&_nc_zt=23&_nc_ht=scontent.flhe2-4.fna&oh=00_AfDYq7CbQP_mwYAaR1I4aaq8tux06bW8Ht67K5cinH24Iw&oe=63D2A311"}}/>
                    <Text className='text-black font-bold text-[16px]'>{brand2}</Text>
                </Pressable>    
            </Animated.View>  
            <Animated.View entering={SlideInDown.delay(400).duration(600)} className='w-full items-center'>
                <Pressable className='items-center mt-4 h-[195px] bg-white rounded-xl active:scale-105' style={{elevation: 15}} onPress={() => navigateToBrand3()}>
                    <Image className='w-[170px] h-[160px] rounded-xl' resizeMode='contain' source={{uri: "https://scontent.flhe23-1.fna.fbcdn.net/v/t39.30808-6/313422153_10159339898259075_3505294250375769044_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHCESh4la0p_NwPUdryFBZG6TeuM1ydPs7pN64zXJ0-zh7fsPaY8fy1SumqiuhNOH2bWUOFMFOz0WvqqaWSllzM&_nc_ohc=dqZGIuSkivEAX9oa5Bt&_nc_ht=scontent.flhe23-1.fna&oh=00_AfDl7Rzg12ENpcQq_MVlPeh3ESj1chazM3J_Faw8ff-xbA&oe=63D252DA"}}/>
                    <Text className='text-black font-bold text-[16px]'>{brand3}</Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    </Animated.View>
  )
}

export default TopBrands