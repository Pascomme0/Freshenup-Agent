import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import img from '../assets/images/LOGO.png';

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    mail: '',
    nom: '',
    prenoms: '',
    pays: '',
    ville: '',
    adresse: '',
    telephone: '',
    autre1: '',
    autre2: '',
    autre3: '',
  });

  const [images, setImages] = useState({
    recto: null,
    verso: null,
    profile: null,
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages({ ...images, [type]: result.assets[0].uri });
    }
  };

  const handleFinish = () => {
    console.log("Form data:", form);
    console.log("Images:", images);
  
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return form.mail && form.nom && form.prenoms && form.pays && form.ville;
      case 2:
        return form.adresse && form.telephone && form.autre1 && form.autre2 && form.autre3;
      case 3:
        return images.recto && images.verso;
      case 4:
        return images.profile;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis avant de continuer.");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View className="mb-4 mx-2">
            <TextInput
              placeholder="Mail"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.mail}
              onChangeText={(value) => handleInputChange('mail', value)}
            />
            <TextInput
              placeholder="Nom"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.nom}
              onChangeText={(value) => handleInputChange('nom', value)}
            />
            <TextInput
              placeholder="Prénoms"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.prenoms}
              onChangeText={(value) => handleInputChange('prenoms', value)}
            />
            <TextInput
              placeholder="Pays"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.pays}
              onChangeText={(value) => handleInputChange('pays', value)}
            />
            <TextInput
              placeholder="Ville"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.ville}
              onChangeText={(value) => handleInputChange('ville', value)}
            />
          </View>
        );
      case 2:
        return (
          <View className="mb-4">
            <TextInput
              placeholder="Adresse"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.adresse}
              onChangeText={(value) => handleInputChange('adresse', value)}
            />
            <TextInput
              placeholder="Téléphone Whatsapp"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              keyboardType="phone-pad"
              value={form.telephone}
              onChangeText={(value) => handleInputChange('telephone', value)}
            />
            <TextInput
              placeholder="Autre"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.autre1}
              onChangeText={(value) => handleInputChange('autre1', value)}
            />
            <TextInput
              placeholder="Autre"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.autre2}
              onChangeText={(value) => handleInputChange('autre2', value)}
            />
            <TextInput
              placeholder="Autre"
              style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, height: 56, fontSize: 16, backgroundColor: '#E8ECF4'}}
              value={form.autre3}
              onChangeText={(value) => handleInputChange('autre3', value)}
            />
          </View>
        );
      case 3:
        return (
          <View className="mb-4 mx-3">
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
              <Text style={{textAlign: 'center', fontWeight: '300', fontSize: 18}}>
                Scannez le recto verso de votre
              </Text>
              <Text style={{textAlign: 'center', fontWeight: '300', fontSize: 18}}>Pièce d'identité</Text>
            </View>
            <TouchableOpacity onPress={() => pickImage('recto')} style={{justifyContent: 'center', backgroundColor: '#F5F5F5', borderColor: '#ccc', borderRadius: 5, height: 128, width: '100%', padding: 10, marginBottom: 10}}>
              <Text style={{color: '#aaa', textAlign: 'center', fontSize: 18}}>Importer Recto</Text>
            </TouchableOpacity>
            {images.recto && <Image source={{ uri: images.recto }} style={{height: 96, width: 96, marginBottom: 10}} />}
            <TouchableOpacity onPress={() => pickImage('verso')} style={{justifyContent: 'center', backgroundColor: '#F5F5F5', height: 128, borderRadius: 5, padding: 10, marginBottom: 10}}>
              <Text style={{color: '#aaa', textAlign: 'center', fontSize: 18}}>Importer Verso</Text>
            </TouchableOpacity>
            {images.verso && <Image source={{ uri: images.verso }} style={{height: 96, width: 96}} />}
          </View>
        );
      case 4:
        return (
          <View style={{marginBottom: 24, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => pickImage('profile')} style={{position: 'relative', marginVertical: 24}}>
              <View className='rounded-full' style={{height: 148, width: 148, borderRadius: 64, borderWidth: 2, borderColor: '#ccc', overflow: 'hidden'}}>
                {images.profile ? (
                  <Image source={{ uri: images.profile }} style={{height: '100%', width: '100%'}} />
                ) : (
                  <View style={{height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8ECF4'}}>
                    <Ionicons name="camera" size={40} color="gray" />
                  </View>
                )}
              </View>
              <View style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: '#007AFF', padding: 8, borderRadius: 16}}>
                <Ionicons name="add-circle" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className='px-2' style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <View style={{width: '100%'}}>
        <Image
          source={img} // Remplacez par l'URL de votre logo
          style={{height: 100, width: 120, alignSelf: 'center', marginBottom: 16}}
          resizeMode="contain"
        />
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24}}>Inscription</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 24}}>
          {[1, 2, 3, 4].map((item) => (
            <View
              key={item}
              style={{height: 32, width: 32, borderRadius: 16, backgroundColor: item === step ? '#007AFF' : '#ccc', marginHorizontal: 4, justifyContent: 'center', alignItems: 'center'}}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>{item}</Text>
            </View>
          ))}
        </View>
        {renderStepContent()}
        <View style={{
  flexDirection: 'row', 
  justifyContent: step === 1 ? 'center' : 'space-between',
  width: '100%'
}}>
  {step > 1 && (
    <TouchableOpacity
      onPress={() => setStep(step - 1)}
      style={{
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: 96,

      }}
    >
      <Text style={{textAlign: 'center'}}>Retour</Text>
    </TouchableOpacity>
  )}
  {step < 4 ? (
    <TouchableOpacity
      onPress={handleNextStep}
      style={{
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
        width: 96,
        alignSelf: step === 1 ? 'center' : 'flex-end'
      }}
    >
      <Text style={{textAlign: 'center', color: 'white'}}>Suivant</Text>
    </TouchableOpacity>
  ) : (
    <Link replace href="/(tabs)" asChild>
      <TouchableOpacity
        onPress={handleFinish}
        style={{backgroundColor: '#28a745', borderRadius: 5, padding: 10, width: 96}}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>Terminer</Text>
      </TouchableOpacity>
    </Link>
  )}
</View>
      </View>
    </SafeAreaView>
  );
}
