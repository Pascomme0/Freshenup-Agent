import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
    const [image, setImage] = useState(require('../assets/images/user.png'));

    const pickImage = async () => {
        // Demande de permission pour accéder à la galerie
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Nous avons besoin de la permission pour accéder à votre galerie.');
            return;
        }

        // Ouvrir le sélecteur d'images
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage({ uri: result.assets[0].uri });
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 14, paddingBottom:10}}>
            <View style={{ position: 'relative' }}>
                <Image
                    source={image}
                    style={{ width: 96, height: 96, borderRadius: 48 }}
                />
                <TouchableOpacity 
                    style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'green', padding: 8, borderRadius: 16 }}
                    onPress={pickImage}
                >
                    <FontAwesome name="pencil" size={16} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 32 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ange Roddy</Text>
                <Text style={{ color: 'gray' }}>roddynguessan@gmail.com</Text>
                <Text style={{ color: 'gray' }}>+225 05 95 01 35 28</Text>
            </View>
        </View>
    );
};

export default Profile;