import { View, Text, Pressable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import PrivacyPolicy from '../components/PrivacyPolicy'
import TermsAndCondition from '../components/TermsAndCondition';

export default function Policies({navigation}) {
    const {width} = useWindowDimensions();

    const [privacyPolicy, setPrivacyPolicy] = useState(true)
    const [termAndCondition, setTermAndCondition] = useState(false)

    const setPrivacyPolicyToTrue = () => {
        setPrivacyPolicy(true)
        setTermAndCondition(false)
    }
    
    const setTermAndConditionToTrue = () => {
        setTermAndCondition(true)
        setPrivacyPolicy(false)
    }

  
    return (
    <View>
        <View>
          <Navbar />
        </View>
        <View className='flex-row justify-between bg-white'>
            <Pressable className={privacyPolicy ? 'bg-white border-b-2 border-gray-100 items-center' : 'bg-gray-200 items-center'} style={privacyPolicy ? {width: width/2, elevation: 25} : {width: width/2}} onPress={() => setPrivacyPolicyToTrue()}>
                <Text className={privacyPolicy ? 'text-black font-black p-4' : 'text-black font-bold p-4'}>Privacy Policy</Text>
            </Pressable>
            <Pressable className={termAndCondition ? 'bg-white border-b-2 border-gray-100 items-center' : 'bg-gray-200 items-center'} style={termAndCondition ? {width: width/2, elevation: 25} : {width: width/2}} onPress={() => setTermAndConditionToTrue()}>
                <Text className={termAndCondition ? 'text-black font-black p-4' : 'text-black font-bold p-4'}>Terms & Condition</Text>
            </Pressable>
        </View>
        {termAndCondition && <TermsAndCondition />}
        {privacyPolicy && <PrivacyPolicy />}
    </View>
  )
}