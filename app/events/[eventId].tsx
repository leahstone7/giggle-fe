import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function EventDetails() {

    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>Event details: {id}</Text>
    </View>
  )
}