import { StyleSheet, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SearchEvents from "./components/SearchBar";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchEvents />
      <View style={styles.container}>
        <HomePage />
      </View>
      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
  },
});
