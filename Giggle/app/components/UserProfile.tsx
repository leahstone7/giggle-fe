import React, { useState } from "react"
import { View, Text, StyleSheet, Image } from 'react-native'


function UserProfile(){
const [user, setUser] = useState({
    username: "giggleFan",
    emailAddress: "giggleFan@gmail.com",
    profilePicture: "examplelink",
    concertInterests: "dancing, close to front, get there early"
})
// const []

return (
<View>
<Image />
</View>
)

}


export default UserProfile