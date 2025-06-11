import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { styles } from "../../styles/auth.styles";
import SearchTMEvents from "../components/SearchTmEvents";
import TmEventsList from "../components/TmEventsList";

//NEED TO IMPLEMENT REFRESH - app-wide?

export default function newEvent() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [tmEvents, setTmEvents] = useState([]);
  const [hasPostedEvent, setHasPostedEvent] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setHasPostedEvent(false);
    setSearchQuery("");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.title}>
            Couldn't find the event you were looking for? Add it here!
          </Text>

          <SearchTMEvents
            setTmEvents={setTmEvents}
            setHasPostedEvent={setHasPostedEvent}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

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
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#f5f5f5',
    padding: 10,
    paddingBottom: 60,
  },
  title: {
    color: "black",
    padding: 10,
    marginBlockStart: 10,
    fontWeight: "bold",
  },
});
