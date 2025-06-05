import { Stack } from "expo-router";
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
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="Wishlist" options={{ title: "Wishlist" }} />
          <Stack.Screen name="Messages" options={{ title: "Messages" }} />
          <Stack.Screen name="Profile" options={{ title: "Profile" }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

//settings need to be inside profile stacklist
