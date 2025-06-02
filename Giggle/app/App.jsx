import { Text, View, StyleSheet} from "react-native";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <View>
 <HomePage />
 <Header />
 <Footer />
 </View>
  );
}
const styles=StyleSheet.create({

})