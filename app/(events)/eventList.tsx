import { styles } from "@/styles/eventList.styles";
import { getAllEvents } from "@/utils/api";
import formatEventDate from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FilterBtn from "../components/(drawer)/filter";
import SortBy from "../components/(drawer)/sortBy";
import Loader from "../components/loader";

type Event = {
  _id: string;
  event_artist: string;
  event_location: string;
  event_venue: string;
  event_date: string;
  event_img?: string;
};

export default function EventList() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);

  // Loading and Refreshing
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Error handling
  const [error, setError] = useState(null);

  // Search functionality

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Sort by

  const [sortOption, setSortOption] = useState<string | null>(null);

  // Filter by location

  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const fetchEvents = useCallback((refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);

    getAllEvents()
      .then((events) => {
        setEvents(events);
        setFilteredEvents(events);
      })
      .catch((error) => {
        setError(error.message || "Uh Oh! An error occured!");
      })
      .finally(() => {
        refresh ? setRefreshing(false) : setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filter events

  useEffect(() => {
    let timer;

    const filterEvents = () => {
      if (!searchQuery.trim() && !locationFilter) {
        setFilteredEvents(events);
        return;
      }

      const formattedquery = searchQuery.toLowerCase();

      const filteredData = events.filter((event) => {
        const matchesSearch =
          searchQuery.trim() === "" ||
          event.event_artist.toLowerCase().includes(formattedquery) ||
          event.event_location.toLowerCase().includes(formattedquery) ||
          event.event_venue.toLowerCase().includes(formattedquery);

        const matchesLocation =
          !locationFilter || event.event_location === locationFilter;

        return matchesSearch && matchesLocation;
      });
      setFilteredEvents(filteredData);
    };

    timer = setTimeout(filterEvents, 300);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchQuery, events, locationFilter]);

  // Sort events

  const getSortedEvents = (eventsToSort: Event[]) => {
    if (!sortOption) return eventsToSort;

    return [...eventsToSort].sort((a, b) => {
      if (sortOption === "date") {
        return (
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
        );
      } else {
        return a.event_artist.localeCompare(b.event_artist);
      }
    });
  };

  // Filter by location button handler

  const filterByLocation = (location: string | null) => {
    setLocationFilter(location);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setSearchQuery("");
    setSortOption(null);
    setLocationFilter(null);
    fetchEvents(true);

    setRefreshing(false);
  }, [fetchEvents]);

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.card}>
      <Image
        source={
          item.event_img
            ? { uri: item.event_img }
            : require("../assets/images/login-logo.png")
        }
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.artistName}>{item.event_artist}</Text>
          <Text style={styles.venueText}>{item.event_venue}.</Text>
          <Text style={styles.locationText}>{item.event_location}.</Text>
          <Text style={styles.dateText}>
            {formatEventDate(item.event_date)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.ticketBtn}
          onPress={() => router.push(`/${item._id}`)}
        >
          <Ionicons
            name="ticket-outline"
            size={20}
            style={{ marginRight: 8 }}
            color="#0066cc"
          />

          <Text style={styles.ticketText}>Find tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyComponent = () => {
    if (loading) return null;

    return (
      <View>
        <Text>Couldn't find events?</Text>
        <Link href="/newEvent" asChild>
          <TouchableOpacity>
            <Text style={{ color: "green" }}> Search more here</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  };

  if (loading && !refreshing) return <Loader size="small" />;
  if (error) {
    return (
      <View>
        <Text> Couldn't find the event requested. Search for more events?</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.searchContainer}>
        {/* Search bar */}
        <Ionicons name="search" size={20} styles={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for events..."
          autoCorrect={false}
          autoCapitalize="none"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
            }}
            style={styles.clearBtn}
          >
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <SortBy onSortChange={setSortOption} />
        <FilterBtn onLocationChange={filterByLocation} />
      </View>
      <View>

        <TouchableOpacity onPress={()=> router.push('/(auth)/index')}>
          <Text>Login</Text>
        </TouchableOpacity>
       
   
        <TouchableOpacity onPress={()=> router.push('/(auth)/signup')}>
          <Text>Signup</Text>
        </TouchableOpacity>
   
      </View>
      <FlatList
        data={getSortedEvents(filteredEvents)}
        renderItem={renderEvent}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: "70%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
}
