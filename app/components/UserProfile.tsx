import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";


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
    drinkPreference: "A bit",
    seatPreference: "Standing",
    mosher: true,
    singalong: true,
    photographer: false,
    trustRating: 1.0,
    isVerified: true, //green tick next to username/pic later
  });
 

  return (
    <View style={styles.container}>
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
      <Text style={styles.interests}> Drink preference: {user.drinkPreference}</Text>
       <Text style={styles.interests}> Seat preference: {user.seatPreference}</Text>
        <Text style={styles.interests}> Mosher: {user.drinkPreference}</Text>
        <Text style={styles.interests}> Sing-a -long: {user.singalong}</Text>
        <Text style={styles.interests}> Photographer: {user.photographer}</Text>
        <Text style={styles.interests}> Trust Rating: {user.trustRating}</Text>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  avatar: {
    width: 75,
    height: 75,
    borderColor: "#252F40",
    borderWidth: 2,
    marginBottom: 10,
  },
  username: {
    fontSize: 10,
    fontWeight: "bold",
  },
  email: {
    fontSize: 10,
    color: "#555",
  },

  interests: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 10,
    marginTop: 4,
    paddingHorizontal: 20,
  },
});

export default UserProfile;