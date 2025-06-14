import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader({size ="small"}) {
  return (
    <View
    style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}
    >
     <ActivityIndicator size={'small'} />
    </View>
  )
}