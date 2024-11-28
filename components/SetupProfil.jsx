// IncompleteInfoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProfilSections = () => {
  const router = useRouter();
  const quitterApp = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment quitter l'application ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Quitter",
          onPress: () => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp();
            } else {
              Alert.alert(
                "Quitter l'application",
                "La fermeture d'application n'est pas supportée sur iOS. Veuillez utiliser le gestionnaire de tâches de votre appareil pour quitter l'application.",
                [{ text: "OK" }]
              );
            }
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