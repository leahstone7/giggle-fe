import { getUserByUserId } from "@/utils/api";
import { useEffect, useState } from "react";
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



interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  location: { town: string; postcode: string };
  preferences: {
    drinkPreference: string | null ;
    seatPreference: string;
    giggingStyle: {
      mosher: boolean;
      singalong: boolean;
      photographer: boolean;
    };
  };
  biography: string;
  dateOfBirth: string;
  gender: string;
  trustRating: number;
  isVerified: boolean;
  memberSince: string;
  interestedEvents: string[];
  profilePictureURL: string;

}

function UserProfile() {
  const [user, setUser] = useState<IUser>({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    location: { town: "", postcode: "" },
    preferences: {
      drinkPreference: "",
      seatPreference: "",
      giggingStyle: { mosher: false, singalong: false, photographer: false },
    },
    biography: "",
    dateOfBirth: "2000-01-01",
    gender: "",
    trustRating: 0,
    isVerified: false,
    interestedEvents: [],
    profilePictureURL: "",
    memberSince: "2025-05-25",
  });

 
  const formatBirthYear = (dateOfBirth: string) => {
    return new Date(dateOfBirth).getFullYear().toString();
  };

  const formatMemberSince = (memberSince: string) => {
    const day = new Date(memberSince).getDate().toString();
    const month = new Date(memberSince).getMonth().toString();
    const year = new Date(memberSince).getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  let trustPercentage = 100;

  const trueFalse = (value: string) => (value ? "Yes" : "No");

  useEffect(() => {
    getUserByUserId("6841b8a92dc3ed702a69d6b1").then((user) => {
      setUser(user);
      trustPercentage = user.trustRating * 100;
      const newBirthYear = formatBirthYear(user.dateOfBirth);
      const newMemberDate = formatMemberSince(user.memberSince);
      setUser({
        ...user,
        dateOfBirth: newBirthYear,
        memberSince: newMemberDate,
      });
    });
  }, []);

  const [isEditing, setIsEditing] = useState(false);

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
                uri: user.profilePictureURL,
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
                    value={user.location.town}
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
                  <TextInput
                    style={styles.input}
                    value={user.biography}
                    onChangeText={(text) => handleChange("biography", text)}
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
                  <Text style={styles.text}>{user.location.town}</Text>
                  <Text style={styles.text}>Born: {user.dateOfBirth}</Text>
                  <Text style={styles.text}>Gender: {user.gender}</Text>
                  <Text style={styles.text}>
                    Member since: {user.memberSince}
                  </Text>
                  <Text style={styles.text}>{user.biography}</Text>
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
                Drink alcohol: {user.preferences.drinkPreference}
              </Text>
              <Text style={styles.text}>
                Seat preference: {user.preferences.seatPreference}
              </Text>
              <Text style={styles.text}>
                Mosher: {trueFalse(user.preferences.giggingStyle.mosher)}
              </Text>
              <Text style={styles.text}>
                Singalong: {trueFalse(user.preferences.giggingStyle.singalong)}
              </Text>
              <Text style={styles.text}>
                Photographer:{" "}
                {trueFalse(user.preferences.giggingStyle.photographer)}
              </Text>
              <Text style={styles.text}>Trust Rating: {trustPercentage}%⋆</Text>
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
    fontSize: 18,
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

export default UserProfile;
