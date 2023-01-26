import {View, Text, SafeAreaView, Pressable} from 'react-native';
import React, {useState} from 'react';

// React Native Vector Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import AddABrand from './AddABrand';
import ViewAllBrands from './ViewAllBrands';
import AddAProduct from './AddAProduct';
import ViewAllProduct from './ViewAllProduct';
import Orders from './Orders';

import Animated, { RollOutLeft, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

const DashboardComponent = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const [openAddABrand, setOpenAddABrand] = useState(false)
  const [openViewAllBrands, setOpenViewAllBrands] = useState(false)
  const [openAddAProduct, setOpenAddAProduct] = useState(false)
  const [openViewAllProducts, SetOpenViewAllProducts] = useState(false)
  const [openOrders, setOpenOrders] = useState(true)
  
  // Toggle open **Add a Brand** component
  const toggleOpenAddABrand = () => {
    setOpenViewAllBrands(false)
    setToggleSideBar(false)
    setOpenAddAProduct(false)
    SetOpenViewAllProducts(false)
    setOpenOrders(false)
    setOpenAddABrand(true)
  }

  const toggleOpenAddAProuct = () => {
    setOpenViewAllBrands(false)
    setToggleSideBar(false)
    SetOpenViewAllProducts(false)
    setOpenAddABrand(false)
    setOpenOrders(false)
    setOpenAddAProduct(true)
  }

  // Toggle open **View All Brand** component
  const toggleOpenViewAllBrands = () => {
    setOpenAddABrand(false)
    SetOpenViewAllProducts(false)
    setToggleSideBar(false)
    setOpenAddAProduct(false)
    setOpenOrders(false)
    setOpenViewAllBrands(true)
  }

  // Toggle open **View All Products** component
  const toggleOpenViewAllProducts = () => {
    setOpenViewAllBrands(false)
    setOpenAddABrand(false)
    setToggleSideBar(false)
    setOpenAddAProduct(false)
    setOpenOrders(false)
    SetOpenViewAllProducts(true)
  }

  // Toggle open **View All Orders** component
  const toggleOpenViewAllOrders = () => {
    setOpenViewAllBrands(false)
    setOpenAddABrand(false)
    setToggleSideBar(false)
    setOpenAddAProduct(false)
    SetOpenViewAllProducts(false)
    setOpenOrders(true)
  }

  return (
    <View>
      <View className='z-30'>
        {toggleSideBar && <Animated.View entering={SlideInLeft.duration(300)} exiting={SlideOutLeft.duration(300)} className={`container absolute bg-white w-[240px] h-screen`} style={{elevation: 25}}>
                                                      {/* Side Bar */}
           <Animated.View entering={SlideInLeft.delay(300).duration(300)} className='flex-col mt-12 ml-3'>
            <Text className='absolute text-gray-500 font-bold text-xl -top-10 border-b-2 border-gray-200 w-[150px]'>Core</Text>
                                                {/* Add a Brand (Side Bar) */}
            <Pressable className={openAddABrand ? 'bg-gray-200 mt-2 ml-1 mr-8 rounded-xl' : 'active:bg-gray-200 mt-2 ml-1 mr-8 rounded-xl'} onPress={() => toggleOpenAddABrand()}>
              <View className='flex-row'>
                <AntDesign name='pluscircle' style={{color: "black", fontSize: 20, marginTop: 5, paddingLeft: 6}}/>
                <Text className='text-black font-semibold text-lg ml-2'>Add a Brand</Text>
              </View>
            </Pressable>
                                                {/* Add a Product (Side Bar) */}
            <Pressable className={openAddAProduct ? 'bg-gray-200 ml-1 mr-8 rounded-xl mt-3' : 'active:bg-gray-200 ml-1 mr-8 rounded-xl mt-3'} onPress={() => toggleOpenAddAProuct()}>
              <View className='flex-row'>
                <AntDesign name='pluscircle' style={{color: "black", fontSize: 20, marginTop: 5, paddingLeft: 6}}/>
                <Text className='text-black font-semibold text-lg px-2'>Add a Product</Text>
              </View>
            </Pressable>
                                                {/* View all Brands (Side Bar) */}
            <Pressable className={openViewAllBrands ? 'bg-gray-200 ml-1 mr-8 rounded-xl mt-3' : 'active:bg-gray-200 ml-1 mr-8 rounded-xl mt-3'} onPress={() => toggleOpenViewAllBrands()}>
              <View className='flex-row'>
                <MaterialCommunityIcons name='view-grid' style={{color: "black", fontSize: 20, marginTop: 5, paddingLeft: 6}}/>
                <Text className='text-black font-semibold text-lg px-2'>View All Brands</Text>
              </View>
            </Pressable>
                                                {/* View all Products (Side Bar) */}
            <Pressable className={openViewAllProducts ? 'bg-gray-200 ml-1 mr-8 rounded-xl mt-3' : 'active:bg-gray-200 ml-1 mr-8 rounded-xl mt-3'} onPress={() => toggleOpenViewAllProducts()}>
              <View className='flex-row'>
                <MaterialCommunityIcons name='view-grid' style={{color: "black", fontSize: 20, marginTop: 5, paddingLeft: 6}}/>
                <Text className='text-black font-semibold text-lg px-2'>View All Products</Text>
              </View>
            </Pressable>
                                                  {/* All Orders (Side Bar) */}
            <Pressable className={openOrders ? 'bg-gray-200 ml-1 mr-8 rounded-xl mt-3' :'active:bg-gray-200 ml-1 mr-8 rounded-xl mt-3'} onPress={() => toggleOpenViewAllOrders()}>
              <View className='flex-row'>
                <Entypo name='box' style={{color: "black", fontSize: 20, marginTop: 5, paddingLeft: 6}}/>
                <Text className='text-black font-semibold text-lg px-2'>Orders</Text>
              </View>
            </Pressable>
          </Animated.View>
        </Animated.View>}

        {!toggleSideBar && <View className={`absolute bg-white w-5 h-screen`} style={{elevation: 25}}></View>}

                                                      {/* Toggle Sidebar */}
        {toggleSideBar && <Animated.View entering={SlideInLeft.duration(300)} exiting={RollOutLeft.duration(300)}>
          <Pressable className={'w-[40px] ml-[200px]'} onPress={() => setToggleSideBar(false)}>
            <Entypo name={"chevron-left"} style={{color: 'black', fontSize: 40, width: 40}}/>
          </Pressable>
        </Animated.View>}
        {!toggleSideBar && <Animated.View  exiting={SlideOutLeft.duration(500)}>
          <Pressable className={'w-[40px] bg-white rounded-full'} onPress={() => setToggleSideBar(true)}>
            <Entypo name={"chevron-right"} style={{color: 'black', fontSize: 40, width: 40}}/>
          </Pressable>
        </Animated.View>}
      </View>
      
                                                  {/* Add a Brand Component */}
      {openAddABrand && <AddABrand />}

                                                {/* View All Brands Component */}
      {openViewAllBrands && <ViewAllBrands />}

                                                  {/* Add a Product Component */}
      {openAddAProduct && <AddAProduct />}
      
                                                  {/* Add a Product Component */}
      {openViewAllProducts && <ViewAllProduct />}
                                                  {/* Orders Component */}
      {openOrders && <Orders />}
    </View>
  );
};

export default DashboardComponent;
