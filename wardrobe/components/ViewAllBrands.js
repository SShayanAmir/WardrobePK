import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {FadeInUp, SlideInUp} from 'react-native-reanimated';

import { useAuth0 } from 'react-native-auth0';

import { SERVER_URL } from '@env';

const ViewAllBrands = () => {
  const {getCredentials} = useAuth0();

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);
  const [modalValue, setModalValue] = useState({
    galleryphoto: '',
    covertitle: '',
    brand_id: '',
  });

  const numColumns = 2;

  const getAllBrand = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/brand`);
      const jsonData = await response.json();

      setBrands(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete a Brand
  const deleteBrand = async id => {
    try {
      const token = await getCredentials();

      const response = fetch(`${SERVER_URL}/admin/brand/${id}`, {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token.accessToken}`}
      });
      setModalToggle(false);
      setBrands(brands.filter(brand => brand.brand_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getAllBrand();
  }, []);

  // OPEN MODAL
  const openModal = (galleryphoto, covertitle, brand_id) => {
    setModalToggle(true);
    setModalValue({
      galleryphoto: galleryphoto,
      covertitle: covertitle,
      brand_id: brand_id,
    });
  };

  return (
    <View className="absolute bg-gray-200 h-screen w-screen">
      {loading ? (
        <View>
          <ActivityIndicator
            size="large"
            style={{marginLeft: 20, marginTop: 250}}
          />
        </View>
      ) : (
        <Animated.View>
          <Animated.View
            entering={SlideInUp.duration(600)}
            className="absolute -top-12 h-[260px] bg-slate-600 inset-x-0 items-center justify-center"
            style={{elevation: 10}}>
            <Animated.Text
              entering={FadeInUp.delay(400).duration(500)}
              className="text-white font-black text-2xl mb-20">
              View All Brands
            </Animated.Text>
          </Animated.View>

          {/* All Brand List and Modal open logic */}
          <FlatList
            className="mb-32 ml-5 mt-20"
            numColumns={numColumns}
            keyExtractor={item => {
              return item.brand_id;
            }}
            data={brands}
            renderItem={brand => {
              return (
                <View className="">
                  <Pressable
                    className="bg-white active:bg-gray-100 w-[160px] rounded-lg ml-4 mt-2"
                    onPress={() =>
                      openModal(
                        brand.item.galleryphoto,
                        brand.item.covertitle,
                        brand.item.brand_id,
                      )
                    }>
                    <View className="items-center justify-center mt-4 mb-4">
                      <Image
                        className="w-[140px] h-[140px] rounded-lg"
                        source={{uri: brand.item.galleryphoto}}
                      />
                      <Text className="text-black font-bold text-xl mt-2">
                        {brand.item.covertitle}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
          {/* Modal */}

          <Modal
            onRequestClose={() => setModalToggle(false)}
            visible={modalToggle}
            transparent={true}
            animationType="slide">            
            <View
              className="absolute inset-x-0 inset-y-0 mt-[300px] bg-gray-50 rounded-t-3xl"
              style={{elevation: 25}}>
              <View className="absolute right-4 top-2">
                <Pressable
                  className="rounded-full active:bg-gray-200"
                  onPress={() => setModalToggle(false)}>
                  <Entypo name="cross" style={{color: 'black', fontSize: 35}} />
                </Pressable>
              </View>

              <View className="items-center justify-center mt-16">
                <Image
                  className="w-[200px] h-[200px] mt-2 rounded-lg"
                  source={{uri: modalValue.galleryphoto}}
                />
                <Text className="text-black font-semibold text-xl h-[40px] mt-4 ml-12 mr-9">
                  {modalValue.covertitle}
                </Text>
              </View>

              <View className="flex-row items-center justify-center mt-12">
                <Pressable className="bg-yellow-500 w-[120px] rounded-lg items-center justify-center">
                  <View className="flex-row px-2 py-4">
                    <Text className="text-black text-xl font-bold ml-5">
                      Edit
                    </Text>
                    <MaterialIcons
                      name="edit"
                      style={{color: 'black', fontSize: 25, marginLeft: 7}}
                    />
                  </View>
                </Pressable>
                <Pressable
                  className="bg-red-500 active:bg-red-600 w-[120px] rounded-lg ml-3 items-center justify-center"
                  onPress={() => deleteBrand(modalValue.brand_id)}>
                  <View className="flex-row px-2 py-4">
                    <Text className="text-black text-xl font-bold">Delete</Text>
                    <MaterialCommunityIcons
                      name="delete"
                      style={{color: 'black', fontSize: 25}}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          </Modal>
        </Animated.View>
      )}
    </View>
  );
};

export default ViewAllBrands;
