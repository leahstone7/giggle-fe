import { Link } from "expo-router";
import { View, Text } from "react-native";
import {styles} from "../../styles/auth.styles"
import Header from "../components/Header";
import SearchEvents from "../components/SearchBar"


export default function Index(){


    return (
        <View style={styles.container}>

            {/* <Link href={"/userprofile"}> Home page</Link> */}
            {/* <Header /> */}
            <SearchEvents />
            {/* Events list scroller  */}
        <Text>// Ignore these links for now. 
            Will sort this out after authentication // </Text>
            <Link href="/(auth)">Link to login</Link>
            <Link href="/(auth)/signup">Link to signup</Link>
            
        </View>
    )
}