import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
function UserProfile() {
  const [user, setUser] = useState({
    firstName: "Mr",
    lastName: "Giggle",
    username: "giggleFan123",
    emailAddress: "giggleFan@gmail.com",
    dateOfBirth: "2025-09-23",
    location: "London, NW 123",
    gender: "Male",
    profilePicture: "https://robohash.org/mail@ashallendesign.co.uk",
    drinkPreference: "A bit",
    seatPreference: "Standing",
    mosher: true,
    singalong: true,
    photographer: false,
    trustRating: 8.4,
    isVerified: true,
  });
  const trueFalse = (value) => (value ? "Yes" : "No")
  const birthYear = new Date (user.dateOfBirth).getFullYear()
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
   <Image
        style={styles.avatar}
        resizeMode="contain"
        source={{
          uri: user.profilePicture,
        }}
      />
      <View style={styles.personalInfo}>
      <Text style={styles.username}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.text}>{user.emailAddress}</Text>
       <Text style={styles.text}>{user.location}</Text>
      <Text style={styles.text}> Born in: {birthYear}</Text>
       <Text style={styles.text}>{user.gender}</Text>
      </View>
        <View style={styles.preferences}>
      <Text style={styles.title}>Concert Preferences:</Text>
      <Text style={styles.text}> Drink alchohol: {user.drinkPreference}</Text>
       <Text style={styles.text}> Seat preference: {user.seatPreference}</Text>
      <Text style={styles.text}> Mosher: {trueFalse(user.drinkPreference)}</Text>
      <Text style={styles.text}> Singalong: {trueFalse(user.singalong)}</Text>
      <Text style={styles.text}> Photographer: {trueFalse(user.photographer)}</Text>
      <Text style={styles.text}> Trust Rating (/10): {user.trustRating}⋆</Text>
        </View>
      <TouchableOpacity onPress={() => navigation.navigate("settings")} style={styles.button}>
      Settings
      </TouchableOpacity>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
  },
  avatar: {
    width: 150,
    height: 150,
    borderColor: "#252F40",
    borderWidth: 3,
    borderRadius: 75,
    marginBottom: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    padding: 10
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "rgb(81, 147, 217)",
  },
  personalInfo: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3,
    width: "70%",
    marginBottom: 5
  },
  preferences: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  }
});
export default UserProfile;