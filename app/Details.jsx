import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    Alert
} from 'react-native';
import {styled} from 'nativewind';
import {useRouter, useLocalSearchParams, router} from 'expo-router';
import {format} from 'date-fns';
import {Provider, useSelector} from "react-redux";
import {store} from "./store";
import Back from "../components/Back";
import axios from "axios";

const url = "https://admin.freshen-up.net";

// Composants stylés
const ProductCard = styled(TouchableOpacity, 'flex-row items-center rounded-lg shadow-md py-4 mb-4');
const ProductImage = styled(Image, 'w-20 h-20 rounded-md');
const ProductInfo = styled(View, 'flex-1 mr-2');
const ProductName = styled(Text, 'text-md font-bold');
const ProductPrice = styled(Text, 'text-[12px] text-gray-600 py-1');

// Page pour afficher les détails de la commande
function DetailComServiceApp() {
    const {att} = useLocalSearchParams(); // Récupère les paramètres depuis l'URL
    const [loading, setLoading] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingClose, setLoadingClose] = useState(false);
    // const [attribution, setAttribution] = useState(att ? JSON.parse(att) : {});
    const [parsedCmd, setParsedCmd] = useState(attribution?.document);
    const token = useSelector((state) => state.user.token);

    // Désérialisation de l'objet cmd
    let attribution = {};
    try {
        attribution = att ? JSON.parse(att) : {};
    } catch (error) {
        console.error("Erreur lors de la désérialisation de cmd :", error);
        return <Text>Erreur lors du chargement de la commande.</Text>;
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };


    const handleAccept = async () => {
        setLoadingAccept(true);
        try {
            let response = "";
            response = await axios.get(`${url}${attribution['@id']}/init`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert("Succès", "Traitement initié")
            router.push('/ContratEnCours')
        } catch (AxiosError) {
            Alert.alert('Erreur', "Erreur lors de l'initiation");
        } finally {
            setLoadingAccept(false);
        }
    };

    const handleClose = async () => {
        setLoadingClose(true);
        try {
            let response = "";
            response = await axios.get(`${url}${attribution['@id']}/close`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert("Succès", "Traitement Exécuté avec succès")
            router.push('/(tabs)')
        } catch (AxiosError) {
            Alert.alert('Erreur', "Erreur lors de la clôture");
        } finally {
            setLoadingClose(false);
        }
    };

    const handleCancel = async () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir annulée cette tâche ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Confirmer",
                    onPress: async () => {
                        setLoadingCancel(true);
                        try {
                            let response = "";
                            response = await axios.get(`${url}${attribution['@id']}/cancel`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            Alert.alert("Succès", "Tâche annulée");
                            router.push('/(tabs2)');
                        } catch (AxiosError) {
                            Alert.alert('Erreur', "Erreur lors de l'annulation");
                        } finally {
                            setLoadingAccept(false);
                        }
                    },
                },
            ]
        );
    };

    return loading ? (
        <SafeAreaView>
            <Back title="Détail de la commande"/>
            <ActivityIndicator size="large" color="blue"/>
        </SafeAreaView>
    ) : (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView className="p-4 bg-gray-100">
                {/* Détails de la commande */}
                <View className="flex flex-column justify-between mb-4">
                    <Text className="text-lg font-bold text-center mb-2">Commande N° {attribution?.document?.reference}</Text>
                    <Text className="text-md font-bold mb-2">Passée
                        le {format(new Date(attribution?.document?.date || new Date()), "dd/MM/yyyy")}</Text>
                    {attribution?.document?.dateRamassage && (<Text className="text-md font-bold mb-2">Date de
                        ramassage: {format(new Date(attribution?.document?.dateRamassage || new Date()), "dd/MM/yyyy")}</Text>)}
                    {attribution?.document?.dateService && (<Text className="text-md font-bold mb-2">Date de
                        service: {format(new Date(attribution?.document?.dateService || new Date()), "dd/MM/yyyy")}</Text>)}
                    {attribution?.document?.dateRetour && (<Text className="text-md font-bold mb-2">Date de
                        retour: {format(new Date(attribution?.document?.dateRetour || new Date()), "dd/MM/yyyy")}</Text>)}
                    {attribution?.document?.dateFinService && (<Text className="text-md font-bold mb-2">Date de fin
                        Service: {format(new Date(attribution?.document?.dateFinService || new Date()), "dd/MM/yyyy")}</Text>)}
                    {attribution?.document?.nbPieces && (<Text className="text-md font-bold mb-2">Nombre de pieces du
                        local: {attribution?.document.nbPieces}</Text>)}
                    {attribution?.document?.nbEnfants && (
                        <Text className="text-md font-bold mb-2">Nombre d'enfants: {attribution?.document.nbEnfants}</Text>)}
                    {attribution?.document?.ageEnfants && (
                        <Text className="text-md font-bold mb-2">Ages des enfants: {attribution?.document.ageEnfants}</Text>)}
                    {attribution?.document?.serviceEntreprise && (<Text className="text-md font-bold mb-2">Service
                        demandé: {attribution?.document.serviceEntreprise.label}</Text>)}
                    {(attribution?.document?.service['@id'] === "/api/services/10") && (
                        <Text className="text-md font-bold mb-2">La nounou dort elle chez vous?
                            : {(attribution?.document.atHome === 1) ? "Oui" : "Non"}</Text>)}
                    {attribution?.document?.joursDeService && (<Text className="text-md font-bold mb-2">Fréquence de travail
                        : {attribution?.document.joursDeService}</Text>)}
                    {(attribution?.document?.allDay != null) && (<Text className="text-md font-bold mb-2">Heure fixe?
                        : {(attribution?.document?.allDay) ? "Oui" : "Non"}</Text>)}
                    {attribution?.document?.heureDebutService && (<Text className="text-md font-bold mb-2">Date de debut de la
                        journée: {format(new Date(attribution?.document?.heureDebutService || new Date()), "HH:mm")}</Text>)}
                    {attribution?.document?.heureFinService && (<Text className="text-md font-bold mb-2">Date de fin de la
                        journée: {format(new Date(attribution?.document?.heureFinService || new Date()), "HH:mm")}</Text>)}
                    {attribution?.document?.adresse && (<Text
                        className="text-md font-bold mb-2">Adresse: {attribution?.document.adresse.commune.label} - {attribution?.document.adresse.description}</Text>)}
                    {attribution?.document?.description && (
                        <Text className="text-md font-bold mb-2">Description: {attribution?.document.description}</Text>)}
                </View>

                {/* Produits de la commande */}
                {attribution?.document?.detailDocuments?.map((dd) => (
                    <ProductCard key={dd.id}>
                        <ProductImage source={{uri: url + dd?.produit?.imageProduits[0]?.path}}/>
                        <View className="flex-column ml-4">
                            <ProductInfo>
                                <ProductName>{dd?.produit?.libelle}</ProductName>
                                <ProductPrice>Quantité: {dd?.quantity}</ProductPrice>
                            </ProductInfo>
                        </View>
                    </ProductCard>
                ))}

                <View className="flex flex-column mt-2">
                    <Text className="text-lg font-bold text-center mb-3">Information client</Text>
                    <View className="flex flex-row justify-center mb-2">
                        <ProductImage source={attribution?.document?.client?.profileImagePath ? { uri: url + attribution?.document?.client?.profileImagePath } : { uri: 'https://ui-avatars.com/api?background=random&name=' + attribution?.document?.client?.firstName + '+' + attribution?.document?.client?.lastName }}/>
                    </View>
                    <View className="flex flex-row justify-between mb-2">
                        <Text className="text-lg font-bold ">Prénoms</Text>
                        <Text className="">{attribution?.document?.client?.firstName}</Text>
                    </View>
                    <View className="flex flex-row justify-between mb-2">
                        <Text className="text-lg font-bold ">Nom</Text>
                        <Text className="">{attribution?.document?.client?.lastName}</Text>
                    </View>
                    <View className="flex flex-row justify-between mb-2">
                        <Text className="text-lg font-bold ">Email</Text>
                        <Text className="">{attribution?.document?.client?.email}</Text>
                    </View>
                    <View className="flex flex-row justify-between mb-2">
                        <Text className="text-lg font-bold ">Téléphone</Text>
                        <Text className="">{attribution?.document?.client?.phone}</Text>
                    </View>
                </View>

                {/* Boutons */}
                <View className="flex flex-row justify-around mt-8 mb-8">
                    {
                        (attribution.statut === "VALIDATED" && attribution.statusExecution === "PENDING") && (
                            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-md" onPress={handleAccept}>
                                {loadingAccept ?( <ActivityIndicator size="small" color="white"/>) : (
                                    <Text className="text-white font-bold">Initier le traitement</Text>
                                )}
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-md" onPress={handleCancel}>
                        {loadingCancel ?( <ActivityIndicator size="small" color="white"/>) : (
                            <Text className="text-white font-bold">Annuler</Text>
                        )}
                    </TouchableOpacity>
                    {
                        (attribution.statut === "VALIDATED" && attribution.statusExecution === "IN_PROGRESS") && (
                            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-md" onPress={handleClose}>
                                {loadingClose ?( <ActivityIndicator size="small" color="white"/>) : (
                                    <Text className="text-white font-bold">Terminer le traitement</Text>
                                )}
                            </TouchableOpacity>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Composant exporté avec Redux
export default function DetailComService() {
    return (
        <Provider store={store}>
            <DetailComServiceApp/>
        </Provider>
    );
}
