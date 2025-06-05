// previously our ChatPage component (


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import type { ChatPageParams } from '../../src/types'; 

export default function ChatPage() {
  const { roomId } = useLocalSearchParams<ChatPageParams>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the chat page</Text>
      <Text style={styles.room}>Room ID: {roomId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fcbdf0',
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 'auto',
    color: '#f974df',
  },
  room: {
    fontSize: 17,
    color: '#8e74f9',
  },
});