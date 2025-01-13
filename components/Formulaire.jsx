// app/FormScreen.js
import React, { useState, useEffect } from 'react';
import {View, TextInput, Alert, Text, Pressable, ScrollView, ActivityIndicator} from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import {Provider, useDispatch, useSelector} from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser} from "../app/userSlice";
import {store} from "../app/store";

const StyledTextInput = styled(TextInput);

const FormScreenApp = () => {
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [phone2, setPhone2] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const url = 'https://admin.freshen-up.net';

    const router = useRouter();

    useEffect(() => {
        setEmail(user?.email);
        setLastName(user?.lastName);
        setFirstName(user?.firstName);
        setUsername(user?.username);
        setPhone2(user?.phone2);
        setWhatsapp(user?.phone);
    }, []);

    const handleUsername = (value) => {
        if (/\s/.test(value)) {
            Alert.alert("Erreur", "Le nom d'utilisateur ne doit pas contenir d'espaces.");
            return;
        }
        setUsername(value);
    }

    const verifyUnicity = async (value) => {
        try {
            const response = await axios.post(url + "/api/users/verify_unicity", value);
            if (response.data["error"]) {
                Alert.alert('Erreur', response.data["message"])
            }
            return Boolean(response.data["error"]);
        } catch (e) {
            Alert.alert('Erreur', "Vérifier votre connexion à internet")
            return true
        }

    }

    const validator = async () => {
        setIsLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erreur",'Veuillez entrer une adresse email valide.');
            setIsLoading(false);
            return false
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(whatsapp)) {
            Alert.alert("Erreur",'Veuillez entrer un numéro de téléphone valide');
            setIsLoading(false);
            return false
        }
        if (!username) {
            Alert.alert("Erreur",'le champ username est requis')
            setIsLoading(false);
            return false
        }
        if (!firstName) {
            Alert.alert("Erreur",'le champ prénoms est requis')
            setIsLoading(false);
            return false
        }
        if (!lastName) {
            Alert.alert("Erreur",'le champ nom est requis')
            setIsLoading(false);
            return false
        }
        if (phone2 && !phoneRegex.test(phone2)) {
            Alert.alert("Erreur",'Veuillez entrer un numéro de téléphone valide')
            setIsLoading(false);
            return false
        }
        if (user.email !== email) {
            if (await verifyUnicity({email})) {
                setIsLoading(false);
                return false
            }
        }
        if (user.username !== username) {
            if (await verifyUnicity({username})) {
                setIsLoading(false);
                return false
            }
        }
        if (user.phone !== whatsapp){
            if (await verifyUnicity({phone: whatsapp})) {
                setIsLoading(false);
                return false
            }
        }
        if ((user.phone2 !== phone2) && phone2 && await verifyUnicity({phone: phone2})) {
            setIsLoading(false);
            return false
        }
        setIsLoading(false);
        return true;
    }

    const handleSubmit = async () => {
        if (await validator()) {
            // Clear the form fields after successful submission
            try {
                setIsLoading(true);
                const response = await axios.patch(url + user['@id'], {
                    username,
                    email,
                    lastName,
                    firstName,
                    phone2,
                    phone: whatsapp,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 10000,
                });
                const userData = response.data;
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                dispatch(setUser(userData));
                Alert.alert("Succès", "Vos informations ont été mis à jour avec succès");
            } catch (error) {
                Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour de vos informations.");
            }
            setIsLoading(false);
            // Navigate to SuccessScreen
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={{ padding: 24, marginTop: 40 }}>
                <StyledTextInput
                    placeholder="Mail"
                    value={email}
                    onChangeText={setEmail}
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                        backgroundColor: '#F7F8F9',
                    }}
                />
                <StyledTextInput
                    placeholder="Nom"
                    value={lastName}
                    onChangeText={setLastName}
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                        backgroundColor: '#F7F8F9',
                    }}
                />
                <StyledTextInput
                    placeholder="Prénoms"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                    }}
                />
                <StyledTextInput
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChangeText={(value) => handleUsername(value) }
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                        backgroundColor: '#F7F8F9',
                    }}
                />
                <StyledTextInput
                    placeholder="Téléphone Whatsapp"
                    value={whatsapp}
                    onChangeText={setWhatsapp}
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                        backgroundColor: '#F7F8F9',
                    }}
                />
                <StyledTextInput
                    placeholder="Téléphone2"
                    value={phone2}
                    onChangeText={setPhone2}
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                        backgroundColor: '#F7F8F9',
                    }}
                />
                <Pressable
                    onPress={handleSubmit}
                    style={{
                        backgroundColor: '#48bb78', // bg-green-500
                        padding: 12,
                        marginTop: 64,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                >
                    {
                        isLoading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <Text style={{ color: 'white', textAlign: 'center' }}>Valider mes informations</Text>
                        )
                    }
                </Pressable>
            </View>
        </ScrollView>
    );
};


export default function FormScreen() {
    return (
        <Provider store={store}>
            <FormScreenApp />
        </Provider>
    );
};