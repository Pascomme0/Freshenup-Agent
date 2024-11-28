// app/FormScreen.js
import React, { useState } from 'react';
import { View, TextInput, Alert, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';

const StyledTextInput = styled(TextInput);

const FormScreen = () => {
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const router = useRouter();

    const handleSubmit = () => {
        if (email && lastName && firstName && city && address && whatsapp) {
            Alert.alert('Formulaire soumis avec succès');
            // Clear the form fields after successful submission
            setEmail('');
            setLastName('');
            setFirstName('');
            setCity('');
            setAddress('');
            setWhatsapp('');
            // Navigate to SuccessScreen
            router.push('/ProfilePages/Photo');
        } else {
            Alert.alert('Veuillez entrer toutes les informations');
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
                    placeholder="Ville"
                    value={city}
                    onChangeText={setCity}
                    style={{
                        borderColor: '#d1d5db', // border-gray-300
                        borderWidth: 1,
                        padding: 12,
                        marginVertical: 8,
                        backgroundColor: '#F7F8F9',
                    }}
                />
                <StyledTextInput
                    placeholder="Adresse"
                    value={address}
                    onChangeText={setAddress}
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
                    <Text style={{ color: 'white', textAlign: 'center' }}>Valider mes informations</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default FormScreen;