import React from "react"
import {View, Text, StyleSheet, TouchableOpacity, Linking} from "react-native"

function Footer() {
function openUrl(){
  Linking.openURL(url)
}

  return (
    <View style={styles.footer}>
 <Text>{new Date().getFullYear()} Giggle. All rights reserved.</Text>
 <TouchableOpacity onPress={() => openUrl('https://example.com')}>
  <Text> Privacy Notice </Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => openUrl('https://example.com')}>
  <Text> Find us on Instagram </Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => openUrl('https://example.com')}>
  <Text> Find us on Facebook </Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => openUrl('https://example.com')}>
  <Text> Find us on LinkedIn</Text>
 </TouchableOpacity>
  </View>
)
}
export default Footer
const styles=StyleSheet.create({
  footer:{

  }
})