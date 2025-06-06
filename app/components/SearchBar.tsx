import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";



function SearchEvents(  ){

    
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={styles.searchSectionWrapper} >
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} style={{marginRight: 5}}/>
            <TextInput placeholder="Search for events ..." />
        </View>
        <View>
            <TouchableOpacity onPress={()=> {console.log("button pressed")}} style={styles.filterBtn}>
                <Ionicons name="options" size={30} color={'black'}/>
            </TouchableOpacity>
            
        </View>
    
    </View>
  );
}
export default SearchEvents;

const styles=StyleSheet.create({
   searchSectionWrapper: {
    flexDirection: 'row',


   },
   searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efefef',
    padding: 16,
    borderRadius: 10,
    width: 300
    
   },

   filterBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#efefef',

   }
})