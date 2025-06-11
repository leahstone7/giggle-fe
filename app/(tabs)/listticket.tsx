import { getAllEvents, postTicket } from "@/utils/api";
import formatEventDate from "@/utils/dateUtils";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function ListTicket() {
  const { eventId } = useLocalSearchParams();

  const [eventData, setEventData] = useState([{ id: 0 }]);

  useEffect(() => {
    // setIsLoading(true);
    getAllEvents()
      .then((events) => {
        setEventData(events);
        // setIsLoading(false);
      })
      .catch((err) => {
        // setError(err.message || "Uh Oh! An error occured!");
        // setIsLoading(false);
      });
  }, []);

  const [ticketToAdd, setTicketToAdd] = useState({
    owner_username: "tester99",
    seating: "Seating",
    eventDetails: "6841ade2e789d40979e235ca",
    notes: "",
    hasBeenClaimed: false,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [postResponse, setPostResponse] = useState("");

  function handleChange(key, value) {
    setTicketToAdd((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    setHasSubmitted(true);

    postTicket(ticketToAdd)
      .then((ticket) => {
        setPostResponse("Your ticket has been listed");
      })
      .catch(() => {
        setPostResponse(
          "Sorry something went wrong, please try list ticket again"
        );
      });
  }

  //if comes from event page, use search params
  //otherwise, get event from our database and set eventId that way?
  //have a link to adding an event if you can't see it

  return (
    <View style={styles.container}>
      {hasSubmitted ? (
        <>
          <Text>{`${postResponse}`}</Text>
        </>
      ) : (
        <View>
          <Text style={styles.title}>Your event </Text>
          <Picker
            onValueChange={(value) => {
              handleChange("eventDetails", value);
            }}
          >
            {eventData.map((event) => {
              return (
                <Picker.Item
                  key={event._id}
                  label={
                    event.event_artist +
                    ", " +
                    event.event_location +
                    " on " +
                    formatEventDate(event.event_date)
                  }
                  value={event._id}
                />
              );
            })}
          </Picker>
          <Text style={styles.title}>Select seating type</Text>
          <Picker
            onValueChange={(value) => {
              handleChange("seating", value);
            }}
          >
            <Picker.Item label="Seating" value="Seating" />
            <Picker.Item label="Standing" value="Standing" />
          </Picker>
          <Text style={styles.title}>Anything else to add?</Text>
          <TextInput
            style={styles.input}
            value={ticketToAdd.notes}
            onChangeText={(text) => handleChange("notes", text)}
          />
          <Button title="Upload ticket" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 15,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    fontSize: 14,
    flexWrap: "wrap",
    flexShrink: 1,
    wordWrap: "wrap",
    width: "auto",
  },
});

export default ListTicket;
