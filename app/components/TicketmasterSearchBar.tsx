import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { getTMEventsByKeyword } from "../../utils/api";

function SearchTMEvents({setTmEvents}) {
  const [searchQuery, setSearchQuery] = React.useState("");

  //UPDAET SEARCH WUERY ON CHANGE TEXT HERE IN FUNCTION INSTEAD OF IN RETURN LINE 24

  const searchTM = () => {
    getTMEventsByKeyword(searchQuery).then((events) => {
      console.log(events);
        setTmEvents(events);
    });
  };

  return (
    <View style={styles.searchSectionWrapper}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} style={{ marginRight: 5 }} />
        <TextInput
          placeholder="Search for new events ..."
          onChangeText={(e) => setSearchQuery(e)}
        />
      </View>
      <View>
        <Button title="Search" color="#f194ff" onPress={searchTM} />
      </View>
    </View>
  );
}
export default SearchTMEvents;

const styles = StyleSheet.create({
  searchSectionWrapper: {
    flexDirection: "row",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#efefef",
    padding: 16,
    borderRadius: 10,
    width: 300,
  },

  filterBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#efefef",
  },
});
