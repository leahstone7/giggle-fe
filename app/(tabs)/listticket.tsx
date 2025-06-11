 import React, {useState} from "react"
 import {
   StyleSheet,
   Text,
   TextInput,
   View,
   Button
 } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { postTicket } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";

 function ListTicket(){
    const { eventId } = useLocalSearchParams()

    const [ticketToAdd, setTicketToAdd] = useState({
        owner_username: "tester99",
        seating: "Seating",
        eventDetails: "6841ade2e789d40979e235ca",
        notes: "",
        hasBeenClaimed: false
    })

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [postResponse, setPostResponse] = useState("")

    function handleChange(key, value){
        setTicketToAdd((prev) => ({...prev, [key]: value}))
        console.log("Value changed")
    }

    function handleSubmit(){
        setHasSubmitted(true)
        console.log(ticketToAdd, "<<<")
        postTicket(ticketToAdd)
        .then((ticket) => {
            setPostResponse("Your ticket has been listed")
        })
        .catch(() => {
            setPostResponse("Sorry something went wrong, please try list ticket again")
        })
    }

    return (
        <View style={styles.container}>
        {hasSubmitted ? (
            <>
            <Text>{`${postResponse}`}</Text>
            </>
             ) : (

        <View>
            <Text style={styles.title}>Select seating type</Text>
            <Picker onValueChange={(value) => {handleChange("seating", value)}}>
                <Picker.Item label="Seating" value="Seating"/>
                <Picker.Item label="Standing" value="Standing"/>
            </Picker>
            <Text style={styles.title}>Anything else to add?</Text>
            <TextInput 
            style={styles.input} 
            value={ticketToAdd.notes}
            onChangeText={(text) => handleChange("notes", text)}
            />
           <Button title="Upload ticket" onPress={handleSubmit}/> 
        </View>
            )}
        </View> 
    )

 }

 const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(253, 252, 242)",
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
    flexWrap: 'wrap',
    flexShrink: 1,
    wordWrap: 'wrap',
    width: 'auto'
}
 })

 export default ListTicket