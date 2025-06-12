import { Stack } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {UserProvider} from '../context/userContext'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <UserProvider>

        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ADC178",
            },
            headerTitle: "",
    
            headerLeft: ()=> (
              <Image source={require('../app/assets/images/giggle-text-transparent.png')} 
              style={{width: 120, height: 60, borderRadius: 0, resizeMode: 'contain'}}
              />
            ),
            headerRight: ()=> (
              <Image source={require('../app/assets/images/giggle-lilguy-transparent.png')} 
              style={{width: 120, height: 80, borderRadius: 0, resizeMode: 'contain'}}
              />
            )
          }}
          >
          {/* <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="Wishlist" options={{ title: "Wishlist" }} />
          <Stack.Screen name="Messages" options={{ title: "Messages" }} />*/}
          {/* <Stack.Screen name="Profile" options={{ title: "Profile" }} />
          <Stack.Screen name="Login" options={{ title: "Login" }} />  */}
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{title: "login page"}}/>

        </Stack>
          </UserProvider>
       
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

//settings need to be inside profile stacklist
