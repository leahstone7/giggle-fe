import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

//make a refined array by mapping to take only data we want
//pass array into flatLIst

function TmEventsList({ tmEvents }) {
  //   const testStaticArray = [
  //     {
  //       event_artist: "Bruce Springsteen",
  //       event_location: "Leeds",
  //       event_date: "Today",
  //       event_venue: "Brude",
  //     },
  //     {
  //       event_artist: "Megan Thee Stallion",
  //       event_location: "Manch",
  //       event_date: "25-08-2026",
  //       event_venue: "O2 Apollo",
  //     },
  //     {
  //       event_artist: "Bruce",
  //       event_location: "London",
  //       event_date: "Next month",
  //       event_venue: "Alexandra Palace",
  //     },
  //   ];

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>
          {" "}
          {item.event_artist}, {item.event_location}
        </Text>
        <Text style={styles.item}>
          {" "}
          {item.event_venue}, {item.event_date}
        </Text>
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
    padding: 2,
    margin: 2,
  },
});
