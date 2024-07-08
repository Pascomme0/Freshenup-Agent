import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';



const Details = () => {
  const [description, setDescription] = useState('');
  const [nombreEnfants, setNombreEnfants] = useState('');
  const [autreDuree, setAutreDuree] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [heure, setHeure] = useState('');
  const [adresse, setAdresse] = useState('');
  const router = useRouter();


  /* const handleSubmit = () => {
    console.log({
      description,
      nombreEnfants,
      autreDuree,
      dateDebut,
      heure,
      adresse,
    });
  };
  */

  return (
    <View className="h-screen  bg-white p-4">
      <Text className="text-md  text-left font-bold mb-4">Description des tâches de la Nounou</Text>
      <TextInput
        className="border p-2 mb-4 w-full rounded"
        placeholder="Ma nounou devra faire la lessive, s'occuper des enfants..."
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />
            <Text className="text-md  text-left font-bold mb-4">Nombre d'enfant</Text>

      <TextInput
        className="border p-2 mb-4 w-full rounded"
        placeholder="Nombre d'enfants"
        value={nombreEnfants}
        onChangeText={setNombreEnfants}
      />
            <Text className="text-md  text-left font-bold mb-4">Autre durée</Text>

      <TextInput
        className="border p-2 mb-4 w-full rounded"
        placeholder="Autre durée (Préciser)"
        value={autreDuree}
        onChangeText={setAutreDuree}
      />
            <Text className="text-md  text-left font-bold mb-4">Date</Text>

      <TextInput
        className="border p-2 mb-4 w-full rounded"
        placeholder="Date de début"
        value={dateDebut}
        onChangeText={setDateDebut}

      />
                  <Text className="text-md  text-left font-bold mb-4">Heure</Text>

      <TextInput
        className="border p-2 mb-4 w-full rounded"
        placeholder="Heure"
        value={heure}
        onChangeText={setHeure}
      />
                  <Text className="text-md  text-left font-bold mb-4">Adresse</Text>

      <TextInput
        className="border p-2 mb-4 w-full rounded"
        placeholder="Adresse"
        value={adresse}
        onChangeText={setAdresse}
      />
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded w-full"
        onPress={() => router.push('../../ValiderContrat')}
      >
        <Text className="text-center text-white font-bold">Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
