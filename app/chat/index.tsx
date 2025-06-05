//our  previous Chat.tsx


import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Chat() {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleJoin = () => {
    if (roomId.trim()) {
      router.push(`/chat/${roomId}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Room ID"
        value={roomId}
        onChangeText={setRoomId}
        style={styles.input}
      />
      <Button title="Go to Chat Room" onPress={handleJoin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});