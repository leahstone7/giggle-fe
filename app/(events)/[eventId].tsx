// import { View, Text } from 'react-native'
// import React from 'react'
// import { useLocalSearchParams } from 'expo-router'

// export default function EventDetails() {

//     const {id} = useLocalSearchParams();
//   return (
//     <View>
//       <Text>Event details: {id}</Text>
//     </View>
//   )
// }

import { getEventById, getTicketsByEventId } from "@/utils/api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [availableTickets, setAvailableTickets] = useState([]);
  const [wantsToViewTickets, setWantsToViewTickets] = useState(false);

  type Event = {
    _id: string;
    event_artist: string;
    event_location: string;
    event_venue: string;
    event_date: string;
  };

  function handleViewTickets() {
    setWantsToViewTickets(true);
    return getTicketsByEventId(eventId).then((tickets) => {
      setAvailableTickets(
        tickets.sort((a, b) => a.hasBeenClaimed - b.hasBeenClaimed)
      );
    });
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          item.hasBeenClaimed ? styles.listClaimed : styles.listUnclaimed,
        ]}
      >
        <Text
          style={[
            item.hasBeenClaimed
              ? styles.seatingClaimed
              : styles.seatingUnclaimed,
          ]}
        >
          {item.hasBeenClaimed ? (
            item.seating === "Seating" ? (
              <MaterialIcons name="chair" size={30} color="grey" />
            ) : (
              <FontAwesome6 name="person" size={30} color="grey" />
            )
          ) : item.seating === "Seating" ? (
            <MaterialIcons name="chair" size={30} color="black" />
          ) : (
            <FontAwesome6 name="person" size={30} color="black" />
          )}
        </Text>
        <Text
          style={[
            item.hasBeenClaimed
              ? styles.seatingClaimed
              : styles.seatingUnclaimed,
          ]}
        >
          {item.seating}
          {" Ticket"}
        </Text>
        <View
          style={[
            item.hasBeenClaimed
              ? styles.containerClaimed
              : styles.containerUnclaimed,
          ]}
        >
          <View>
            <Text
              style={[
                item.hasBeenClaimed ? styles.itemClaimed : styles.itemUnclaimed,
              ]}
            >
              <MaterialCommunityIcons
                name="ticket-account"
                size={18}
                color="black"
              />
              {"  Ticket donated by: "}
              {item.owner_username}
            </Text>
            {item.notes ? (
              <Text
                style={[
                  item.hasBeenClaimed
                    ? styles.itemClaimed
                    : styles.itemUnclaimed,
                ]}
              >
                <FontAwesome name="quote-left" size={18} color="black" />{" "}
                {item.notes}{" "}
                <FontAwesome name="quote-right" size={18} color="black" />
              </Text>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          style={[
            item.hasBeenClaimed ? styles.buttonClaimed : styles.buttonUnclaimed,
          ]}
          onPress={() => {
            //see owner page
          }}
        >
          {item.hasBeenClaimed ? (
            <Text style={{ color: "grey" }}>Ticket has been taken</Text>
          ) : (
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Interested? It's still available!
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  function handleListTicket() {}

  useEffect(() => {
    setLoading(true);
    setError(false);

    getEventById(eventId)
      .then((event) => {
        setEvent(event);
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Something went wrong.</Text>;
  if (!event) return <Text>No event found.</Text>;

  return (
    <ScrollView>
      <Image source={{ uri: event.event_img }} />
      <View>
        <Text>{event.event_artist}</Text>
        <Text>
          {event.event_venue}
          {event.event_location}
        </Text>
        <Text>{new Date(event.event_date).toString()}</Text>
        <View>
          <Button title="View Available Tickets" onPress={handleViewTickets} />
          <Button title="List Your Spare Ticket" onPress={handleListTicket} />
        </View>
      </View>
      <View>
        {wantsToViewTickets ? (
          availableTickets.length > 0 ? (
            <View>
              <FlatList
                // horizontal={true}
                scrollEnabled={false}
                data={availableTickets}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <Text>We are sorry, no one has a spare ticket yet!</Text>
          )
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listUnclaimed: {
    backgroundColor: "rgb(193, 213, 193)",
    padding: 0,
    marginBlockStart: 8,
    width: "80%",
    height: "auto",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "rgb(108, 88, 76)",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderWidth: 3,
  },
  listClaimed: {
    backgroundColor: "rgb(240, 234, 210)",
    padding: 0,
    marginBlockStart: 8,
    width: "80%",
    height: "auto",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "rgb(169, 132, 103)",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderWidth: 3,
  },
  containerClaimed: {
    flex: 1, 
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(240, 234, 210)",
  },
  containerUnclaimed: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(193, 213, 193)",
  },
  seatingUnclaimed: {
    backgroundColor: "rgb(193, 213, 193)",
    color: "black",
    padding: 2,
    marginBlockStart: 2,
    fontWeight: "bold",
    fontSize: 20,
  },
  seatingClaimed: {
    backgroundColor: "rgb(240, 234, 210)",
    color: "grey",
    padding: 2,
    marginBlockStart: 2,
    fontWeight: "bold",
    fontSize: 20,
  },
  itemUnclaimed: {
    backgroundColor: "transparent",
    color: "black",
    padding: 5,
    paddingHorizontal: 14,
    alignItems: "flex-start",
    fontSize: 15,
  },
  itemClaimed: {
    backgroundColor: "transparent",
    color: "grey",
    padding: 5,
    paddingHorizontal: 14,
    alignItems: "flex-start",
    fontSize: 15,
  },

  buttonUnclaimed: {
    backgroundColor: "#ADC178",
    marginBottom: 5,
    color: "black",
    padding: 5,
    margin: 5,
    marginHorizontal: 50,
    alignItems: "center",
    alignContent: "center",
    borderRadius: "1rem",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonClaimed: {
    backgroundColor: "rgb(221, 229, 182)",
    marginBottom: 5,
    color: "grey",
    padding: 5,
    margin: 5,
    marginHorizontal: 50,
    alignItems: "center",
    borderRadius: "1rem",
  },
});
