import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getTMEventById, getTMEventsByKeyword } from "../../utils/api";

function SearchTMEvents({
  setTmEvents,
  setHasPostedEvent,
  setSearchQuery,
  searchQuery,
  setNoResults,
  setIsLoading,
}) {
  const searchTM = () => {
    setIsLoading(true);
    setHasPostedEvent(false); //Allows user to search again after posting than once so we don't need a reset button
    setNoResults(false);
    const eventArr = [];
    getTMEventsByKeyword(searchQuery).then((events) => {
      if (events === undefined) {
        setIsLoading(false);
        setNoResults(true);
      } else {
        setIsLoading(false);
        setNoResults(false);
        events.map((event) => {
          const eventObj = {};
          eventObj.event_artist = event.name;
          getTMEventById(event.id).then((singleEvent) => {
            eventObj.event_location = singleEvent._embedded.venues[0].city.name;
            eventObj.event_date = singleEvent.dates.start.dateTime;
            eventObj.event_venue = singleEvent._embedded.venues[0].name;
            eventObj.event_img = singleEvent.images[0].url;
            eventArr.push(eventObj);
            return eventArr;
          });
        });
      }
      setTmEvents(eventArr);
    });
  };

  // const resetSearch = () => {};

  return (
    <View style={styles.searchSectionWrapper}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} style={{ marginRight: 5 }} />
        <TextInput
          placeholder="Find a new event to add..."
          onChangeText={(e) => setSearchQuery(e)}
          value={searchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              setTmEvents([]);
              setNoResults(false);
              setIsLoading(false);
            }}
            style={styles.clearBtn}
          >
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[{ width: "30%", margin: 5, alignSelf: "center" }]}>
        <Button title="Search" color="#f194ff" onPress={searchTM} />
        {/* <Button title="Reset" color="#ff94a2" onPress={resetSearch} /> */}
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
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 12,
    width: 300,
    alignSelf: "center",
  },
  clearBtn: {
    position: "absolute",
    justifyContent: "center",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  clearBtnText: {
    color: "#979897",
  },
});
