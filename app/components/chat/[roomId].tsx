// Individual chat room
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { io, Socket } from "socket.io-client";



const API_BASE_URL = "http://localhost:9090"; //add personal IP to test instead of localhost 
const SOCKET_URL = "http://localhost:9091"; // add personal IP to test instead of localhost- socket io
type Message = {
  _id?: string;
  msgId?: number;
  roomId?: string;
  senderId?: string;
  senderUsername: string;
  body: string;
  timestamp: string;
  displayToClient?: boolean;
};

export default function ChatRoom() {
  const { roomId, chatUsers, currentUserId, currentUsername } =
    useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoined, setIsJoined] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Parse chat users and determine chat partner
  const parsedUsers = chatUsers ? JSON.parse(chatUsers as string) : [];
  const chatPartner = parsedUsers.find((u: any) => u._id !== currentUserId);
  const chatTitle = chatPartner
    ? `${chatPartner.firstName} ${chatPartner.lastName}`.trim() ||
      chatPartner.username
    : "Chat";

  // Use passed username or fallback
  const username = (currentUsername as string) || "You";

  const fetchHistory = async () => {
    try {
      console.log(`Fetching history for room: ${roomId}`);
      const response = await axios.get(`${API_BASE_URL}/api/chats/${roomId}`); // api port

      if (response.data.msgs && Array.isArray(response.data.msgs)) {
        const visibleMessages = response.data.msgs.filter(
          (msg: Message) => msg.displayToClient !== false
        );
        setMessages(visibleMessages);
      } else {
        setMessages([]);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        Alert.alert("Chat Not Found", "This chat room doesn't exist.");
        router.back();
      } else {
        setError("Failed to load chat history");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Socket connection
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      timeout: 5000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to chat server");
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
      setError("Connection failed");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Room joining and message handling
  useEffect(() => {
    if (!roomId || !socketRef.current || !isConnected) return;

    fetchHistory();
    const socket = socketRef.current;
    socket.emit("join room", roomId);
    setIsJoined(true);

    const handleIncomingMessage = (msg: Message) => {
      console.log("New message received:", msg);
      setMessages((prev) => [...prev, msg]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    };

    socket.on("chat message", handleIncomingMessage);

    return () => {
      socket.off("chat message", handleIncomingMessage);
      setIsJoined(false);
    };
  }, [roomId, isConnected]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !isConnected || !roomId) {
      if (!isConnected) {
        Alert.alert("Not Connected", "Connecting to chat server...");
      }
      return;
    }

    const messageData = {
      roomId,
      senderUsername: username,
      senderId: currentUserId || "68405b9711f50eebe1b59521", // Bruce's ID for testing
      body: input.trim(),
    };

    console.log("Sending message:", messageData);
    socketRef.current.emit("chat message", messageData);
    setInput("");
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isMyMessage =
      item.senderUsername === username || item.senderId === currentUserId;
    const showSender =
      index === 0 ||
      messages[index - 1]?.senderUsername !== item.senderUsername;

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.partnerMessage,
        ]}
      >
        {showSender && !isMyMessage && (
          <Text style={styles.senderName}>
            {item.senderUsername || chatPartner?.firstName || "Them"}
          </Text>
        )}
        <Text
          style={[
            styles.messageText,
            isMyMessage ? styles.myMessageText : styles.partnerMessageText,
          ]}
        >
          {item.body}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Loading chat...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{chatTitle}</Text>
          <Text style={styles.headerSubtitle}>
            {chatPartner ? `@${chatPartner.username}` : "Chat"}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <View
            style={[
              styles.connectionDot,
              { backgroundColor: isConnected ? "#1DB954" : "#dc3545" },
            ]}
          />
        </View>
      </View>

      {/* Error Display */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>Connection issues. Tap to retry.</Text>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        style={styles.messagesList}
        data={messages}
        keyExtractor={(item) =>
          item._id?.toString() ||
          item.msgId?.toString() ||
          Math.random().toString()
        }
        renderItem={renderMessage}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatEmoji}>🎵</Text>
            <Text style={styles.emptyChatTitle}>Start the conversation!</Text>
            <Text style={styles.emptyChatSubtitle}>
              Share your excitement about upcoming gigs
            </Text>
          </View>
        }
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={input}
          onChangeText={setInput}
          placeholder="Message about your next gig..."
          placeholderTextColor="#adb5bd"
          multiline
          maxLength={500}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor:
                !input.trim() || !isConnected ? "#adb5bd" : "#1DB954",
            },
          ]}
          onPress={sendMessage}
          disabled={!input.trim() || !isConnected}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6c757d",
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 60, //  for status bar
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: "#1DB954",
    fontWeight: "600",
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 2,
  },
  headerRight: {
    alignItems: "center",
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  errorBanner: {
    backgroundColor: "#f8d7da",
    padding: 8,
    alignItems: "center",
  },
  errorText: {
    color: "#721c24",
    fontSize: 14,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    maxWidth: "75%",
    marginVertical: 2,
    padding: 12,
    borderRadius: 18,
  },
  myMessage: {
    backgroundColor: "#1DB954",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  partnerMessage: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6c757d",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: "white",
  },
  partnerMessageText: {
    color: "#212529",
  },
  timestamp: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  emptyChat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  emptyChatEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyChatTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  emptyChatSubtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    alignItems: "flex-end",
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  sendButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
