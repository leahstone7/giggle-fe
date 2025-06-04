import React from "react";
import {Text, View, StyleSheet} from "react-native"
import type { ChatPageProps } from "../../types";

export default function ChatPage({route}: ChatPageProps) {
    const { roomId } = route.params
    return(
        <View style={styles.container}>
            <Text style={styles.title}>This is the chat page</Text>
            <Text style={styles.room}> Room ID: {roomId}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
  container:{
   flex:1,
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fcbdf0',
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
marginBottom: "auto",
color: "#f974df"
  },
  room: {
fontSize: 17,
color: "#8e74f9"
  }
  }
)