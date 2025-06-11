
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getEventById } from '@/utils/api'

export default function EventDetails() {
  const { eventId } = useLocalSearchParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const router = useRouter()

  
  type Event = {
    _id: string
    event_artist: string
    event_location: string
    event_venue: string
    event_date: string
    event_img: string
  };
  
  
  
  function handleViewTickets(){
    
  }
  
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
        <Text style={styles.artist}>{event.event_artist}</Text>
        <Text style={styles.venue}>Playing: {event.event_venue}, {event.event_location}</Text>
        <Text style={styles.date} >At: {formattedDate}, {formattedTime}</Text>
        <View style={styles.buttonContainer}>
          {/* <Button title="View Available Tickets" onPress={handleViewTickets} style={styles.button}/>

          <Button title="List Your Spare Ticket" onPress={handleListTicket} style={styles.button}/> */}
          <TouchableOpacity style={styles.button} onPress={handleViewTickets}> <Text style={styles.buttonText}>View Available Tickets</Text></TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleListTicket}> <Text style={styles.buttonText}>List Your Spare Ticket</Text></TouchableOpacity>
        </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
image: {
  width: "100%",
  height: 250,
  marginBottom: 16,

},
container: {
flex: 1,
alignItems: 'center',
padding: 15
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