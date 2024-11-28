import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '../components/Back'
import Formulaire from '../components/Formulaire'
import { ScrollView } from 'react-native'


const Infos = () => {
  return (

  
    <SafeAreaView>
        <ScrollView>
        <Formulaire/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Infos