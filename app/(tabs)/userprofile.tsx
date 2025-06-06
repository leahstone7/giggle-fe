import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

  const [isEditing, setIsEditing] = useState(false);

  const trueFalse = (value) => (value ? "Yes" : "No");

  const birthYear = new Date(user.dateOfBirth).getFullYear();

  function handleChange(key, value) {
    setUser((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image
            style={styles.avatar}
            resizeMode="contain"
            source={{
              uri: user.profilePicture,
            }}
          />
          <View style={styles.personalInfo}>
            {isEditing ? (
              <>
                <Text>Edit your profile here...</Text>
                <TextInput
                  style={styles.input}
                  value={user.firstName}
                  onChangeText={(text) => handleChange("firstName", text)}
                />
                <TextInput
                  style={styles.input}
                  value={user.lastName}
                  onChangeText={(text) => handleChange("lastName", text)}
                />
                <TextInput
                  style={styles.input}
                  value={user.username}
                  onChangeText={(text) => handleChange("username", text)}
                />
                <TextInput
                  style={styles.input}
                  value={user.emailAddress}
                  onChangeText={(text) => handleChange("emailAddress", text)}
                />
                <TextInput
                  style={styles.input}
                  value={user.location}
                  onChangeText={(text) => handleChange("location", text)}
                />
                <TextInput
                  style={styles.input}
                  value={user.dateOfBirth}
                  onChangeText={(text) => handleChange("dateOfBirth", text)}
                />
                <TextInput
                  style={styles.input}
                  value={user.gender}
                  onChangeText={(text) => handleChange("gender", text)}
                />
              </>
            ) : (
              <>
                <Text style={styles.username}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.text}>{user.emailAddress}</Text>
                <Text style={styles.text}>{user.location}</Text>
                <Text style={styles.text}> Born in: {birthYear}</Text>
                <Text style={styles.text}>{user.gender}</Text>
                <TouchableOpacity
                  onPress={() => setIsEditing(!isEditing)}
                  style={styles.button}
                >
                  {isEditing ? "Save" : "Edit Profile"}
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.preferences}>
            <Text style={styles.title}>Concert Preferences:</Text>
            <Text style={styles.text}>
              {" "}
              Drink alchohol: {user.drinkPreference}
            </Text>
            <Text style={styles.text}>
              {" "}
              Seat preference: {user.seatPreference}
            </Text>
            <Text style={styles.text}>
              {" "}
              Mosher: {trueFalse(user.drinkPreference)}
            </Text>
            <Text style={styles.text}>
              {" "}
              Singalong: {trueFalse(user.singalong)}
            </Text>
            <Text style={styles.text}>
              {" "}
              Photographer: {trueFalse(user.photographer)}
            </Text>
            <Text style={styles.text}>
              {" "}
              Trust Rating (/10): {user.trustRating}⋆
            </Text>
          </View>
        </ScrollView>
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
    justifyContent: "center",
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
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button: {
    borderRadius: 10,
    width: "50%",
    padding: 5,
    backgroundColor: "rgb(44, 131, 44)",
    alignItems: "center",
    fontWeight: "bold",
  },
  personalInfo: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(253, 252, 242)",
    justifyContent: "center",
    borderRadius: 30,
    width: "70%",
    marginBottom: 5,
  },
  preferences: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgb(253, 252, 242)",
    borderColor: "#228B22",
  },
  input: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
export default UserProfile;
