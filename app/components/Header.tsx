import { useFonts } from "expo-font";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function Header() {
  const [fontsLoaded] = useFonts({
    Playwrite: require("../assets/fonts/Playwrite_HU/PlaywriteFont.ttf"),
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/giggle-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.headerTitle}>Giggle</Text>
    </View>
  );
}
export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#bdfcc9",
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    margin: 15,
    padding: 30,
  },
  headerTitle: {
    fontSize: 40,
    marginRight: 10,
    fontFamily: "Playwrite",
  },
  logo: {
    width: 150,
    height: 75,
  },
  logoContainer: {
    flexDirection: "column",
    position: "absolute",
    top: 20,
    right: 20,
  },
});
