import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ADC178",
          borderTopWidth: 0,
          position: "absolute",
          height: 50,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color="6C584C" />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="message1" size={size} color="6C584C" />
          ),
        }}
      />
      <Tabs.Screen
        name="userprofile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color="6C584C" />
          ),
        }}
      />
      <Tabs.Screen
        name="listticket"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ticket" size={size} color="6C584C" />
          ),
        }}
      />
      <Tabs.Screen
        name="newEvent"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="event-available" size={size} color="6C584C" />
          ),
        }}
      />
    </Tabs>
  );
}
