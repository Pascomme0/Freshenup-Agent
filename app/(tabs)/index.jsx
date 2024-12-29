import {View, TouchableOpacity, Text, Image, ScrollView, FlatList, ActivityIndicator} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Link, router} from "expo-router";
import img from '../../assets/images/LOGO.png'
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome} from "@expo/vector-icons";
import {useRouter} from 'expo-router';
import {Provider, useSelector} from "react-redux";
import {store} from "@/app/store";
import {useEffect, useState} from "react";
import axios from "axios";
import {format} from 'date-fns';


function App() {
    const router = useRouter();
    const token = useSelector((state) => state.user.token);
    const [missions, setMissions] = useState([])
    const [missionsInProgress, setMissionsInProgress] = useState([])
    const [loading, setLoading] = useState(false);
    const url = "https://admin.freshen-up.net";

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal', // Autres options : 'currency', 'percent'
            minimumFractionDigits: 0, // Nombre minimum de décimales
            maximumFractionDigits: 0, // Nombre maximum de décimales
        }).format(number);
    }

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            const response = await axios.get(`${url}/api/attributions?status=VALIDATED&statusExecution=PENDING`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMissions(response.data['hydra:member']);
            const response2 = await axios.get(`${url}/api/attributions?status=VALIDATED&statusExecution=IN_PROGRESS`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMissionsInProgress(response2.data['hydra:member']);
            setLoading(false);
        }
        initialize()
    }, [])

    const handleDetail = (item) => {
        router.push({
            pathname: '../../Details',
            params: {
                att: JSON.stringify(item),
            },
        });
        // Ajouter la logique pour modifier les dates
    };

    const renderMission = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleDetail(item)}
            className='shadow-custom-dark flex flex-row items-center bg-white w-[340px] rounded-lg h-16 px-4 justify-between mb-4'
        >
            <View className='flex flex-row items-center gap-4'>
                <FontAwesome name='user' color="blue" size={24} />
                <View>
                    <Text className='text-[17px] pb-1'>{item.service}</Text>
                    <Text className='text-sm font-thin pb-1'>{`attribué le ${format(new Date(item?.validatedAt || new Date()), "dd/MM/yyyy")}`}</Text>
                </View>
            </View>
            <View>
                <Text className='text-red-600 text-[12px]'>Nouveau</Text>
            </View>
            <FontAwesome name='angle-right' color="gray" size={30} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className='h-screen bg-white'>
            <View className=' relative top-12'>
                <View className="justify-center items-center">
                    <Image
                        source={img}
                        className="w-32 h-32"
                    />
                </View>
                <View className='justify-center items-center mt-12'>
                    <View className='pt-8'>
                        <Text className='text-center text-lg font-black'>Mes contrats</Text>
                        <View className=' pt-6 flex flex-row gap-4'>
                            <TouchableOpacity onPress={() => router.push('/(tabs)')}
                                              className='bg-[#D5F1E1] px-4 h-10 justify-center w-30 rounded-lg'>
                                <Text className='text-black text-center items-center justify-center '>Nouveaux</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('../../ContratEnCours')}
                                              className='justify-center bg-[#1DA6F8] h-10 w-30 px-4 rounded-lg'>
                                <Text className='text-center items-center justify-center text-white'>En cours</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {loading && <ActivityIndicator color="blue" className="mt-5"/>}
                    <FlatList
                        data={missions}
                        renderItem={renderMission}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ marginTop: 16 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default function index() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

