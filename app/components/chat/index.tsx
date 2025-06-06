// for viewing all user to user chats

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

type Chat = {
  _id: string;
  user_ids: string[];
};
export default function Messages() {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:9090") // backend
      .then((res) => res.json())
      .then((data) => setChats(data));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Button
              title="Open Chat"
              onPress={() =>
                router.push({
                  pathname: "/components/chat/[roomId]",
                  params: { roomId: item._id },
                } as const)
              }
            />
            <Text>Chat with {item.user_ids.join(", ")}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
