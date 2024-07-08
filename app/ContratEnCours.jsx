import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import img from '../assets/images/react-logo.png'
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';


export default function ContratEnCours() {
  const router = useRouter();

  return (
    <SafeAreaView className='h-screen bg-white'>
      <View className=''> 
        <View className='justify-center items-center mt-12'>
          <View className='pt-8'>
            <Text className='text-center text-lg font-black'>Mes contrats</Text>
            <View className=' pt-6 flex flex-row gap-4'>
              <TouchableOpacity onPress={() => router.push('/(tabs)')} className='bg-[#D5F1E1] px-4 h-10 justify-center w-30 rounded-lg'>
                <Text className='text-black text-center items-center justify-center '>Nouveaux</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/../../ContratEnCours')} className='justify-center bg-[#1DA6F8] h-10 w-30 px-4 rounded-lg'>
                <Text className='text-center items-center justify-center text-white'>En cours</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className='mt-16'>
            <TouchableOpacity onPress={() => router.push('../../Details')}
              className='shadow-custom-dark flex flex-row items-center bg-white w-[340px] rounded-lg h-16 px-4 justify-between mb-4'>
              <View className='flex flex-row items-center gap-4'>
                <FontAwesome name='user' color="blue" size={24} />
                <View>
                  <Text className='text-[17px] pb-1'>Contrat babysitter</Text>
                  <Text className='text-sm font-thin pb-1'>attribué le 28/05/2023</Text>
                </View>
              </View>
                <View>
                  <Text className='text-gray-400 text-[12px]'>En cours...</Text>
                </View>
              <FontAwesome name='angle-right' color="gray" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../../Details')}
              className='shadow-custom-dark flex flex-row items-center bg-white w-[340px] rounded-lg h-16 px-4 justify-between mb-4'>
              <View className='flex flex-row items-center gap-4'>
                <FontAwesome name='user' color="blue" size={24} />
                <View>
                  <Text className='text-[17px] pb-1'>Contrat babysitter</Text>
                  <Text className='text-sm font-thin pb-1'>attribué le 28/05/2023</Text>
                </View>
              </View>
              <View>
              <Text className='text-gray-400 text-[12px]'>En cours...</Text>
                </View>
              <FontAwesome name='angle-right' color="gray" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../../Details')}
              className='shadow-custom-dark flex flex-row items-center bg-white w-[340px] rounded-lg h-16 px-4 justify-between mb-4'>
              <View className='flex flex-row items-center gap-4'>
                <FontAwesome name='user' color="blue" size={24} />
                <View>
                  <Text className='text-[17px] pb-1'>Contrat babysitter</Text>
                  <Text className='text-sm font-thin pb-1'>attribué le 28/05/2023</Text>
                </View>
              </View>
              <View>
              <Text className='text-gray-400 text-[12px]'>En cours...</Text>
                </View>
              <FontAwesome name='angle-right' color="gray" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../../Details')}
              className='shadow-custom-dark flex flex-row items-center bg-white w-[340px] rounded-lg h-16 px-4 justify-between mb-4'>
              <View className='flex flex-row items-center gap-4'>
                <FontAwesome name='user' color="blue" size={24} />
                <View>
                  <Text className='text-[17px] pb-1'>Contrat babysitter</Text>
                  <Text className='text-sm font-thin pb-1'>attribué le 28/05/2023</Text>
                </View>
              </View>  
              <View>
              <Text className='text-gray-400 text-[12px]'>En cours...</Text>
                </View>
              <FontAwesome name='angle-right' color="gray" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

