import { getAllEvents, postTicket } from "@/utils/api";
import formatEventDate from "@/utils/dateUtils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function ListTicket() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [postResponse, setPostResponse] = useState("");
  const [selectedValue, setSelectedValue] = useState(eventId);

  useEffect(() => {
    setIsLoading(true);
    getAllEvents()
      .then((events) => {
        setEventData(
          events.sort((a, b) => {
            return a.event_artist.localeCompare(b.event_artist);
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Uh Oh! An error occured!");
        setIsLoading(false);
      });
  }, []);

  const [ticketToAdd, setTicketToAdd] = useState({
    owner_username: "tester99",
    seating: "Seating",
    eventDetails: "6841ade2e789d40979e235ca",
    notes: "",
    hasBeenClaimed: false,
  });

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

  function handlePressNewEventLink() {
    router.push({
      pathname: "/newEvent",
    });
  }

  return (
    <View style={styles.container}>
      {hasSubmitted ? (
        <>
          <Text>{`${postResponse}`}</Text>
        </>
      ) : (
        <View>
          <Text style={styles.title}>Your event </Text>
          {isLoading ? (
            <Text>Loading events...</Text>
          ) : (
            <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value);
                handleChange("eventDetails", value);
              }}
            >
              {eventData.map((event) => {
                return (
                  <Picker.Item
                    key={event._id}
                    label={
                      formatEventDate(event.event_date) +
                      ": " +
                      event.event_artist +
                      ", " +
                      event.event_location
                    }
                    value={event._id}
                  />
                );
              })}
            </Picker>
          )}
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <MaterialIcons
              name="switch-access-shortcut-add"
              size={24}
              color="black"
            />
            <Text style={styles.buttonText}>Upload ticket</Text>
          </TouchableOpacity>

          <View style={styles.bottomPage}>
            <TouchableOpacity
              style={styles.buttonAddEvent}
              onPress={handlePressNewEventLink}
            >
              <MaterialCommunityIcons name="reminder" size={24} color="black" />
              <Text style={styles.buttonText}>
                {" "}
                Can't find your event? Add it to Giggle!
              </Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
    padding: 5,
    fontWeight: "bold",
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
  button: {
    backgroundColor: "#ADC178",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 15,
    // fontWeight: "500",
  },
  buttonAddEvent: {
    backgroundColor: "#f194ff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 15,
  },
  bottomPage: {
    justifyContent: "flex-end",
  },
});

export default ListTicket;
