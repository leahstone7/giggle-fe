import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/auth.styles";
import SearchTMEvents from "../components/SearchTmEvents";
import TmEventsList from "../components/TmEventsList";

//click it as a link to...add?
//automatically posts to our server
//thanks, event added!

export default function newEvent() {
  const [tmEvents, setTmEvents] = useState([]);
  const [hasPostedEvent, setHasPostedEvent] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Couldn't find the event you were looking for? Add it here!</Text>
      <Text>
        (note to giggle team: This page will be moved off the navbar and
        accessible through a link on the homepage)
      </Text>
      <SearchTMEvents setTmEvents={setTmEvents} />

      {/* {tmEvents.length > 0 ? (<TmEventsList tmEvents={tmEvents} ></TmEventsList>) : (null)} */}

      {hasPostedEvent ? (
        <Text>
          Thank you, you should now be able to see this event on the main
          search!
        </Text>
      ) : (
        <TmEventsList
          tmEvents={tmEvents}
          setHasPostedEvent={setHasPostedEvent}
        ></TmEventsList>
      )}
    </View>
  );
}
