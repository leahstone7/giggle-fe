import { Stack } from "expo-router";
import { Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ADC178",
            },
            headerTitle: "",
            headerLeft: ()=> (
              <Image source={require('../app/assets/images/giggle-logo.png')} 
              style={{width: 100, height: 40, borderRadius: 10, alignItems: 'center', position: 'absolute'}}
              />
            )
          }}
        >
          {/* <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="Wishlist" options={{ title: "Wishlist" }} />
          <Stack.Screen name="Messages" options={{ title: "Messages" }} />
          <Stack.Screen name="Profile" options={{ title: "Profile" }} />
          <Stack.Screen name="Login" options={{ title: "Login" }} /> */}
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{title: "login page"}}/>

        </Stack>
       
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

//settings need to be inside profile stacklist
