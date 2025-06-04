import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatProps } from "../../types"

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

function Chat({ navigation }: Props) {
return (
    <View>

        <Button
          title="Chat"
          accessibilityLabel="go to chat"
          onPress={() => navigation.navigate("ChatPage")}
          color="red"
          />
 
    </View>
  );
}

export default Chat;
