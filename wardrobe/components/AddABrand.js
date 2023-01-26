import {View, Text, Pressable, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

// React Native Image Picker
import {launchImageLibrary} from 'react-native-image-picker';

// React Native Vector Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import { useAuth0 } from 'react-native-auth0';

import Animated, { FadeInDown, FadeInUp, FadeOutDown, SlideInLeft, SlideInRight, SlideInUp } from 'react-native-reanimated';

import { SERVER_URL } from '@env';

const AddABrand = () => {

  const {getCredentials} = useAuth0();

  const [galleryPhoto, setGalleryPhoto] = useState(null); 
  const [coverTitle, setCoverTitle] = useState(null);

  const [errorNoti, setErrorNoti] = useState(false)
  const [brandCreatedNoti, setBrandCreatedNoti] = useState(false)

  disabledTerm = galleryPhoto === null || coverTitle === null
  
  const [toggleImage, setToggleImage] = useState(false)

  // Launch Gallery Function
  const options = { 
    title: "Select the cover image",
    mediaType: 'photo',
    includeBase64: true
  }
  const launchGallery = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
    setToggleImage(true)
  }

  // Create Brand
  const postBrand = async () => {
    try {
      if(disabledTerm){
        setErrorNoti(true)
        setTimeout(() => {
          setErrorNoti(false)
        }, 2500)
      } else {
        const body = {coverTitle, galleryPhoto};

        const token = await getCredentials();

        const response = await fetch(`${SERVER_URL}/admin/brand`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}`},
          body: JSON.stringify(body)
        });
        setBrandCreatedNoti(true)
        setTimeout(() => {
          setBrandCreatedNoti(false)
        }, 2500)
      }
      
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
  <Animated.View className='items-center justify-center'>
    
    <Animated.View entering={SlideInUp.duration(600)} className='absolute -top-12 h-[300px] bg-slate-600 inset-x-0 items-center justify-center' style={{elevation: 10}}>
      <Animated.Text entering={FadeInUp.delay(400).duration(500)} className='text-white font-black text-2xl mb-44'>Add a New Brand</Animated.Text>
    </Animated.View>

    <Animated.View entering={SlideInLeft.delay(400).duration(600)} className='mt-16 z-10'>
                                                  {/*Input Fields for Cover Picture*/}
      {toggleImage ?
       <Pressable className='rounded-xl w-[140px] h-[140px] bg-white ml-2' style={{elevation: 15}} onPress={() => launchGallery()}>
       <View>
          <Image source={{uri: galleryPhoto}} className='w-[140px] h-[140px] rounded-xl'/>
       </View>
     </Pressable> 
      :
       <Pressable className='rounded-xl w-[140px] h-[140px] bg-white ml-2' style={{elevation: 15}} onPress={() => launchGallery()}>
        <View>
            <FontAwesome name='camera' style={{color: "black", fontSize: 40, marginLeft: 45, marginTop: 45 , position: 'absolute'}}/>
            <Text className='text-black text-md font-bold mt-[100px] ml-6'>Cover Picture*</Text>
        </View>
      </Pressable>}
    </Animated.View>
                                                          {/* Input field for Cover Title */}
    <Animated.View entering={SlideInRight.delay(400).duration(600)} className='ml-2 mt-6 rounded-lg'>
      <TextInput placeholder='Brand Name?' placeholderTextColor={"gray"} className='text-black text-md rounded-lg bg-white pl-4 w-[270px]' style={{elevation: 15}} onChangeText={e => {setCoverTitle(e)}}/>
    </Animated.View>
    
    <Animated.View entering={FadeInDown.delay(500).duration(600)}>
      <Pressable onPress={() => postBrand()} className='mt-10 ml-2 w-[160px] bg-gray-800 active:bg-black rounded-2xl items-center justify-center'>
        <Text className='text-white text-lg font-bold p-4'>Add Brand</Text>
      </Pressable>
    </Animated.View>
        
    {brandCreatedNoti && <Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutDown.duration(300)} className="absolute inset-x-10 flex-row items-center rounded-lg bg-white -bottom-40 ml-4">
      <Text className="text-black font-bold pl-5 py-5">
        "{coverTitle}"
      </Text>
      <Text className="text-black ml-2 py-5">Brand Created!</Text>
      <Feather
        name="check-circle"
        style={{
          color: 'green',
          fontSize: 22,
          marginTop: 32,
          right: 10,
          position: 'absolute',
        }}
      />
    </Animated.View>}

                                      {/*Error Noti*/}
      {errorNoti && <Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutDown.duration(300)} style={{backgroundColor: "red"}} className='absolute items-center justify-center rounded-xl inset-x-10 ml-8 -top-5'>
        <Text className='text-white font-bold py-3'>Please Enter All The Required Fields!</Text>
        <View className='absolute left-0 top-7'>
          <Entypo style={{color: "red", fontSize: 35}} name='triangle-down'/>
        </View>
      </Animated.View>}
  </Animated.View>
  )
}

export default AddABrand