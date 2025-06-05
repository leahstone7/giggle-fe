import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


function UserProfile() {
  const [user, setUser] = useState({
    firstName: "Mr",
    lastName: "Giggle",
    username: "giggleFan",
    emailAddress: "giggleFan@gmail.com",
    dateOfBirth: "1949-09-23",
    location: "London, NW 123",
    gender: "Male",
    profilePicture: "https://robohash.org/mail@ashallendesign.co.uk",
    concertInterests: "dancing, close to front, get there early",
    drinkPreference: "A bit",
    seatPreference: "Standing",
    mosher: true,
    singalong: true,
    photographer: false,
    trustRating: 1.0,
    isVerified: true,
  });



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
      <Text style={styles.username}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.emailAddress}</Text>
       <Text style={styles.email}>{user.location}</Text>
      <Text style={styles.username}> {user.dateOfBirth}</Text>
       <Text style={styles.email}>{user.gender}</Text>
      <Text style={styles.email}>Concert Preferences:</Text>
      <Text > Drink preference: {user.drinkPreference}</Text>
       <Text > Seat preference: {user.seatPreference}</Text>
      <Text> Mosher: {user.drinkPreference}</Text>
      <TouchableOpacity onPress={() => alert("open settings")}>
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
    backgroundColor: "#ffffff",
   
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
  email: {
    fontSize: 16,
    color: "#666",
  }
});
export default UserProfile;
