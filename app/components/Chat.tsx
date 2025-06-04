import React from "react";
import { Button, Text, View } from "react-native";

function Chat() {
  return (
    <View>
      <Text>
        <Button
          title="Chat"
          accessibilityLabel="go to chat"
          onPress={() => console.log("button pressed")}
          color="blue"
        ></Button>
      </Text>
    </View>
  );
}

export default Chat;
