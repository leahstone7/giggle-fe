import { getEventById, getTicketsByEventId } from "@/utils/api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useLocalSearchParams, useRouter } from "expo-router";
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

        
  const router = useRouter()
  
  type Event = {
    _id: string
    event_artist: string
    event_location: string
    event_venue: string
    event_date: string
    event_img: string
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
           // ticket lister page profile
           router.push({
            pathname: '/(profiles)/[username]',
            params: {username: item.owner_username}
           })
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


  
  function handleListTicket(){
    router.push({
      pathname: "/listticket",
      params: { eventId: event._id}
    })
  }
  
  useEffect(() => {
    setLoading(true)
    setError(false)
    
    getEventById(eventId)
    .then((event) => {
      setEvent(event)
    })
    .catch((err) => {
      console.error("Failed to load event:", err)
      setError(true)
    })
    .finally(() => setLoading(false))
  }, [eventId])
  
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Something went wrong.</Text>
  if (!event) return <Text>No event found.</Text>
  
  const formattedDate = new Date(event.event_date).toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  })

  const formattedTime = new Date(event.event_date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
  

  return (
    <ScrollView >
      <View style={styles.container}>
      <Image
      source={{ uri: event.event_img }}
      resizeMode="cover"
      style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.artist}>{event.event_artist}</Text>
        <Text style={styles.venue}>Playing: {event.event_venue}, {event.event_location}</Text>
        <Text style={styles.date} >{formattedDate}, {formattedTime}</Text>
      </View>
        <View style={styles.buttonContainer}>
      
          <TouchableOpacity style={styles.button} onPress={handleViewTickets}> <Text style={styles.buttonText}>View Available Tickets</Text></TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleListTicket}> <Text style={styles.buttonText}>List Your Spare Ticket</Text></TouchableOpacity>

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
image: {
  width: "100%",
  height: 250,
  marginBottom: 16,

},
container: {
flex: 1,
alignItems: 'center',
padding: 15,
},
textContainer: {
flex: 1,
alignItems: 'center',
padding: 15,
},
artist: {
fontWeight: 'bold',
fontSize: 20,
marginBottom: 6
},
venue: {
fontSize: 18,
marginBottom: 6,
},
date : {
fontSize: 18,
marginBottom: 6,
},
buttonContainer: {
justifyContent: 'space-between',
padding: 8,
},
button: {
  backgroundColor:"#DDE5B6",
  paddingVertical: 12,
  paddingHorizontal: 20,
  marginTop: 10,
  alignItems: "center",
},

buttonText: {
  fontSize: 16,
  fontWeight: "500",
},
})

