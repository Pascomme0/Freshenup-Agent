// Back.js
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Back = ({ title = "Liste des catégories" }) => {
  const router = useRouter();

  return (
    <View className='flex flex-row items-center p-4 justify-center'>
      <TouchableOpacity onPress={() => router.back()}>
        <View className='rounded-full bg-slate-300 w-8 h-8 items-center justify-center'>
          <FontAwesome name="angle-left" size={24} color="blue"  />
        </View>
      </TouchableOpacity>
      <View className='flex-1 items-center'>
        <Text style={{ fontWeight: '800', textAlign: 'center' }} className='text-center pr-4 text-lg'>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Back;