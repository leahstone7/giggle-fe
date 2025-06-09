import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { postNewEventToDb } from "../../utils/api";

//need to use day.js or whatever it's called to prettify the date format

function TmEventsList({ tmEvents, setHasPostedEvent }) {

    //below array useful for testing when we hit the ticketmaster time out!
//   const testStaticArray = [
//     {
//       event_artist: "Bruce Springsteen",
//       event_location: "Leeds",
//       event_date: "2027-06-01T00:20:00Z",
//       event_venue: "Brude",
//     },
//     {
//       event_artist: "Megan Thee Stallion",
//       event_location: "Manchester",
//       event_date: "2027-07-01T00:20:00Z",
//       event_venue: "O2 Apollo",
//     },
//     {
//       event_artist: "Bruce",
//       event_location: "London",
//       event_date: "2027-08-01T00:20:00Z",
//       event_venue: "Alexandra Palace",
//     },
//   ];

  const addNewEvent = (item) => {
    setHasPostedEvent(true);
    return postNewEventToDb(item).then(() => {});
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>
          {item.event_artist}, {item.event_location}
        </Text>
        <Text style={styles.item}>
          {item.event_venue} on {item.event_date}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addNewEvent(item);
          }}
        >
          <Text>Add this event to Giggle!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={tmEvents} renderItem={renderItem} />
    </View>
  );
}
export default TmEventsList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgb(44, 131, 44)",
    color: "white",
    padding: 4,
  },
  button: {
    backgroundColor: "#ADC178",
    marginBottom: 5,
    color: "black",
    padding: 2,
  },
});
