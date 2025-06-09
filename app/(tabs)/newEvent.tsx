import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/auth.styles";
import SearchTMEvents from "../components/TicketmasterSearchBar";


//search for new event serachbar WITH A SEARCH BUTTON
//calls ticketmaster USEEFFECT ONCE ONCE ONCE ONCE ONCE  BASED ON SEARCH BUTTON
//click it as a link to...add?
//automatically posts to our server
//thanks, event added!

export default function newEvent() {
    const [tmEvents, setTmEvents] = useState([]);


  return (
    <View style={styles.container}>
      <Text>Couldn't find the event you were looking for? Add it here!</Text>
      <Text>
        (This page will be moved off the navbar and accessible through a link on
        the homepage)
      </Text>
      <SearchTMEvents setTmEvents={setTmEvents} /> 
  {/* map through events and map the details, plus a button for add */}
    </View> 
  );
}
