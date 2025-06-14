import { getMessagesByChatroomid, postMessageToChat } from "@/utils/api";
import formatEventDate from "@/utils/dateUtils";
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
    <View style={styles.parentContainer}>
      <Text style={styles.title}>Chatting with mirielLikesTurtles</Text>

      <View style={styles.chatContainer}>
        {messages.map((message) => {
          return message.senderId === id1 ? (
            <View style={styles.sentBubble} key={message._id}>
            <Text  style={styles.sender1}>
              {/* {formatEventDate(message.timestamp)} */}
              {message.body}
            </Text></View>
          ) : (
            <View key={message._id}><Text  style={styles.sender2}>
              {message.body}
            </Text></View>
          );
        })}
        <Text></Text>
      </View>
      <View style={styles.barAndButton}>
        <View style={styles.chatBar}>
          <TextInput
            placeholder="message"
            value={messageToSend}
            onChangeText={(e) => setMessageToSend(e)}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              paddingBlockStart: 4,
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parentContainer: {
    position: "relative",
    flex: 1,
  },
  chatContainer: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  sender1: {
    color: "black",
    backgroundColor: "white",
    paddingRight: 50,
    textAlign: "left",
    padding: 5,
  },
  sentBubble:{
backgroundColor: 'green',
  },
  sender2: {
    color: "grey",
    textAlign: "right",
    paddingLeft: 50,
    padding: 5,
  },
  barAndButton: {
    margin: 5,
    flexDirection: "row",
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  chatBar: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    height: "auto",
    margin: 2,
    flex: 9,
  },
  sendButton: {
    backgroundColor: "#f194ff",
    width: 20,
    height: "auto",
    borderRadius: 30,
    padding: 5,
    margin: 2,
    flex: 2,
    alignContent: "center",
    textAlign: "center",
  },
  title: {
    padding: 5,
    paddingBlockEnd: 10,
    position: "relative",
  },
});
