import { IUser } from "@/context/userContext";
import { getEventById, getUserByUserName } from "@/utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Loader from "../components/loader";

export default function UserDetails() {
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [eventNames, setEventNames] = useState<Record<string, string>>({});

  const getUserProfile = () => {
    setLoading(true);
    setError(null);

    getUserByUserName(username)
      .then((userDetails) => {
        if (!userDetails) {
          setError("User not found!");
        }
        setUser(userDetails);

        if (userDetails.interestedEvents?.length > 0) {
          getInterestedEventNames(userDetails.interestedEvents);
        }
      })
      .catch((error) => {
        console.log("Error finding user", error);
        setError("Failed to load user profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getInterestedEventNames = async (eventIds: string[]) => {
    try {
      const events = await Promise.all(
        eventIds.map((eventId) => getEventById(eventId))
      );

      const namesMap = events.reduce(
        (acc, event) => {
          if (event) {
            acc[event._id] = event.event_artist;
          }
          return acc;
        },
        {} as Record<string, string>
      );

      setEventNames(namesMap);
    } catch (error) {
      console.log("Error fetching events", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [username]);



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (loading) return <Loader size="small" />;
  if (error)
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );

    console.log("user profile picture", user?.profilePictureURL)
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {user.profilePictureURL && (
          <Image
            source={{ uri: user.profilePictureURL }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.headerText}>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.username}>@{user.username}</Text>
          {user.isVerified && <Text style={styles.verified}>✓ Verified</Text>}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>
            {user.location.town}, {user.location.postcode}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{user.gender}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>
            {calculateAge(user.dateOfBirth)} years
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Member Since:</Text>
          <Text style={styles.value}>{formatDate(user.memberSince)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Trust Rating:</Text>
          <Text style={styles.value}>{user.trustRating}/5</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Drink:</Text>
          <Text style={styles.value}>
            {user.preferences.drinkPreference || "Not specified"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Seat:</Text>
          <Text style={styles.value}>{user.preferences.seatPreference}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Gig Style:</Text>
          <View style={styles.giggingStyles}>
            {user.preferences.giggingStyle.mosher && (
              <Text style={styles.giggingStyle}>Mosher</Text>
            )}
            {user.preferences.giggingStyle.singalong && (
              <Text style={styles.giggingStyle}>Singalong</Text>
            )}
            {user.preferences.giggingStyle.photographer && (
              <Text style={styles.giggingStyle}>Photographer</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.biography}>
          {user.biography || "No biography provided"}
        </Text>
      </View>

      {user.interestedEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interested Events</Text>
          <View style={styles.eventsContainer}>
            {user.interestedEvents.map((eventId, index) => (

          <View key={index} style={styles.event}>
                <Text style={{ fontWeight: "bold" }}>
                {/* <Text>{formatDate(event.date)}</Text> */}
                {eventNames[eventId] || "Unknown Event"}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  verified: {
    fontSize: 14,
    color: "green",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    width: 120,
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  giggingStyles: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  giggingStyle: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
  },
  biography: {
    lineHeight: 20,
    color: "#333",
  },
  eventsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  event: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
