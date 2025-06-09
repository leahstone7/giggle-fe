import { getAllEvents } from "@/utils/api";
import formatEventDate from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Loader from "../components/loader";

type Event = {
  _id: string;
  event_artist: string;
  event_location: string;
  event_venue: string;
  event_date: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEvents = (pageNum = 1, refresh = false) => {
    if (refresh) setRefreshing(true);
    else if (pageNum === 1) setLoading(true);

    getAllEvents()
      .then((events) => {
        setEvents(events);
        setPage(pageNum);
      })
      .catch((error) => {
        console.log("Failet to find events", error);
        setError(true);
      })
      .finally(() => {
        if (refresh) setRefreshing(false);
        else setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading && !refreshing) {
      fetchEvents(page + 1);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Image
        source={require("../assets/images/login-logo.png")}
        style={{
          width: "30%",
          height: "30%",
          aspectRatio: 1,
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          paddingTop: 16,
          paddingLeft: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {item.event_artist}
        </Text>
        <Text>{item.event_location}.</Text>
        <Text>{item.event_venue}.</Text>
        <Text>{formatEventDate(item.event_date)}</Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 5,
            paddingBottom: 12
          }}
          onPress={()=> {console.log("Find tickets pressed")}}
        >
          <Ionicons name="ticket-outline" size={20}  style={{marginRight: 8}} />
          <Text style={{fontSize: 16}}>Find tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) return <Loader size="small" />;

  return (
    <View>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchEvents(1, true)}
          />
        }
        ListFooterComponent={
          loading && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </View>
  );
}
