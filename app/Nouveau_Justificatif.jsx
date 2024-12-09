import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser} from "./userSlice";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store";
import {useRouter} from "expo-router";

const AddScreenApp = () => {
    const router = useRouter();
    const [type, setType] = useState('');
    const [number, setNumber] = useState('');
    const [recto, setRecto] = useState(null);
    const [verso, setVerso] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const url = 'https://admin.freshen-up.net';
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect( () => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url + '/api/type_pieces');
                const typePieces = response.data['hydra:member'];
                setItems(typePieces);
            } catch (error) {
                Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des types de pièces");
            }
            setIsLoading(false);
        }
        fetch();
    }, []);

    const pickImage = async (setImage) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, type, fileName } = {uri: result.assets[0].uri, type: result.assets[0].mimeType, fileName: result.assets[0].fileName};
            setImage({ uri, type, fileName });
        }
    };

    const handleSubmit = () => {
        if (!type || !number || !recto || !verso) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
        } else {
            const formData = new FormData();
            formData.append('typePiece', type);
            formData.append('number', number);

            const rectoData = new FormData();
            rectoData.append('imageFile', {
                uri: recto.uri,
                name: recto.fileName,
                type: recto.type
            });
            const versoData = new FormData();
            versoData.append('imageFile', {
                uri: verso.uri,
                name: verso.fileName,
                type: verso.type
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                timeout: 10000,
            };

            const addPiece = async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.post(url + '/api/pieces', formData, config);
                    const piece = response.data;
                    const pieceId = piece['@id'];
                    rectoData.append('piece', pieceId);
                    versoData.append('piece', pieceId);
                    const rectoresponse = await axios.post(url + '/api/image_pieces', rectoData, config);
                    const versoresponse = await axios.post(url + '/api/image_pieces', versoData, config);
                    const userResponse = await axios.get(url + '/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const userData = userResponse.data["hydra:member"][0];
                    await AsyncStorage.setItem('user', JSON.stringify(userData));
                    dispatch(setUser(userData));
                    router.push('/')
                } catch (error) {
                    console.log(error);
                    Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout du justificatif');
                }
                setIsLoading(false);
            };
            addPiece();
        }
    };

    return (
        <View style={isLoading ? {flex: 1,
            justifyContent: 'center',  // Centrage vertical
            alignItems: 'center',      // Centrage horizontal
            backgroundColor: '#f0f0f0'} : styles.container}>
            {isLoading ? (
                <View style={{justifyContent: "center", alignContent: 'center'}}>
                    <ActivityIndicator size="large" style={{alignSelf: "center"}} color="#00f" />
                </View>
            ) : (
                <View>
                    <Text style={styles.label}>Type de pièce :</Text>
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Sélectionner un type" value="" />
                        {items.map((piece) => (
                            <Picker.Item key={piece.code} label={piece.label} value={piece['@id']} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Numéro de pièce :</Text>
                    <TextInput
                        style={styles.input}
                        value={number}
                        onChangeText={setNumber}
                        placeholder="Entrez le numéro"
                    />

                    <Text style={styles.label}>Recto :</Text>
                    <TouchableOpacity onPress={() => pickImage(setRecto)}>
                        {recto ? (
                            <Image source={{ uri: recto.uri }} style={styles.image} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text>Choisir une image</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.label}>Verso :</Text>
                    <TouchableOpacity onPress={() => pickImage(setVerso)}>
                        {verso ? (
                            <Image source={{ uri: verso.uri }} style={styles.image} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text>Choisir une image</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Button title="Ajouter" onPress={handleSubmit} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        height: 70,
        marginBottom: 20,
        borderStyle: 'solid 1px #ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 128,
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: '100%',
        height: 128,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default function AddScreen() {
    return (
        <Provider store={store}>
            <AddScreenApp />
        </Provider>
    );
};