// Main messages tab - shows all conversations for current user

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


const BASE_URL = "http://localhost:9090";

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
};

type Chat = {
  _id: string;
  user_ids: string[];
  users?: User[];
  messageCount?: number;
  lastMessage?: {
    body: string;
    timestamp: string;
    senderUsername: string;
  };
};

export default function MessagesTab() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

 
  const currentUserId = "68405b9711f50eebe1b59521"; // Bruce's ID for testing
  const currentUsername = "TheBoss"; // Bruce's username for testing

  const fetchChats = async () => {
    try {
      console.log("Fetching conversations from:", BASE_URL);

      const response = await fetch(`${BASE_URL}/api/chats`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const allChats = await response.json();
      console.log("All chats received:", allChats);

      // Filter chats where current user is a participant
      const userChats = allChats.filter((chat: Chat) =>
        chat.user_ids.includes(currentUserId)
      );

      console.log(`Found ${userChats.length} chats for user ${currentUserId}`);
      setChats(userChats);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load conversations"
      );

      Alert.alert(
        "Connection Error",
        `Cannot connect to server. Please check if your backend is running at ${BASE_URL}`,
        [{ text: "Retry", onPress: () => fetchChats() }, { text: "OK" }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchChats();
  };

  const openChat = (chat: Chat) => {
    console.log("Opening chat:", chat._id);

    // Navigate to the specific chat room
    router.push({
      pathname: "/components/chat/[roomId]",
      params: {
        roomId: chat._id,
        chatUsers: JSON.stringify(chat.users || []),
        currentUserId,
        currentUsername,
      },
    } as const);
  };

  const getOtherUser = (chat: Chat): User | null => {
    if (!chat.users || chat.users.length === 0) return null;

    // Find the user who is NOT the current user
    const otherUser = chat.users.find((user) => user._id !== currentUserId);
    return otherUser || null;
  };

  const renderConversationItem = ({ item }: { item: Chat }) => {
    const otherUser = getOtherUser(item);

    if (!otherUser) {
      return null; // Skip if we can't identify the other user
    }

    const displayName =
      `${otherUser.firstName} ${otherUser.lastName}`.trim() ||
      otherUser.username;
    const subtitle = `@${otherUser.username}`;

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => openChat(item)}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {otherUser.firstName?.charAt(0) ||
              otherUser.username?.charAt(0) ||
              "?"}
          </Text>
        </View>

        <View style={styles.conversationInfo}>
          <Text style={styles.conversationName}>{displayName}</Text>
          <Text style={styles.conversationSubtitle}>{subtitle}</Text>

          {item.lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage.senderUsername === currentUsername
                ? "You: "
                : ""}
              {item.lastMessage.body}
            </Text>
          )}

          {!item.lastMessage && (
            <Text style={styles.noMessages}>
              Start a conversation about your next gig! 🎵
            </Text>
          )}
        </View>

        <View style={styles.conversationMeta}>
          {item.messageCount && item.messageCount > 0 && (
            <Text style={styles.messageCount}>{item.messageCount}</Text>
          )}
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Loading your conversations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>
          Connect with your gig buddies 🎵
        </Text>
      </View>

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchChats}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Conversations List */}
      {chats.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptySubtitle}>
            Start chatting with other music lovers when you find events
            together!
          </Text>
          <Text style={styles.emptyEmoji}>🎶</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={renderConversationItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 60, //  for status bar
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1DB954", // Spotify green colour
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6c757d",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6c757d",
  },
  errorContainer: {
    backgroundColor: "#f8d7da",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  errorText: {
    color: "#721c24",
    marginBottom: 10,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
  },
  listContainer: {
    paddingVertical: 8,
  },
  conversationItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 2,
  },
  conversationSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#495057",
    marginTop: 2,
  },
  noMessages: {
    fontSize: 14,
    color: "#adb5bd",
    fontStyle: "italic",
    marginTop: 2,
  },
  conversationMeta: {
    alignItems: "flex-end",
  },
  messageCount: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 4,
  },
  arrow: {
    fontSize: 24,
    color: "#1DB954",
    fontWeight: "300",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  emptyEmoji: {
    fontSize: 48,
  },
});
