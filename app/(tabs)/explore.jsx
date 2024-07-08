import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Service from '../../components/Service'
import ProfilePage from '../../components/ProfilePage'
//import UserProfileCard from '@/components/ProfilItem';
//import ProfilItem from '@/components/ProfilItem';


export default function Index() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className=' h-screen  bg-white'>
      <Service/> 
      <ProfilePage/>
    </SafeAreaView>
  );
}
