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
      <Text>B</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 75,
    borderColor: "#252F40",
    borderStyle: "solid",
    borderWidth: 3,
  },
});
export default UserProfile;
