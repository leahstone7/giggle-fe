import { getMessagesByChatroomid, postMessageToChat } from "@/utils/api";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function chats() {
  const id1 = "6841b8a92dc3ed702a69d6b1"; //tester
  const id2 = "60b3e1c2e00e9d3d0b42b0e5"; //miriel likes turtles
  const chatId = "6841b9d0574bb808eb4d16f2";
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [newMessageSent, setNewMessageSent] = useState("");

  //we need an endpoint to get chats by two user ids when not hardcoded

  useEffect(() => {
    getMessagesByChatroomid(chatId).then((msgs) => {
      setMessages(msgs);
    });
  }, []);

  //   const renderItem = ({ item }) => {
  //     return (
  //       <View>
  //         <Text >
  //           //map over each id, display message as text
  //           {item.}
  //         </Text>
  //       </View>
  //     );
  //   };
  const sendMessage = () => {
    postMessageToChat({ senderId: id1, body: messageToSend }, chatId).then(
      (newMessage) => {
        setNewMessageSent(newMessage.body);
        setMessageToSend("");
        getMessagesByChatroomid(chatId).then((msgs) => {
          setMessages(msgs);
        });
      }
    );
  };

  //display in order
  //style left for sender, right for receiver etc
  return (
    <View>
      <View style={styles.chatContainer}>
        <Text>CHAT WITH HARDCODED NAME??</Text>
        {messages.map((message) => {
          return message.senderId === id1 ? (
            <Text key={message._id} style={styles.sender1}>
              {message.body}
            </Text>
          ) : (
            <Text key={message._id} style={styles.sender2}>
              {message.body}
            </Text>
          );
        })}
        <Text></Text>
      </View>
      <View style={styles.barAndButton}>
        <View style={styles.chatBar}>
          <TextInput
            placeholder="message"
            onChangeText={(e) => setMessageToSend(e)}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  chatContainer: {
    // flex: 2,
    padding: 5,
  },
  sender1: {
    color: "red",
    justifyContent: "flex-start",
  },
  sender2: {
    color: "green",
    justifyContent: "flex-end",
  },
  barAndButton: {
    margin: 5,
  },
  chatBar: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    width: "85%",
  },
  sendButton: {
    backgroundColor: "#f194ff",
    width: "10%",
  },
});
