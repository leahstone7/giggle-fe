import React, { useState } from "react";
import { Button, View, TextInput} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { ChatTabProps } from "../../types"
// import ChatPage from "./ChatPage"

// type Props = NativeStackScreenProps<RootStackParamList, "Chat">;
// type Props = NativeStackScreenProps<RootStackParamList>();

function Chat({ navigation }: ChatTabProps) {
  const [message, setMessage]=useState("")
return (
    <View>
      <TextInput 
      placeholder="message"
      value={message}
      onChangeText={(text)=>setMessage(text)}/>
        {/* <Button
          title="Go to ChatPage"
          // accessibilityLabel="go to chat"
          onPress={() => navigation.navigate("ChatPage")}
          color="green"
          /> */}
    </View>
  );
}

export default Chat;
