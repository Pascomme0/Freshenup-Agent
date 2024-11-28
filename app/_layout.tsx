import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen name="Details" options={{ headerShown: true,headerShadowVisible: false,title: 'Détails contrat',headerTitleAlign: 'center',headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Infos" options={{ headerShown: true,headerShadowVisible: false,title: 'Mon profile',headerTitleAlign: 'center',headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="ContratEnCours" options={{ headerShown: true,headerShadowVisible: false,title: 'Contrat en cours',headerTitleAlign: 'center',headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="ValiderContrat" options={{ headerShown: true,headerShadowVisible: false,title: 'Détails contrat',headerTitleAlign: 'center',headerTitleStyle: { fontWeight: 'bold' } }} />
    </Stack>
  );
}
