import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';

import {launchImageLibrary} from 'react-native-image-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import { useAuth0 } from 'react-native-auth0';

import Animated, { FadeInDown, FadeInUp, FadeOutDown, SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from 'react-native-reanimated';

const AddAProduct = () => {

  const {getCredentials} = useAuth0();

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [fileURI1, setFileURI1] = useState(null)
  const [fileURI2, setFileURI2] = useState(null)
  const [fileURI3, setFileURI3] = useState(null)

  const [fileType1, setFileType1] = useState(null)
  const [fileType2, setFileType2] = useState(null)
  const [fileType3, setFileType3] = useState(null)

  disableAddButton = setFileURI1 === null || setFileURI2 === null || setFileURI3 === null || brand === null || category === null || title === null || description === null || price === null

  const [notification, setNotification] = useState(false);

  const [toggleImage1, setToggleImage1] = useState(false);
  const [toggleImage2, setToggleImage2] = useState(false);
  const [toggleImage3, setToggleImage3] = useState(false);

  const [errorNoti, setErrorNoti] = useState(false)

  const AddProduct = async () => {
    try {
      if(disableAddButton){
        setErrorNoti(true)
        setTimeout(() => {
          setErrorNoti(false) 
        }, 2500)
      } else {
        const photoResponse1 = await fetch(fileURI1)
        const photoResponse2 = await fetch(fileURI2)
        const photoResponse3 = await fetch(fileURI3)

        const blob1 = await  photoResponse1.blob()
        const blob2 = await  photoResponse2.blob()
        const blob3 = await  photoResponse3.blob()

        var { url } = await fetch(`${process.env.SERVER}/s3url`).then(res => res.json())
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": fileType1
          },
          body: blob1
        })
        const imageURL1 = url.split('?')[0]
        const image1 = imageURL1

        var { url } = await fetch(`${process.env.SERVER}/s3url`).then(res => res.json())
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": fileType2
          },
          body: blob2
        })
        const imageURL2 = url.split('?')[0]
        const image2 = imageURL2

        var { url } = await fetch(`${process.env.SERVER}/s3url`).then(res => res.json())
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": fileType3
          },
          body: blob3
        })
        const imageURL3 = url.split('?')[0]
        const image3 = imageURL3
        
        const body = {
          brand,
          title,
          description,
          price,
          quantity,
          image1,
          image2,
          image3,
          category,
        };

        const token = await getCredentials();

        const response = await fetch(`${process.env.SERVER}/admin/product`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token.accessToken}`},
          body: JSON.stringify(body),
        });
        setNotification(true);
        setTimeout(() => { 
          setNotification(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Launch Gallery Function
  const options = {
    title: 'Select the cover image',
    mediaType: 'photo',
    includeBase64: true,
  };

  const launchGallery1 = async () => {
    const result = await launchImageLibrary(options);
    setFileURI1(result.assets[0].uri);
    setFileType1(result.assets[0].type)
    setToggleImage1(true);
  };

  const launchGallery2 = async () => {
    const result = await launchImageLibrary(options);
    setFileURI2(result.assets[0].uri);
    setFileType2(result.assets[0].type)
    setToggleImage2(true);
  };

  const launchGallery3 = async () => {
    const result = await launchImageLibrary(options);
    setFileURI3(result.assets[0].uri);
    setFileType3(result.assets[0].type)
    setToggleImage3(true);
  };

  return (
    <View>
      
    <Animated.View entering={SlideInUp.duration(600)} className='absolute -top-12 h-[305px] bg-slate-600 inset-x-0 items-center justify-center' style={{elevation: 10}}>
      <Animated.Text entering={FadeInUp.delay(400).duration(500)} className='text-white font-black text-2xl mb-52'>Add a New Product</Animated.Text>
    </Animated.View>

    <ScrollView className='mb-28 mt-10'>
      <Animated.View entering={SlideInUp.delay(400).duration(600)} className="flex-row">
        {/*Input Fields for Image 1*/}
        {toggleImage1 ? (
          <Pressable onPress={() => launchGallery1()}>
            <View className="w-[100px] h-[100px] ml-12">
              <Image
                className="w-[100px] h-[100px] rounded-lg"
                source={{uri: fileURI1}}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable
            className="rounded-lg w-[100px] h-[100px] bg-white ml-12"
            onPress={() => launchGallery1()}>
            <View>
              <FontAwesome
                name="camera"
                style={{
                  color: 'black',
                  fontSize: 30,
                  marginLeft: 32,
                  marginTop: 30,
                  position: 'absolute',
                }}
              />
              <Text className="text-black text-md font-bold ml-5 mt-[70px]">
                Image 1*
              </Text>
            </View>
          </Pressable>
        )}
        {/*Input Fields for Image 2*/}
        {toggleImage2 ? (
          <Pressable onPress={() => launchGallery2()}>
            <View className="w-[100px] h-[100px] ml-2">
              <Image
                className="w-[100px] h-[100px] rounded-lg"
                source={{uri: fileURI2}}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable
            className="rounded-lg w-[100px] h-[100px] bg-white ml-2"
            onPress={() => launchGallery2()}>
            <View>
              <FontAwesome
                name="camera"
                style={{
                  color: 'black',
                  fontSize: 30,
                  marginLeft: 32,
                  marginTop: 30,
                  position: 'absolute',
                }}
              />
              <Text className="text-black text-md font-bold ml-5 mt-[70px]">
                Image 2*
              </Text>
            </View>
          </Pressable>
        )}
        {/*Input Fields for Image 3*/}
        {toggleImage3 ? (
          <Pressable onPress={() => launchGallery3()}>
            <View className="w-[100px] h-[100px] ml-2">
              <Image
                className="w-[100px] h-[100px] rounded-lg"
                source={{uri: fileURI3}}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable
            className="rounded-lg w-[100px] h-[100px] bg-white ml-2"
            onPress={() => launchGallery3()}>
            <View>
              <FontAwesome
                name="camera"
                style={{
                  color: 'black',
                  fontSize: 30,
                  marginLeft: 32,
                  marginTop: 30,
                  position: 'absolute',
                }}
              />
              <Text className="text-black text-md font-bold ml-5 mt-[70px]">
                Image 3*
              </Text>
            </View>
          </Pressable>
        )}
      </Animated.View>
      <Animated.View entering={SlideInLeft.delay(400).duration(600)} className="ml-[50px] mt-5">
        <TextInput
          placeholder="Brand?"
          className="bg-white text-black pl-3 rounded-lg w-[310px] h-[50px]"
          placeholderTextColor={'gray'}
          onChangeText={e => setBrand(e)}
        />
      </Animated.View>
      <Animated.View entering={SlideInRight.delay(400).duration(600)} className="ml-[50px] mt-5">
        <TextInput
          style={{elevation: 10}}
          placeholder="Category?"
          className="bg-white text-black pl-3 rounded-lg w-[310px] h-[50px]"
          placeholderTextColor={'gray'}
          onChangeText={e => setCategory(e)}
        />
      </Animated.View>
      <Animated.View className="flex-row mt-5">
        <Animated.View entering={SlideInLeft.delay(400).duration(600)} className="ml-[50px]">
          <TextInput
            style={{elevation: 10}}
            placeholder="Title?"
            className="bg-white text-black pl-3 rounded-lg w-[190px] h-[50px]"
            placeholderTextColor={'gray'}
            onChangeText={e => setTitle(e)}
          />
        </Animated.View>
        <Animated.View entering={SlideInRight.delay(400).duration(600)} className="ml-2">
          <TextInput
            style={{elevation: 10}}
            placeholder="Price?"
            keyboardType="numeric"
            className="bg-white text-black pl-3 rounded-lg w-[110px] h-[50px]"
            placeholderTextColor={'gray'}
            onChangeText={e => setPrice(e)}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View entering={SlideInDown.delay(400).duration(600)} className="ml-[50px] mt-6">
        <TextInput
          style={{elevation: 10}}
          multiline={true}
          numberOfLines={15}
          placeholder="Descripiton?"
          className="bg-white text-black pl-3 rounded-lg w-[310px] h-[150px]"
          placeholderTextColor={'gray'}
          onChangeText={e => setDescription(e)}
        />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(500).duration(600)} className="items-center justify-center mt-8 ml-8">
        <Pressable
          className={"bg-gray-700 transition-all active:bg-black flex items-center justify-center w-[180px] rounded-2xl"}
          onPress={() => AddProduct()}>
          <Text className="text-white text-xl font-bold px-4 py-4">Add</Text>
        </Pressable>
      </Animated.View>

                                           {/* Notification for the Product added */}
      {notification &&(
        <Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutDown.duration(300)} className="absolute inset-x-8 ml-4 flex-row items-center rounded-lg bg-white bottom-1" style={{elevation: 5}}>
          <Text className="text-black py-5 pl-2">
            Product has been added to
          </Text>
          <Text className="text-black font-bold py-5 ml-2">"{brand}"</Text>
          <Feather
            name="check-circle"
            style={{
              color: 'green',
              fontSize: 22,
              top: 20,
              right: 10,
              position: 'absolute',
            }}
          />
        </Animated.View>
      )}
    </ScrollView>
                                  {/*Error Noti*/}
      {errorNoti && <Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutDown.duration(300)} style={{backgroundColor: "red"}} className='absolute items-center justify-center rounded-xl inset-x-10 ml-8 -top-6'>
        <Text className='text-white font-bold py-3'>Please Enter All The Required Fields!</Text>
        <View className='absolute left-0 top-7'>
          <Entypo style={{color: "red", fontSize: 35}} name='triangle-down'/>
        </View>
      </Animated.View>}
    </View>
  );
};

export default AddAProduct;
