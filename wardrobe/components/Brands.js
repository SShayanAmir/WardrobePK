import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, memo} from 'react';

import Animated, { SlideInLeft, ZoomInEasyDown } from 'react-native-reanimated';

import { LazyLoadImage } from 'react-native-lazy-load-image';
import arrayShuffle from 'array-shuffle';

const Brands = props => {
  const [brands, setBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      const response = await fetch(`${process.env.SERVER}/brand`);
      const JsonData = await response.json();

      const shuffledData = await arrayShuffle(JsonData)
      setBrands(shuffledData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    async function tempFunction() {
      await getAllBrands();
    }
    tempFunction();
    return () => {};
  }, []);

  return (
    <View className='mt-6'>
      <Animated.View className="items-start ml-3 mt-5">
        <Animated.Text entering={SlideInLeft.duration(800)} className="text-xl font-semibold text-black">
        Featured Brands
        </Animated.Text>
      </Animated.View>
      <FlatList
        className='mt-1'
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={4}
        keyExtractor={item => {
          return item.brand_id;
        }}
        data={brands}
        renderItem={brand => { 
          return ( 
            <View>
              <Pressable
                style={{elevation: 25}}
                className="items-center ml-3 mr-2 mt-3 mb-12 bg-transparent active:scale-105 rounded-xl "
                onPress={() =>
                  props.navigateToProductScreen(brand.item.covertitle)
                }
                >
                <LazyLoadImage 
                  className="w-[180px] h-[150px] rounded-lg"
                  source={{uri: brand.item.galleryphoto}}
                />
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Brands;
