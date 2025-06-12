import { IUser } from "@/context/userContext";
import { getEventById, getUserByUserName } from "@/utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Loader from "../components/loader";
import { styles } from "@/styles/otherUser.styles";

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
            <TouchableOpacity onPress={()=> {
              router.push({
                pathname: "/(events)/[eventId]",
                params: {eventId: eventId}
              })
            }}>

                <Text style={{ fontWeight: "bold" }}>
                {/* <Text>{formatDate(event.date)}</Text> */}
                {eventNames[eventId] || "Unknown Event"}</Text>
            </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

