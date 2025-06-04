import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
function UserProfile() {
  const [user, setUser] = useState({
    username: "giggleFan",
    emailAddress: "giggleFan@gmail.com",
    profilePicture: "https://robohash.org/mail@ashallendesign.co.uk",
    concertInterests: "dancing, close to front, get there early",
  });
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Image
        style={styles.avatar}
        resizeMode="contain"
        source={{
          uri: user.profilePicture,
        }}
      />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.emailAddress}</Text>
    </View>
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
