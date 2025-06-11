import formatEventDate from "@/utils/dateUtils";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { postNewEventToDb } from "../../utils/api";

function TmEventsList({ tmEvents, setHasPostedEvent }) {
  //below array useful for testing when we hit the ticketmaster time out!
  // const testStaticArray = [
  //   {
  //     event_artist: "Bruce Springsteen",
  //     event_location: "Leeds",
  //     event_date: "2027-06-01T00:20:00Z",
  //     event_venue: "Brudenell Social Club",
  //     event_img:
  //       "https://images.unsplash.com/photo-1713279766640-6ec28b7c8c4c?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     event_artist: "Megan Thee Stallion",
  //     event_location: "Manchester",
  //     event_date: "2027-07-01T00:20:00Z",
  //     event_venue: "O2 Apollo",
  //     event_img:
  //       "https://plus.unsplash.com/premium_vector-1737592300491-4cb3d2faee48?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3",
  //   },
  //   {
  //     event_artist: "Nick Cave",
  //     event_location: "London",
  //     event_date: "2027-08-01T00:20:00Z",
  //     event_venue: "Alexandra Palace",
  //     event_img:
  //       "https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_ARTIST_PAGE_3_2.jpg",
  //   },
  //   {
  //     event_artist: "Father John Misty",
  //     event_location: "Liverpool",
  //     event_date: "2028-04-31T00:20:00Z",
  //     event_venue: "Anfield Stadium",
  //     event_img:
  //       "https://media.gettyimages.com/id/455935316/photo/angel-olsen-performs-at-the-brudenell-social-club-in-leeds.jpg?s=1024x1024&w=gi&k=20&c=vMX53hHUtblCsMUBvGHxmkGkKelI-jvsDBe8qDYiE04=",
  //   },
  // ];

  const addNewEvent = (item) => {
    setHasPostedEvent(true);
    return postNewEventToDb(item).then(() => {});
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.artist}>{item.event_artist}</Text>
        <View style={styles.container}>
          <View>
            <Text style={styles.item}>{item.event_venue}</Text>
            <Text style={styles.item}>{item.event_location}</Text>
            <Text style={styles.item}>{formatEventDate(item.event_date)}</Text>
          </View>
          <Image
            style={styles.eventImg}
            source={{
              uri: `${item.event_img}`,
            }}
          ></Image>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addNewEvent(item);
          }}
        >
          <Entypo name="add-to-list" size={16} color="black" />
          <Text>Add to Giggle </Text>

          {/* <Ionicons name="pluscircle" size={20} style={{marginRight: 5}}/> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        // horizontal={true}
        scrollEnabled={false}
        data={tmEvents}
        renderItem={renderItem}
      />
    </View>
  );
}
export default TmEventsList;

const styles = StyleSheet.create({
  container: {
    flex: 1, // the number of columns you want to divide the screen into
    // maxWidth: '50%',
    flexDirection: "row",
    // marginHorizontal: "auto",
    justifyContent: "space-between",
  },
  artist: {
    backgroundColor: "rgb(193, 213, 193)",
    color: "black",
    padding: 10,
    marginBlockStart: 10,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "transparent",
    color: "black",
    padding: 2,
    paddingHorizontal: 14,
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#ADC178",
    marginBottom: 5,
    color: "black",
    padding: 10,
    margin: 10,
    marginHorizontal: 100,
    alignItems: "center",
    borderRadius: "1rem",
  },
  eventImg: {
    width: 170,
    height: 170,
    resizeMode: "cover",
    alignItems: "flex-end",
  },
});
