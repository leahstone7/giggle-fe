import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { styles } from "../../styles/auth.styles";
import SearchTMEvents from "../components/SearchTmEvents";
import TmEventsList from "../components/TmEventsList";

export default function newEvent() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [tmEvents, setTmEvents] = useState([]);
  const [hasPostedEvent, setHasPostedEvent] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setHasPostedEvent(false);
    setSearchQuery("");
    setTmEvents([]);
    setIsLoading(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 300);
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
          <Text style={styles.title}>Search for events to add to Giggle</Text>

          <SearchTMEvents
            setTmEvents={setTmEvents}
            setHasPostedEvent={setHasPostedEvent}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setNoResults={setNoResults}
            setIsLoading={setIsLoading}
          />

          {hasPostedEvent ? (
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              Thank you, you should now be able to see this event on the main
              search!
            </Text>
          ) : isLoading ? (
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              Running search...
            </Text>
          ) : noResults ? (
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              Sorry, no results matched the search
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
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingBottom: 50,
  },
  title: {
    color: "black",
    padding: 10,
    marginBlockStart: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
