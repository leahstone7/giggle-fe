import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { getTMEventById, getTMEventsByKeyword } from "../../utils/api";

function SearchTMEvents({ setTmEvents }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const searchTM = () => {
    const eventArr = [];
    getTMEventsByKeyword(searchQuery).then((events) => {
      events.map((event) => {
        const eventObj = {};
        eventObj.event_artist = event.name;
        getTMEventById(event.id).then((singleEvent) => {
          eventObj.event_location = singleEvent._embedded.venues[0].city.name;
          eventObj.event_date = singleEvent.dates.start.dateTime;
          eventObj.event_venue = singleEvent._embedded.venues[0].name;
          eventArr.push(eventObj);
          return eventArr;
        });
      });

      setTmEvents(eventArr);
    });
  };

  return (
    <View style={styles.searchSectionWrapper}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} style={{ marginRight: 5 }} />
        <TextInput
          placeholder="Find a new event to add..."
          onChangeText={(e) => setSearchQuery(e)}
        />
      </View>
      <View style={[{ width: "30%", margin: 5, alignSelf: "center" }]}>
        <Button title="Search" color="#f194ff" onPress={searchTM} />
      </View>
    </View>
  );
}
export default SearchTMEvents;

const styles = StyleSheet.create({
  searchSectionWrapper: {
    flexDirection: "column",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#efefef",
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'
  },
});
