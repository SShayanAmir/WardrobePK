import { View, Text, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'

import CategoryContext from '../context/CategoryContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated';


const Categories = () => {
    const navigation = useNavigation()

    const { setCategory, setBrand } = useContext(CategoryContext)

    const navigateToWeddingWear = () => {
        setCategory("Wedding wear")
        setBrand("")
        navigation.navigate("ProductPage")
    } 

    const navigateToPartyWear = () => {
        setCategory("Party Wear")
        setBrand("")
        navigation.navigate("ProductPage")
    }

    const navigateToCasualWear = () => {
        setCategory("Unstitched")
        setBrand("")
        navigation.navigate("ProductPage")
    } 

  return (
    <Animated.View>
        <Animated.View entering={SlideInDown.delay(300).duration(400)} className='absolute bg-gray-700 rounded-t-3xl h-[440px] inset-x-0 items-center mt-8' style={{elevation: 10}}>
            <Animated.Text entering={SlideInLeft.delay(400).duration(500)} className='text-xl ml-3 mt-3 font-semibold text-white'>Categories</Animated.Text>
        </Animated.View>
        <Animated.View className='mt-24'>
            <Animated.View entering={SlideInDown.delay(400).duration(600)}  className='items-center justify-between px-4' style={{flexDirection: "row", flexWrap: 'wrap'}}>
                <Pressable className='items-center h-[195px] bg-white rounded-xl active:scale-105' style={{elevation: 10}} onPress={() => navigateToWeddingWear()}>
                    <Image className='w-[170px] h-[160px] rounded-xl' resizeMode='contain' source={{uri: "https://tse2.mm.bing.net/th?id=OIP.iV8vPFX1D-pgOs5U-AK9qAHaII&pid=Api&P=0"}}/>
                    <Text className='text-black font-bold text-[16px]'>Wedding Wear</Text>
                </Pressable>
                <Pressable className='items-center h-[195px] bg-white rounded-xl active:scale-105' style={{elevation: 10}} onPress={() => navigateToPartyWear()}>
                    <Image className='w-[170px] h-[160px] rounded-xl' resizeMode='contain' source={{uri: "https://tse1.mm.bing.net/th?id=OIP.O5VciKVUKbtjLbA28GZ9NgHaLH&pid=Api&P=0"}}/>
                    <Text className='text-black font-bold text-[16px]'>Party Wear</Text>
                </Pressable>    
            </Animated.View>  
            <Animated.View entering={SlideInDown.delay(400).duration(600)} className='w-full items-center'>
                <Pressable className='items-center mt-4 h-[195px] bg-white rounded-xl active:scale-105' style={{elevation: 15}} onPress={() => navigateToCasualWear()}>
                    <Image className='w-[170px] h-[160px] rounded-xl' resizeMode='contain' source={{uri: "https://tse1.mm.bing.net/th?id=OIP.IQXMSVWq4dksa1SYdfDoAgHaKe&pid=Api&P=0"}}/>
                    <Text className='text-black font-bold text-[16px]'>Unstitched</Text>
                </Pressable>
            </Animated.View>
        </Animated.View>
    </Animated.View>
  )
}

export default Categories