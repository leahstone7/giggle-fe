import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Chat from "./Chat";
import HomePage from "./HomePage";
import UserProfile from "./UserProfile";

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <View style={styles.NavBar}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="HomePage">
            <Tab.Screen name="HomePage" component={HomePage} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="User Profile" component={UserProfile} />
          </Tab.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </View>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
});
