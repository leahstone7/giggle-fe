import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { styles } from "../../styles/auth.styles";
import SearchTMEvents from "../components/SearchTmEvents";
import TmEventsList from "../components/TmEventsList";

//NEED TO IMPLEMENT REFRESH - app-wide?

export default function newEvent() {
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const [tmEvents, setTmEvents] = useState([]);
  const [hasPostedEvent, setHasPostedEvent] = useState(false);

  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* <ScrollView
          //   contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        > */}

          <Text style={styles.title}>
            Couldn't find the event you were looking for? Add it here!
          </Text>
          <Text>
            (note to giggle team: This page will probably be moved off the
            navbar and accessible through a link on the homepage)
          </Text>

          <SearchTMEvents setTmEvents={setTmEvents} />

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
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingBottom: 40,
  },
  title: {
    color: "black",
    padding: 10,
    marginBlockStart: 10,
    fontWeight: "bold",
  },
});
