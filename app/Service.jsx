// ServicePage.js
import React, { useEffect, useState } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { setServices, toggleService, setSelectedServices } from './serviceSlice';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Pressable,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {store} from "./store";
import Checkbox from 'expo-checkbox'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser} from "./userSlice";
// import CheckBox from '@react-native-community/checkbox';


const ServiceApp = () => {
    const [isChecked, setChecked] = useState(false);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 16,
            marginVertical: 32,
        },
        section: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        paragraph: {
            fontSize: 15,
        },
        checkbox: {
            margin: 8,
        },
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const url = 'https://admin.freshen-up.net';
    const services = useSelector(state => state.service.services);
    const selectedServices = useSelector(state => state.service.selectedServices);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // const navigation = useNavigation();

    useEffect(() => {
        // Fetch services from API and update the store
        const fetchServices = async () => {
            try {
                const response = await fetch(url + '/api/services');
                const data = await response.json();
                dispatch(setServices(data["hydra:member"]));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
        dispatch(setSelectedServices(user?.services.map(service => service['@id'])));
    }, [dispatch]);

    useEffect(() => {
        setIsButtonDisabled(selectedServices.length === 0);
    }, [selectedServices]);

    const handleServiceToggle = (serviceId) => {
        dispatch(toggleService(serviceId));
    };

    const handleUpdateServices = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(url + user['@id'], {
                services: selectedServices,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                timeout: 10000,
            });
            const userData = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser(userData));
            Alert.alert("Succès", "Vos services ont été mis à jour avec succès");
        } catch (error) {
            Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour de vos services");
        }
        setIsLoading(false);
    };

    return (
        <View>

            <FlatList
                style={{
                    marginHorizontal: 16,
                    marginVertical: 32,
                }}
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.section}>
                        <Checkbox
                            style={styles.checkbox}
                            value={selectedServices.includes(item['@id'])}
                            onValueChange={() => handleServiceToggle(item['@id'])}
                            color={isChecked ? '#4630EB' : undefined}
                        />
                        <Text style={styles.paragraph}>{item.label}</Text>
                    </View>
                )}
            />
            <View style={{
                alignItems: 'center'
            }}>
                <Pressable
                    onPress={handleUpdateServices}
                    style={{
                        backgroundColor: '#48bb78', // bg-green-500
                        padding: 12,
                        marginTop: 64,
                        borderRadius: 8,
                        width: '50%',
                        alignItems: 'center',
                    }}
                    disabled={isButtonDisabled}
                >
                    {
                        isLoading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <Text style={{ color: 'white', textAlign: 'center' }}>Mettre à jour mes service</Text>
                        )
                    }
                </Pressable>
            </View>
        </View>
    );
};

export default function Service() {
    return (
        <Provider store={store}>
            <ServiceApp />
        </Provider>
    );
};