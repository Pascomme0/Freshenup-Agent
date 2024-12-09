import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Service from '../../components/Service'
import ProfilePage from '../../components/ProfilePage'
import ProfileSection from '../../components/SetupProfil'
//import UserProfileCard from '@/components/ProfilItem';
//import ProfilItem from '@/components/ProfilItem';
import { store } from '../store';
import {Provider} from "react-redux";

function App() {
  const navigation = useNavigation();

  return (
      <SafeAreaView className=' h-screen  bg-white'>
          {/*<Service/>*/}
          <ProfilePage/>
          <ProfileSection/>
      </SafeAreaView>
  );
}

export default function Index() {


    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
