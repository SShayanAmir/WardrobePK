import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React, { useContext, memo } from 'react'

import CategoryContext from '../context/CategoryContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated';

import { LazyLoadImage } from 'react-native-lazy-load-image';

const Categories = () => {
    const navigation = useNavigation()

    const { setCategory, setBrand } = useContext(CategoryContext)

    const navigateToWeddingWear = () => {
        setCategory("Wedding wear")
        setBrand("")
        navigation.navigate("ProductPage")
    } 

    const navigateToStitched = () => {
        setCategory("Stitched")
        setBrand("")
        navigation.navigate("ProductPage")
    }

    const navigateToUnstitched = () => {
        setCategory("Unstitched")
        setBrand("")
        navigation.navigate("ProductPage")
    } 

    const navigateToPreorder = () => {
        setCategory("Preorder")
        setBrand("")
        navigation.navigate("ProductPage")
    } 

  return (
    <View className=''>
        <Animated.View className="items-start ml-3">
            <Animated.Text entering={SlideInLeft.duration(800)} className="text-xl font-semibold text-black">
                Categories
            </Animated.Text>
        </Animated.View> 
        <ScrollView className="w-full" horizontal showsHorizontalScrollIndicator={false}>
                <Pressable onPress={() => navigateToPreorder()} className='pt-2 pb-14 px-2 scale-100 active:scale-105'>
                    <View className='border border-transparent mt-2' style={{elevation: 25}}>
                        <LazyLoadImage 
                        className="h-[150px] w-[180px] rounded-lg"
                        resizeMode="contain"
                        source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/image_83d1a27f-befa-4d97-80b4-5542607c9840-ezgif.com-webp-to-jpg-converter.jpg"}}/>
                    </View>
                </Pressable>
                
                <Pressable onPress={() => navigateToUnstitched()} className='pt-2 pb-12 px-2 scale-100 active:scale-105'>
                    <View className='border border-transparent mt-2' style={{elevation: 25}}>
                        <LazyLoadImage 
                        className="h-[150px] w-[180px] rounded-lg"
                        resizeMode="contain"
                        source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Unstitched.jpg"}}/>
                    </View>
                </Pressable>
                
                <Pressable onPress={() => navigateToStitched()} className='pt-2 pb-14 px-2 scale-100 active:scale-105'>
                    <View className='border border-transparent mt-2' style={{elevation: 25}}>
                        <LazyLoadImage 
                        className="h-[150px] w-[180px] rounded-lg"
                        resizeMode="contain"
                        source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Stitched.webp"}}/>
                    </View>
                </Pressable>

                <Pressable onPress={() => navigateToWeddingWear()} className='pt-2 pb-14 px-2 scale-100 active:scale-105'>
                    <View className='border border-transparent mt-2' style={{elevation: 25}}>
                        <LazyLoadImage 
                        className="h-[150px] w-[180px] rounded-lg"
                        resizeMode="contain"
                        source={{uri: "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Wedding.jpg"}}/>
                    </View>
                </Pressable>
                
                
        </ScrollView>
    </View>
  )
}

export default Categories