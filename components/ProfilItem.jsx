import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const ProfilItem = () => {
  return (
    <View className='mt-16 flex-1'>
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
                <Text className='text-red-600 text-[12px]'>Nouveau</Text>
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
                <Text className='text-red-600 text-[12px]'>Nouveau</Text>
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
                <Text className='text-red-600 text-[12px]'>Nouveau</Text>
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
                <Text className='text-red-600 text-[12px]'>Nouveau</Text>
              </View>
              <FontAwesome name='angle-right' color="gray" size={30} />
            </TouchableOpacity>
          </View>
  )
}

export default ProfilItem