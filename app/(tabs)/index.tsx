import { Link } from "expo-router";
import { View } from "react-native";
import {styles} from "../../styles/auth.styles"
import Header from "../components/Header";
import SearchEvents from "../components/SearchBar"

export default function Index(){
    return (
        <View style={styles.container}>

            <Link href={"/userprofile"}> Home page</Link>
            <Header />
            <SearchEvents />
        </View>
    )
}