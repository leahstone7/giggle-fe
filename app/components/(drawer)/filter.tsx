import { View, Text } from 'react-native'
import React from 'react'

import { TouchableOpacity } from 'react-native'

export default function FilterBtn() {
  return (
        <View style = {{
          borderWidth: 1,
          backgroundColor:'#ccd5ae',
          padding: 6,
          borderColor: "#ccc",
          width: 100
    
        }}>
        <TouchableOpacity>
          <Text>Filter By</Text>
        </TouchableOpacity>
            
          
        </View>
  )
}