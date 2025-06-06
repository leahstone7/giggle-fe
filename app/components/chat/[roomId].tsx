import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
 import { io } from "socket.io-client";

const BASE_URL = "http://192.168.1.25:9090"; // can replace with own local IP if wanting to test
const socket = io(BASE_URL);

export default function ChatPage() {
  const { roomId } = useLocalSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // Fetch chat history from backend
  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/chats/${roomId}`);
      if (response.data.msgs) {
        setMessages(response.data.msgs);
      }
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    fetchHistory();
    socket.emit("join room", roomId);

    const handleIncomingMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat message", handleIncomingMessage);

    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = {
      roomId,
      senderUsername: "TheBoss", // Hardcoded for now
      body: input,
    };

    socket.emit("chat message", msg);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) =>
          item._id?.toString() ??
          item.msgId?.toString() ??
          Math.random().toString()
        }
        renderItem={({ item }) => (
          <Text>
            {item.senderUsername || item.senderId || "Unknown"}: {item.body}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginTop: 10 },
});
