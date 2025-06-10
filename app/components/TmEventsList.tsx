import formatEventDate from "@/utils/dateUtils";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { postNewEventToDb } from "../../utils/api";

//need to use day.js or something it's called to prettify the date format

function TmEventsList({ tmEvents, setHasPostedEvent }) {
  //below array useful for testing when we hit the ticketmaster time out!
    const testStaticArray = [
      {
        event_artist: "Bruce Springsteen",
        event_location: "Leeds",
        event_date: "2027-06-01T00:20:00Z",
        event_venue: "Brudenell Social Club",
      },
      {
        event_artist: "Megan Thee Stallion",
        event_location: "Manchester",
        event_date: "2027-07-01T00:20:00Z",
        event_venue: "O2 Apollo",
      },
      {
        event_artist: "Nick Cave",
        event_location: "London",
        event_date: "2027-08-01T00:20:00Z",
        event_venue: "Alexandra Palace",
      },
          {
        event_artist: "Father John Misty",
        event_location: "Liverpool",
        event_date: "2028-04-31T00:20:00Z",
        event_venue: "Anfield Stadium",
      },
    ];

  const addNewEvent = (item) => {
    setHasPostedEvent(true);
    return postNewEventToDb(item).then(() => {});
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.artist}>{item.event_artist}</Text>
        <Text style={styles.item}>{item.event_venue}</Text>
        <Text style={styles.item}>{item.event_location}</Text>
        <Text style={styles.item}>f{formatEventDate(item.event_date)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addNewEvent(item);
          }}
        >
          <Entypo name="add-to-list" size={16} color="black" />
          <Text>Add to Giggle </Text>

          {/* <Ionicons name="pluscircle" size={20} style={{marginRight: 5}}/> */}
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
  artist: {
    backgroundColor: "rgb(193, 213, 193)",
    color: "black",
    padding: 10,
    marginBlockStart: 10,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "transparent",
    color: "black",
    padding: 2,
    paddingHorizontal: 14,
  },
  button: {
    backgroundColor: "#ADC178",
    marginBottom: 5,
    color: "black",
    padding: 10,
    margin: 10,
    marginHorizontal: 100,
    alignItems: "center",
    borderRadius: "1rem",
  },
});
