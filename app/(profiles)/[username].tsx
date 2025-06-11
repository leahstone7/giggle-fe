import { IUser } from "@/context/userContext";
import { getUserByUserId } from "@/utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Loader from "../components/loader";

export default function UserDetails() {
  const { username } = useLocalSearchParams();

console.log(username)
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getUserProfile = () => {
    setLoading(true);
    setError(null);

    getUserByUserId(username)
      .then((userDetails) => {
        setUser(userDetails);
      })
      .catch((error) => {
        console.log("Error finding user", error);
        setError("Failed to load user profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, [username]);

  if (loading) return <Loader size="small" />;
  if (error)
    return (
      <View>
        <Text>Uh Oh! something went wrong there!</Text>
      </View>
    );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return(
    <View>
        <Text>
            UserId: {username}
        </Text>
    </View>
  )
}

