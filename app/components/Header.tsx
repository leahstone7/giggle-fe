import { useFonts } from "expo-font";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

function Header() {
  const [fontsLoaded] = useFonts({
    Merriweather: require("../assets/fonts/Merriweather/Merriweather/Merriweather.ttf" )
  });

  return (
  <ImageBackground
      source={require("../assets/images/giggle-logo.png")}
      style={styles.headerContainer}
      resizeMode="cover"
    >
    </ImageBackground>
  )
}
export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  header: {
    padding: 10,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 36,
    fontFamily: "Playwrite",
    color: "#fff",
  },
})
