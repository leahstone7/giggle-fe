import { getAllEvents } from "@/utils/api";
import formatEventDate from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Loader from "./loader";

type Event = {
  _id: string;
  event_artist: string;
  event_location: string;
  event_venue: string;
  event_date: string;
};

function SearchEvents() {
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<Event[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllEvents()
      .then((events) => {
        setEventData(events);
        setSearchResults(events);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Uh Oh! An error occured!");
        setIsLoading(false);
      });
  }, []);



  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setSearchResults(eventData);
      return;
    }

    const formattedquery = query.toLowerCase();

    const filteredData = eventData.filter((event) => {
      return (
        event.event_artist.toLowerCase().includes(query) ||
        event.event_location.toLowerCase().includes(query) ||
        event.event_venue.toLowerCase().includes(query)
      );
    });
    setSearchResults(filteredData);
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <View>
      <Text>{item.event_artist}</Text>
      <Text>{item.event_venue}</Text>
      <Text>{item.event_location}</Text>
      <Text>{formatEventDate(item.event_date)}</Text>
    </View>
  );
  if (isLoading) return <Loader size="small" />;

  if (error) {
    return (
      <View>
        <Text> Couldn't find the event requested. Search for more events?</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.searchSectionWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} style={{ marginRight: 5 }} />
          <TextInput
            placeholder="Search for events ..."
            autoCorrect={false}
            autoCapitalize="none"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log(" filter button pressed");
          }}
          style={styles.filterBtn}
        >
          <Ionicons name="options" size={30} color={"black"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        renderItem={renderEvent}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
  );
}
export default SearchEvents;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
  // eventTitle: {
  //   fontWeight: "bold",
  //   fontSize: 16
  // },
  // eventContainer: {
  //   backgroundColor: '#f5f5f5',
  //   borderRadius: 8,
  //   padding: 12,
  //   marginBottom: 12
  // }
});
