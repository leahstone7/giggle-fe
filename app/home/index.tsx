import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Footer from "../Footer";
import Header from "../Header";
import SearchBar from "../SearchBar";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
});
