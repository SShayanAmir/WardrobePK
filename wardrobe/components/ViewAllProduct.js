import {View, Text, FlatList, Image, Pressable, Modal, ActivityIndicator, ScrollView, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutUp, SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from 'react-native-reanimated';


import { useAuth0 } from 'react-native-auth0';


const ViewAllProduct = () => {

  const {getCredentials} = useAuth0();

  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [value, setValue] = useState({})
  const [loader, setLoader] = useState(false) 

  const [category, setCategory] = useState("Out Of Stock")

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
      const response = await fetch(`${process.env.SERVER}/product`);
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

      const response = await fetch(`${process.env.SERVER}/admin/product/${id}`, {method: "DELETE", headers: {Authorization: `Bearer ${token.accessToken}`}})
      setLoader(false)
      setModal(false)
      setProducts(products.filter((product) => product.product_id !== id))
    } catch (err) {
      console.error(err.message)
    } 
  }

  const ConfirmNewCategory = async (id) => {
    try {
      const body = { category }

      const token = await getCredentials();

      const response = await fetch(`${process.env.SERVER}/admin/product/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}`},
        body: JSON.stringify(body)
      })
  
      setEditModal(false)
      setModal(false)
      setLoader(true)
      await getProducts()
      setLoader(false)
      setCategory("Out Of Stock")
    } catch (err) {
      console.error(err.message)
    }
  }

  const OutOfStock = async (id) => {
    try {
      const body = { category }

      const token = await getCredentials();

      const response = await fetch(`${process.env.SERVER}/admin/product/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}`},
        body: JSON.stringify(body)
      })
  
      setEditModal(false)
      setModal(false)
      setLoader(true)
      await getProducts()
      setLoader(false)
      setCategory("Out Of Stock")
    } catch (err) {
      console.error(err.message)
    }
  }

  const editModalTurnOff = () => {
    setEditModal(false)
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
                          <Text className={product.item.category === "Out Of Stock" ? 'text-red-600 text-[10px] font-bold' : 'text-gray-600 text-[10px]'}>{product.item.category}</Text>
                          <Text className='text-gray-600 text-[13px]'>{product.item.brand}</Text>
                      </View>
              </Pressable>
            </Animated.View>
          );
        }}
      />}

      <Modal onRequestClose={() => setModal(false)} visible={modal} transparent={true} animationType="slide">
          <View className='bg-white w-screen h-screen'>
            <Pressable className='absolute z-10 items-center transition-all active:bg-gray-200 rounded-full mt-6 w-[40px] right-4' onPress={() => setModal(false)}>
                <Entypo name='cross' style={{color: "black", fontSize: 40}}/>
            </Pressable>

            <View className='border-b-2 border-gray-300 mx-3 pb-6'>
              <View className='mt-14 flex-row'>
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
                    <Text className={value.category === "Out Of Stock" ? 'text-red-700 font-bold text-[11px]' : 'text-gray-500 text-[11px]'}>{value.category}</Text>
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

            <View>
              <Text className='ml-7 mt-2 text-gray-600 font-bold text-xl'>Description</Text>
              <ScrollView className='ml-7 mr-3 mt-1 h-[220px]'>
                <Text className='text-gray-400 font-medium ml-2'>{value.description}</Text>
              </ScrollView>
            </View>

            <View className='absolute bottom-10 ml-8'>
              <View className='flex-row items-center justify-center gap-x-5'> 
                <Pressable style={{elevation: 25}} className='flex-row items-center justify-center bg-yellow-400 active:bg-yellow-500 w-[150px] h-[60px] rounded-xl' onPress={() => setEditModal(true)}>
                  <Text className='text-white font-bold text-xl'>Edit</Text>
                </Pressable>

                <Pressable style={{elevation: 25}} className='flex-row items-center justify-center bg-red-500 active:bg-red-600 w-[150px] h-[60px] rounded-xl' onPress={() => deleteProduct(value.product_id)}>
                  <Text className='text-white text-xl font-bold ml-4'>Delete</Text>
                  <MaterialIcons name='delete' style={{color: "white", fontSize: 20, marginLeft: 5}}/>
                </Pressable>
              </View>
            </View>
          </View>
      </Modal>

      <Modal onRequestClose={() => editModalTurnOff()} visible={editModal} transparent={true} animationType='slide'>
        <Animated.View style={{elevation: 100}} className='mt-[200px] rounded-t-[50px] bg-white h-screen w-screen'>
          
          <Animated.View entering={SlideInUp.delay(200).duration(500)} className='flex items-center justify-center'>
            <Animated.Text className='text-black font-bold text-xl mt-7'> Edit Section </Animated.Text>
          </Animated.View>

          <Animated.View entering={SlideInLeft.delay(300).duration(500)} className='mt-6 ml-5 flex-row'>
            <Animated.Text className="text-black font-bold mt-2.5 mr-3">Category</Animated.Text>
            <Animated.View>
              <TextInput placeholder='New Category...' placeholderTextColor={"gray"} className='text-black text-md rounded-lg bg-white pl-4 w-[190px] h-[40px]' style={{elevation: 15}} onChangeText={e => setCategory(e)}/>
            </Animated.View>

            {category !== "Out Of Stock" && <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
              <View className='absolute top-1 -left-6'>
                <Entypo name='triangle-left' style={{color: "green", fontSize: 40, marginLeft: 10, bottom: 2}}/>
              </View>
              
              <Pressable className='bg-green-700 rounded-xl ml-3 active:bg-green-800' onPress={() => ConfirmNewCategory(value.product_id)}>
                <Animated.Text className='font-bold text-white px-4 py-3'>Confirm</Animated.Text>
              </Pressable>
            </Animated.View>}
          </Animated.View>

          <Animated.View style={{elevation: 25}} entering={SlideInDown.delay(500).duration(500)} className='absolute inset-x-14 bg-red-500 rounded-3xl mt-[140px] top-[375px]'>
            <Pressable className='flex items-center justify-center px-6 py-5 rounded-3xl transition-all active:scale-105 active:bg-red-700 active' onPress={() => OutOfStock(value.product_id)}>
              <Text className="text-white text-xl font-bold">Out of Stock</Text>
            </Pressable>
          </Animated.View>
        
        </Animated.View>
      </Modal>
    </Animated.View>
  );
};

export default ViewAllProduct;
