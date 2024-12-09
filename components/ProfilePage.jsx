import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from "@/app/userSlice";

const Profile = () => {
    const [imageUri, setImageUri] = useState(null);
    const [url, setUrl] = useState('https://admin.freshen-up.net');
    const [loadingImage, setLoadingImage] = useState(false);
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Nous avons besoin de la permission pour accéder à votre galerie.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, type, fileName } = {uri: result.assets[0].uri, type: result.assets[0].mimeType, fileName: result.assets[0].fileName};
            setImageUri({ uri, type, fileName });
            await uploadImageProfile(imageUri);
        }
    };

    const uploadImageProfile = async (img) => {
        setLoadingImage(true);
        const formData = new FormData();
        formData.append('profileImageFile', {
            uri: img.uri,
            name: img.fileName,
            type: img.type,
        });

        try {
            const link = url + user['@id'] + '/update_images';
            const response = await axios.post(link, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                timeout: 10000,
            });
            const userData = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser(userData));
        } catch (error) {
            console.log(error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour de votre photo de profil");
        }
        setLoadingImage(false);
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 14, paddingBottom:10}}>
            <View style={{ position: 'relative' }}>
                {loadingImage ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Image
                        source={user?.profileImagePath ? { uri: url + user.profileImagePath } : { uri: 'https://ui-avatars.com/api?background=random&name=' + user?.firstName + '+' + user?.lastName }}
                        style={{ width: 96, height: 96, borderRadius: 48 }}
                    />
                )}
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'green', padding: 8, borderRadius: 16 }}
                    onPress={pickImage}
                >
                    <FontAwesome name="pencil" size={16} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 32 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user?.firstName} {user?.lastName}</Text>
                <Text style={{ color: 'gray' }}>{user?.email}</Text>
                <Text style={{ color: 'gray' }}>{user?.phone ? '+225 ' + user?.phone : ''}</Text>
                <Text style={user?.statutCandidature ?
                    ((user?.statutCandidature === "PENDING") ? ({color: 'blue'}) :
                            ((user?.statutCandidature === "ACCEPTED") ? ({color: 'green'}) : ({color: 'red'}))
                    ) : ''}>{user?.statutCandidature ?
                    (user?.statutCandidature === 'PENDING'? 'Candidature en attente' :
                            (user?.statutCandidature === 'ACCEPTED'? 'Candidature acceptée' : 'Candidature refusée')
                    ) : '' }</Text>
            </View>
        </View>
    );
};

export default Profile;