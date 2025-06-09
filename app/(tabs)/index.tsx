import { Link } from "expo-router";
import { View, Text } from "react-native";
import {styles} from "../../styles/auth.styles"
import Header from "../components/Header";
import SearchEvents from "../components/SearchBar"
import EventList from "../(events)/eventList";


export default function Index(){


    return (
        <View >

            {/* <Link href={"/userprofile"}> Home page</Link> */}
            {/* <Header /> */}
            <SearchEvents />
            {/* Events list scroller  */}

            <Link href="/(auth)">Link to login</Link>
            <Link href="/(auth)/signup">Link to signup</Link>
            <EventList />
        </View>
    )
}