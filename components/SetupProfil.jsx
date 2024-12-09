// IncompleteInfoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { store } from '../app/store';
import { setUser, setToken } from '../app/userSlice';
import * as Updates from 'expo-updates';

const ProfilSections = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const restartApp = async () => {
    if (Updates.reloadAsync) {
      await Updates.reloadAsync(); // Redémarre complètement l'application
    } else {
      console.log('Updates API not available.');
    }
  };
  const goToHome = (navigation) => {
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Root' }], // 'Home' est le nom de votre écran initial
        })
    );
  }
  const quitterApp = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Quitter",
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(setUser(null));
            dispatch(setToken(null));
            await restartApp();
            // goToHome(navigation)
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => router.push('/Infos')}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <FontAwesome name="user" size={24} color="skyblue" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Informations personnelles</Text>
              <Text style={styles.subtitle}>informations incomplètes</Text>
            </View>
            <View>
              <FontAwesome name="angle-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Service')}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <FontAwesome name="user" size={24} color="skyblue" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Mes services</Text>
              <Text style={styles.subtitle}>Mettez à jours vos services</Text>
            </View>
            <View>
              <FontAwesome name="angle-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Justificatifs')}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <FontAwesome name="user" size={24} color="skyblue" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Mon Compte</Text>
              <Text style={styles.subtitle}>vérifier votre statut</Text>
            </View>
            <View style={styles.warningIcon}>
              <FontAwesome name="exclamation" size={24} color="red" light />
            </View>
            <View>
              <FontAwesome name="angle-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => router.push('/ProfilePages/SuiviCom')}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <FontAwesome name="shopping-cart" size={24} color="skyblue" thin />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Mes commandes</Text>
              <Text style={styles.subtitle}>Suivez le parcours de vos composants</Text>
            </View>
            <View>
              <FontAwesome name="angle-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity> */}
        
        <TouchableOpacity onPress={quitterApp}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <FontAwesome name="sign-out" size={24} color="skyblue" thin />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Se déconnecter</Text>
              <Text style={styles.subtitle}>Déconnecter ce compte</Text>
            </View>
            <View>
              <FontAwesome name="angle-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    backgroundColor: 'white',
  },
  innerContainer: {
    marginTop: 24,
    height: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 8,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 14,
  },
  warningIcon: {
    marginRight: 40,
  },
});

export default ProfilSections;