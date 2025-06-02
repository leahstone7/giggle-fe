import React from "react"
import {View} from "react-native"
import { Searchbar } from "react-native-paper"

function SearchEvents() {
const [searchQuery, setSearchQuery] = React.useState('')
return (
<Searchbar placeholder="Search for an event..." onChangeText={setSearchQuery} value={searchQuery}/>
)
}
export default SearchEvents