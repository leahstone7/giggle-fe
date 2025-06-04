import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import HomePage from "./HomePage";
import Chat from "./Chat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserProfile from "./UserProfile";


const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

export default function NavBar() {
    return (<NavigationIndependentTree>
    <NavigationContainer>
     <Tab.Navigator initialRouteName="HomePage">
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="User Profile" component={UserProfile} />
        </ Tab.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
    )
}

const styles=StyleSheet.create({
  NavBar:{
    alignItems: "center",
    padding: 20,
    backgroundColor: '#bdfcc9',
    width: '100%',
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline'
  }
})
