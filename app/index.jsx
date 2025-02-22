// index.jsx
import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as ImagePicker from 'expo-image-picker';
import {Link, useRouter} from 'expo-router';
import {Provider, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img from '../assets/images/LOGO.png';
import {store} from './store';
import {setUser, setToken} from './userSlice';
import * as Notifications from "expo-notifications";

function App() {
    const router = useRouter();
    const url = "https://admin.freshen-up.net"
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        username: '',
        email: '',
        nom: '',
        prenoms: '',
        telephone: '',
        phone2: '',
        password: '',
        confirmPassword: '',
    });
    const [form2, setForm2] = useState({
        username: '',
        password: '',
    });
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [images, setImages] = useState({
        recto: null,
        verso: null,
        profile: null,
    });
    const [page, setPage] = useState('LOGIN');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const initializeApp = async () => {
            const credentials = await AsyncStorage.getItem('credentials');
            if (credentials) {
                const {username, password, token} = JSON.parse(credentials);
                dispatch(setToken(token));
                await handleBiometricAuth({username, password, token});
            }
        };

        const checkBiometricSupport = async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        };

        initializeApp();
        checkBiometricSupport();
    }, []);

    const handleBiometricAuth = async (credentials) => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            return setPage('LOGIN');
        }

        const {success} = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
            fallbackLabel: 'Enter Password',
        });

        if (success) {
            await handleLogin(credentials.username, credentials.password);
        } else {
            setPage('LOGIN');
        }
    };

    const registerForPushNotificationsAsync = async (token) => {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        try {
            const tokenExpo = (await Notifications.getExpoPushTokenAsync()).data;
            const response = await axios.post("https://admin.freshen-up.net/api/users/set_expo_token", {
                expoPushToken: tokenExpo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        } catch (e) {
            Alert.alert("Erreur", "une erreur s'est produite")
        }

    };


    const handleLogin = async (username, password, isNew = false) => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://admin.freshen-up.net/api/login', {
                username,
                password,
            });
            const token = response.data.token;
            dispatch(setToken(token));

            const userResponse = await axios.get('https://admin.freshen-up.net/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = userResponse.data["hydra:member"][0];
            if (userData.typeUser.code !== "AGENT") {
                Alert.alert("Erreur", "Accès interdit")
            } else {
                await AsyncStorage.setItem('credentials', JSON.stringify({username, password, token}));
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                dispatch(setUser(userData));
                dispatch(setToken(token));
                if (isNew) {
                    await registerForPushNotificationsAsync(token);
                }
                router.replace('/(tabs)');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Identifiants invalides');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpTest = async (username, password, otp) => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://admin.freshen-up.net/api/users/confirm_phone', {
                'username': username,
                'code': otp,
            });
            const token = response.data.token;
            dispatch(setToken(token));

            const userResponse = await axios.get('https://admin.freshen-up.net/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = userResponse.data["hydra:member"][0];
            await AsyncStorage.setItem('credentials', JSON.stringify({username, password, token}));
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser(userData));
            await registerForPushNotificationsAsync(token);
            // Rediriger vers /(tabs)
            router.push('/(tabs)');
        } catch (error) {
            Alert.alert('Erreur', 'Identifiants invalides');
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendOtp = async (username) => {
        setIsLoading(true);
        try {
            await axios.post('https://admin.freshen-up.net/api/users/send_email_verify_code', {
                'username': username,
            });
            Alert.alert('Succès', 'Code envoyé avec succès');
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur s\'est produite');
        } finally {
            setIsLoading(false);
        }
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

    const handleInputChange = (name, value) => {
        if (name === 'username' && /\s/.test(value)) {
            Alert.alert("Erreur", "Le nom d'utilisateur ne doit pas contenir d'espaces.");
            return;
        }
        setForm({...form, [name]: value});
    };

    const handleOTPChange = (value) => {
        setOtp(value);
    }

    const handleInputLoginChange = (name, value) => {
        setForm2({...form2, [name]: value});
    };

    const pickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (!result.canceled) {
            setImages({...images, [type]: result.assets[0].uri});
        }
    };

    const handleFinish = async () => {
        setIsLoading(true);
        try {
            await axios.post('https://admin.freshen-up.net/api/users', {
                'username': form.username,
                'email': form.email,
                'plainPassword': form.password,
                'phone': form.telephone,
                'phone2': form.phone2,
                'firstName': form.prenoms,
                'lastName': form.nom,
                'typeUser': "/api/type_users/2"
            });
            setPage('OTP');
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur s\'est produite dans le traitement');
        } finally {
            setIsLoading(false);
        }
    };

    const validateStep = async () => {
        switch (step) {
            case 1:
                setIsLoading(true);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(form.email)) {
                    Alert.alert("Erreur", 'Veuillez entrer une adresse email valide.');
                    setIsLoading(false);
                    return false;
                }
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(form.telephone)) {
                    Alert.alert("Erreur", 'Veuillez entrer un numéro de téléphone valide');
                    setIsLoading(false);
                    return false;
                }
                if (!form.username) {
                    Alert.alert("Erreur", 'Tous les champs sont requis');
                    setIsLoading(false);
                    return false;
                }
                if (await verifyUnicity({email: form.email})) {
                    setIsLoading(false);
                    return false;
                }
                if (await verifyUnicity({username: form.username})) {
                    setIsLoading(false);
                    return false;
                }
                if (await verifyUnicity({phone: form.telephone})) {
                    setIsLoading(false);
                    return false;
                }
                if (form.phone2 && await verifyUnicity({phone: form.telephone})) {
                    setIsLoading(false);
                    return false;
                }
                setIsLoading(false);
                return true;

            case 2:
                if (form.password !== form.confirmPassword) {
                    Alert.alert("Erreur", 'Les mots de passe doivent être identiques');
                    return false;
                }
                if (!form.nom || !form.prenoms || !form.password) {
                    Alert.alert("Erreur", 'Tous les champs sont requis');
                    return false;
                }
                return true;

            default:
                return false;
        }
    };


    const handlePage = (value) => {
        setPage(value);
    };

    const handleNextStep = async () => {
        if (await validateStep()) {
            setStep(step + 1);
        }
    };

    const renderStepContent = () => {
        const inputStyle = {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: 56,
            fontSize: 16,
            backgroundColor: '#E8ECF4',
        };

        switch (step) {
            case 1:
                return (
                    <View>
                        <TextInput placeholder="Nom d'utilisateur" style={inputStyle} value={form.username}
                                   onChangeText={(value) => handleInputChange('username', value)}/>
                        <TextInput placeholder="Email" style={inputStyle} value={form.email}
                                   onChangeText={(value) => handleInputChange('email', value)}/>
                        <TextInput placeholder="Téléphone" style={inputStyle} keyboardType="phone-pad"
                                   value={form.telephone}
                                   onChangeText={(value) => handleInputChange('telephone', value)}/>
                        <TextInput placeholder="Téléphone 2" style={inputStyle} keyboardType="phone-pad"
                                   value={form.phone2} onChangeText={(value) => handleInputChange('phone2', value)}/>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <TextInput placeholder="Nom" style={inputStyle} value={form.nom}
                                   onChangeText={(value) => handleInputChange('nom', value)}/>
                        <TextInput placeholder="Prénoms" style={inputStyle} value={form.prenoms}
                                   onChangeText={(value) => handleInputChange('prenoms', value)}/>
                        <TextInput placeholder="Mot de Passe" style={inputStyle} value={form.password}
                                   secureTextEntry={true}
                                   onChangeText={(value) => handleInputChange('password', value)}/>
                        <TextInput placeholder="Confirmer mot de passe" style={inputStyle} value={form.confirmPassword}
                                   secureTextEntry={true}
                                   onChangeText={(value) => handleInputChange('confirmPassword', value)}/>
                    </View>
                );
            default:
                return null;
        }
    };

    const renderLoginPage = () => {
        const inputStyle = {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: 56,
            fontSize: 16,
            backgroundColor: '#E8ECF4',
        };
        return (
            <View>
                <TextInput placeholder="Nom d'utilisateur" style={inputStyle} value={form2.username}
                           onChangeText={(value) => handleInputLoginChange('username', value)}/>
                <TextInput placeholder="Mot de passe" style={inputStyle} value={form2.password}
                           onChangeText={(value) => handleInputLoginChange('password', value)} secureTextEntry={true}/>
            </View>
        );
    };

    const renderOTPPage = () => {
        const inputStyle = {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: 56,
            fontSize: 16,
            backgroundColor: '#E8ECF4',
            textAlign: 'center',
        };
        return (
            <View>
                <TextInput
                    placeholder="Entrez votre code"
                    style={inputStyle}
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={(value) => handleOTPChange(value)}
                />
            </View>
        );
    };

    async function handleCancel(username) {
        setIsLoading(true);
        try {
            const response = await axios.post('https://admin.freshen-up.net/api/users/cancel', {
                'username': username
            });

            setStep(1);
            handlePage('REGISTER');
        } catch (error) {
            Alert.alert('Erreur', "Une erreur s'est produite vérifier votre connexion internet");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <ScrollView style={{width: '100%', paddingHorizontal: 16}}>
                <View style={{alignItems: 'center', marginVertical: 16}}>
                    <Image source={img} style={{height: 100, width: 120}} resizeMode="contain"/>
                </View>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 24
                }}>{page === 'LOGIN' ? 'Connexion' : page === 'REGISTER' ? 'Inscription' : 'Verification'}</Text>
                {page === 'REGISTER' ? (
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 24}}>
                        {[1, 2].map((item) => (
                            <View
                                key={item}
                                style={{
                                    height: 32,
                                    width: 32,
                                    borderRadius: 16,
                                    backgroundColor: item === step ? '#007AFF' : '#ccc',
                                    marginHorizontal: 4,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item}</Text>
                            </View>
                        ))}
                    </View>
                ) : (page === 'LOGIN' ? (
                    <Text style={{textAlign: 'center', marginBottom: 24}}>entrez vos identifiants</Text>
                ) : (
                    <View>
                        <Text style={{textAlign: 'center', marginBottom: 24}}>
                            Un code a été par sms au {form.telephone}, Ce n'est pas le votre ? <Text style={{color: '#007AFF', fontWeight: 'bold'}}
                                                                                                     onPress={() => handleCancel(form.username)}>
                            Modifier mon numéro
                        </Text>
                        </Text>
                    </View>
                    )
                    )}
                {page === 'LOGIN' ? renderLoginPage() : page === 'OTP' ? renderOTPPage() : renderStepContent()}
                {page === 'REGISTER' ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: step === 1 ? 'center' : 'space-between',
                            width: '100%',
                            marginBottom: 24,
                        }}
                    >
                        {step > 1 && (
                            <TouchableOpacity onPress={() => setStep(step - 1)} style={{
                                backgroundColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                width: 96
                            }}>
                                <Text style={{textAlign: 'center'}}>Retour</Text>
                            </TouchableOpacity>
                        )}
                        {step < 2 ? (
                            <TouchableOpacity onPress={handleNextStep} style={{
                                backgroundColor: '#007AFF',
                                borderRadius: 5,
                                padding: 10,
                                width: 96
                            }}>
                                {isLoading ? <ActivityIndicator color="#fff"/> :
                                    <Text style={{textAlign: 'center', color: 'white'}}>Suivant</Text>}
                            </TouchableOpacity>
                        ) : (
                            // <Link replace href="/(tabs)" asChild>
                            //
                            // </Link>
                            <TouchableOpacity onPress={handleFinish} style={{
                                backgroundColor: '#28a745',
                                borderRadius: 5,
                                padding: 10,
                                width: 96
                            }}>
                                {isLoading ? <ActivityIndicator color="#fff"/> :
                                    <Text style={{textAlign: 'center', color: 'white'}}>Terminer</Text>}
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (page === 'OTP' ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    width: '100%',
                                    marginBottom: 24,
                                }}
                            >
                                <TouchableOpacity onPress={() => handleOtpTest(form.username, form.password, otp)} style={{
                                    backgroundColor: '#28a745',
                                    borderRadius: 5,
                                    padding: 10,
                                    width: 150,
                                    marginTop: 15
                                }}>
                                    {isLoading ? <ActivityIndicator color="#fff"/> :
                                        <Text style={{textAlign: 'center', color: 'white'}}>Confirmer</Text>}
                                </TouchableOpacity>
                            </View>
                        ) :
                        (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    width: '100%',
                                    marginBottom: 24,
                                }}
                            >
                                <TouchableOpacity onPress={() => handleLogin(form2.username, form2.password, true)}
                                                  style={{
                                                      backgroundColor: '#28a745',
                                                      borderRadius: 5,
                                                      padding: 10,
                                                      width: 150,
                                                      marginTop: 15
                                                  }}>
                                    {isLoading ? <ActivityIndicator color="#fff"/> :
                                        <Text style={{textAlign: 'center', color: 'white'}}>Se connecter</Text>}
                                </TouchableOpacity>
                            </View>
                        )
                )}
                {
                    page === 'OTP' ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '100%',
                                marginBottom: 24,
                            }}
                        >
                            <Text style={{color: '#007AFF', fontWeight: 'bold'}}
                                  onPress={() => handleResendOtp(form.username)}>
                                Renvoyer le code
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '100%',
                                marginBottom: 24,
                            }}
                        >
                            <Text style={{color: page === 'REGISTER' ? '#007AFF' : '#000', fontWeight: 'bold'}}
                                  onPress={() => handlePage('LOGIN')}>
                                Connexion
                            </Text>
                            <Text style={{marginHorizontal: 16}}>•</Text>
                            <Text style={{color: page === 'LOGIN' ? '#007AFF' : '#000', fontWeight: 'bold'}}
                                  onPress={() => handlePage('REGISTER')}>
                                Inscription
                            </Text>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default function Root() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}