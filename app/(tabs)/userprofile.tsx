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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: "center" }}>
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
                  <TouchableOpacity
                    onPress={() => setIsEditing(false)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.username}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text style={styles.username}>{user.username}</Text>
                  <Text style={styles.text}>{user.emailAddress}</Text>
                  <Text style={styles.text}>{user.location}</Text>
                  <Text style={styles.text}>Born in: {birthYear}</Text>
                  <Text style={styles.text}>{user.gender}</Text>
                  <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.preferences}>
              <Text style={styles.title}>Concert Preferences:</Text>
              <Text style={styles.text}>
                Drink alcohol: {user.drinkPreference}
              </Text>
              <Text style={styles.text}>
                Seat preference: {user.seatPreference}
              </Text>
              <Text style={styles.text}>
                Mosher: {trueFalse(user.mosher)}
              </Text>
              <Text style={styles.text}>
                Singalong: {trueFalse(user.singalong)}
              </Text>
              <Text style={styles.text}>
                Photographer: {trueFalse(user.photographer)}
              </Text>
              <Text style={styles.text}>
                Trust Rating (/10): {user.trustRating}⋆
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderColor: "#252F40",
    borderWidth: 3,
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    padding: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    width: "60%",
    padding: 10,
    backgroundColor: "rgb(44, 131, 44)",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  personalInfo: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(253, 252, 242)",
    borderRadius: 30,
    width: "80%",
    marginBottom: 10,
  },
  preferences: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgb(253, 252, 242)",
    borderColor: "#228B22",
    borderRadius: 20,
    width: "80%",
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default UserProfile