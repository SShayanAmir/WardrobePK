import {View, Text, FlatList, Image, Pressable, Modal, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Animated, { FadeInUp, SlideInUp } from 'react-native-reanimated';

import { useAuth0 } from 'react-native-auth0';

import { SERVER_URL } from '@env';

const ViewAllProduct = () => {

  const {getCredentials} = useAuth0();

  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState({})
  const [loader, setLoader] = useState(false) 

  const [image1, setImage1] = useState(true)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)

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

  const numColumns = 2;

  const getProducts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/product`);
      const jsonData = await response.json();

      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
    getProducts();
  }, []);

  const openModal = (product_id, title, brand, description, price, image1, image2, image3, category) => {
    setValue({product_id: product_id, title: title, brand: brand, description: description, price: price, image1: image1, image2: image2, image3: image3, category: category})
    setModal(true)
  }

  const deleteProduct = async (id) => {
    try {
      setLoader(true)

      const token = await getCredentials();

      const response = await fetch(`${SERVER_URL}/admin/product/${id}`, {method: "DELETE", headers: {Authorization: `Bearer ${token.accessToken}`}})
      setLoader(false)
      setModal(false)
      setProducts(products.filter((product) => product.product_id !== id))
    } catch (err) {
      console.error(err.message)
    } 
  }

  return (
    <Animated.View>
    
    {!loader && <Animated.View entering={SlideInUp.duration(600)} className='absolute -top-12 h-[260px] bg-slate-600 inset-x-0 items-center justify-center' style={{elevation: 10}}>
      <Animated.Text entering={FadeInUp.delay(400).duration(500)} className='text-white font-black text-2xl mb-40'>View All Products</Animated.Text>
    </Animated.View>}

      {loader ? 
      <View className='mr-[20px] mt-[250px]'><ActivityIndicator size='large'/></View>
       :
      <FlatList
        className='mb-52 ml-8 mt-10'
        numColumns={numColumns}
        keyExtractor={item => {
          return item.product_id;
        }}
        data={products}
        renderItem={product => {
          return (
            <Animated.View>
              <Pressable className='bg-white active:bg-gray-200 mt-2 mr-4 w-[160px] rounded-lg py-4'  onPress={() => openModal(product.item.product_id, product.item.title, product.item.brand, product.item.description, product.item.price, product.item.image1, product.item.image2, product.item.image3, product.item.category)}>
                      <Image className='w-[130px] h-[130px] ml-4 rounded-lg' source={{uri: product.item.image1}} />
                      <Text className='text-black text-lg font-bold ml-4 mt-1'>{product.item.title}</Text>
                      <Text className='text-red-500 font-bold ml-4'>Rs. {product.item.price}</Text>
                      <View className='mr-3 flex items-end'>
                          <Text className='text-gray-600 text-[10px]'>{product.item.category}</Text>
                          <Text className='text-gray-600 text-[13px]'>{product.item.brand}</Text>
                      </View>
              </Pressable>
            </Animated.View>
          );
        }}
      />}

      <Modal onRequestClose={() => setModal(false)} visible={modal} transparent={true} animationType="slide">
          <View className='bg-white w-screen h-screen'>
            <Pressable className='absolute items-center transition-all active:bg-gray-200 rounded-full mt-6 w-[40px] right-4' onPress={() => setModal(false)}>
              <Entypo name='cross' style={{color: "black", fontSize: 40}}/>
            </Pressable>
            <View className='border-b-2 border-gray-300 mx-3 pb-10'>
              <View className='mt-16 flex-row'>
                                                              {/* Image 1 */}
                {image1 && <View className='ml-5 mt-10'>
                  <Image className='w-[150px] h-[150px] rounded-lg' source={{uri: value.image1}} />
                </View>}
                                                              {/* Image 2 */}
                {image2 && <View className='ml-5 mt-10'>
                  <Image className='w-[150px] h-[150px] rounded-lg' source={{uri: value.image2}} />
                </View>}  
                                                              {/* Image 3 */}
                {image3 && <View className='ml-5 mt-10'>
                  <Image className='w-[150px] h-[150px] rounded-lg' source={{uri: value.image3}} />
                </View>}

                <View className='mt-10 ml-6'>
                  <Text numberOfLines={2} className='text-black font-bold text-lg w-[170px]'>{value.title}</Text>
                  <Text className='text-red-500 font-bold text-[15px]'>Rs. {value.price}</Text>
                  <View className='items-end justify-end mr-6 mt-10'>
                    <Text className='text-gray-500 text-[11px]'>{value.category}</Text>
                    <Text className='text-gray-500 font-medium text-[13px]'>{value.brand}</Text>
                  </View>
                </View>
              </View>

              <View className='flex-row mt-4 ml-7'>
                <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-500' onPress={() => toggleImage1()}>
                  <Text className='text-black font-bold text-lg px-2'>1</Text>
                </Pressable>
                <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-500' onPress={() => toggleImage2()}>
                  <Text className='text-black font-bold text-lg px-2'>2</Text>
                </Pressable>
                <Pressable className='bg-gray-200 rounded-full mx-2 active:bg-gray-500' onPress={() => toggleImage3()}>
                  <Text className='text-black font-bold text-lg px-2'>3</Text>
                </Pressable>
              </View>
            </View>

            <View className='mt-10 ml-6 w-[350px] h-[200px]'>
              <Text className='text-black font-bold text-xl'>Description:</Text>
              <Text className='text-gray-600 font-semibold text-lg'>{value.description}</Text>
            </View>

            <View className='absolute inset-x-10 bottom-10 items-center'>
              {loader ? <Pressable disabled={true} className='flex-row items-center justify-center bg-red-400 active:bg-red-600 w-[200px] h-[60px] rounded-xl'><ActivityIndicator size='large'/></Pressable> : <Pressable className='flex-row items-center justify-center bg-red-500 active:bg-red-600 w-[200px] h-[60px] rounded-xl' onPress={() => deleteProduct(value.product_id)}>
                <Text className='text-white text-xl font-bold ml-4'>Delete</Text>
                <MaterialIcons name='delete' style={{color: "white", fontSize: 20, marginLeft: 5}}/>
              </Pressable>}
            </View>
          </View>
      </Modal>
    </Animated.View>
  );
};

export default ViewAllProduct;
