// ValiderContrat.js
import { View, Text, Image, Button, Alert } from 'react-native';
import React from 'react';
import { TailwindProvider } from 'nativewind';
import user from '../assets/images/user.png';

const ValiderContrat = () => {
  const handleConfirm = () => {
    Alert.alert("Confirmation", "Traitement du contrat confirmé");
  };

  return (
      <View className="flex-1 items-center justify-center bg-white px-6 ">
        <View className="bg-white shadow-md px-2 w-full max-w-md">
        <Text className="text-center text-gray-700 text-lg my-2 ">Client</Text>

          <Image
            source={user}
            className="w-48 h-48  mx-auto"
          />
          <Text className="text-center text-blue-500 font-bold text-2xl mt-6">
            François Xavier
          </Text>
          <Text className="text-center text-gray-700 text-xl mt-2">25 ans</Text>
          <Text className="text-center text-gray-500 text-lg mt-1">
            Inscrite depuis Juillet 2019
          </Text>
          <View className="bg-blue-100 p-2 rounded-lg mt-6">
            <Text className="text-center text-blue-500 text-lg">
              Date de traitement : 17/04/2024
            </Text>
          </View>
          <View className="mt-8 p-2">
            <Button title="Confirmer traitement du contrat" onPress={handleConfirm} color="#1D4ED8" />
          </View>
        </View>
      </View>
  );
};


export default ValiderContrat;