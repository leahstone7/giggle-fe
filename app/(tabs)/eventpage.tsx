import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getEventById } from '@/utils/api'

export default function EventDetails() {
  const { eventId } = useLocalSearchParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  type Event = {
  _id: string
  event_artist: string
  event_location: string
  event_venue: string
  event_date: string
};


  function handleViewTickets(){
    
  }

  function handleListTicket(){

  }

  useEffect(() => {
    setLoading(true)
    setError(false)

    getEventById(eventId)
      .then(setEvent)
      .catch((err) => {
        console.error("Failed to load event:", err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [eventId])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Something went wrong.</Text>
  if (!event) return <Text>No event found.</Text>

  return (
    <ScrollView>
      <Image source={{ uri: event.event_img }} />
      <View>
        <Text >{event.event_artist}</Text>
        <Text >{event.event_venue}{event.event_location}</Text>
        <Text >{new Date(event.event_date).toString()}</Text>
        <View>
          <Button title="View Available Tickets" onPress={handleViewTickets} />
          <Button title="List Your Spare Ticket" onPress={handleListTicket} />
        </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})