import { postNewEventToDb } from "@/utils/api";
import React from "react";
import {
  //   Button,
  FlatList,
  StyleSheet,
  Text,
  //   TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

//calls our api to post event to db
//need to use day.js or whatever it's called to prettify the date format

function TmEventsList({ tmEvents }) {
  const testStaticArray = [
    {
      event_artist: "Bruce Springsteen",
      event_location: "Leeds",
      event_date: "Today",
      event_venue: "Brude",
    },
    {
      event_artist: "Megan Thee Stallion",
      event_location: "Manch",
      event_date: "25-08-2026",
      event_venue: "O2 Apollo",
    },
    {
      event_artist: "Bruce",
      event_location: "London",
      event_date: "Next month",
      event_venue: "Alexandra Palace",
    },
  ];

  const addNewEvent = () => {
    return postNewEventToDb().then(() => {});
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
        <TouchableOpacity style={styles.button} onPress={addNewEvent}>
            <Text>
          Add this event to Giggle!
          </Text>
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
