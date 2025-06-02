import { Text, View, StyleSheet} from "react-native";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
  <View style={styles.container}>
 <Header />
 <View style={styles.container}> 
 <HomePage/>
</View>
 <Footer/>
 </View>
  );
}
const styles=StyleSheet.create({
container: {
  justifyContent: 'flex-end',
  alignItems: 'center',
  flex: 1
}
})