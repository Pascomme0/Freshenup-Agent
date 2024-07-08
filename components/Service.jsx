import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import img from '../assets/images/react-logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Service() {
    const router = useRouter();

    return (
        <SafeAreaView className='' style={{backgroundColor: '#fff' ,justifyContent:'center'}}>
        <View className='' style={{  padding: 16, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Image source={img} style={{ width: 48, height: 48 }} />
          <TouchableOpacity
            style={{ backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
            onPress={() => navigation.replace('ServiceMode')}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Basculer en mode Service</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
