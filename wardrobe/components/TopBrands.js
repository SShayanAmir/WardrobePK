import { View, Text, Pressable, Image } from 'react-native'
import React, { useContext, useState, memo } from 'react'
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../context/CategoryContext'

import { LazyLoadImage } from 'react-native-lazy-load-image';

const TopBrands = () => {
    const [brand1, setBrand1] = useState("Maria B")
    const [brand2, setBrand2] = useState("Iznik")
    const [brand3, setBrand3] = useState("Rang Rasiya")

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
            <Animated.Text entering={SlideInLeft.delay(400).duration(500)} className='text-xl md:text-3xl ml-3 mt-3 md:mt-6 font-semibold text-white'>Top Brands</Animated.Text>
        </Animated.View>
        <Animated.View className='mt-16 md:mt-20'>
            <Animated.View entering={SlideInDown.delay(400).duration(600)}  className='items-center justify-between px-4 md:px-16' style={{flexDirection: "row", flexWrap: 'wrap'}}>
                <Pressable className='items-center h-[195px] md:h-[230px] bg-white rounded-xl active:scale-105' style={{elevation: 10}} onPress={() => navigateToBrand1()}>
                    <LazyLoadImage className='w-[170px] h-[160px] md:w-[220px] md:h-[190px] rounded-xl' source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/9b788a938fc6a02eac8ecee442e2f9f6"}}/>
                    <Text className='text-black font-bold text-[16px] md:text-[25px]'>{brand1}</Text>
                </Pressable>
                <Pressable className='items-center h-[195px] md:h-[230px] bg-white rounded-xl active:scale-105' style={{elevation: 10}} onPress={() => navigateToBrand2()}>
                    <LazyLoadImage className='w-[170px] h-[160px] md:w-[220px] md:h-[190px] rounded-xl' resizeMode='contain' source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/04acc95c8bd9020b01915ee05ce4b183"}}/>
                    <Text className='text-black font-bold text-[16px] md:text-[25px]'>{brand2}</Text>
                </Pressable>    
            </Animated.View>  
            <Animated.View entering={SlideInDown.delay(400).duration(600)} className='w-full items-center'>
                <Pressable className='items-center mt-4 md:mt-6 h-[195px] md:h-[230px] bg-white rounded-xl active:scale-105' style={{elevation: 15}} onPress={() => navigateToBrand3()}>
                    <LazyLoadImage className='w-[170px] h-[160px] md:w-[220px] md:h-[190px] rounded-xl' resizeMode='contain' source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/682d0521c033240f5acfb74fc0271005"}}/>
                    <Text className='text-black font-bold text-[16px] md:text-[25px]'>{brand3}</Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    </Animated.View>
  )
}

export default TopBrands