import axios from "axios";

const giggleApi = axios.create({
    baseURL: "https://giggle-api.onrender.com/api/"
})

export const getAllEvents = () => {
    return giggleApi
    .get("/events")
    .then((res)=> {
        return res.data.events
    })
}


const apiClient = axios.create({baseURL: "https://giggle-api.onrender.com/api/"})

export const patchUser = (user_id, dataToUpdate) => {
    return apiClient.patch(`users/${user_id}`, dataToUpdate)
    .then(({data: {updatedUser}}) => {
        return updatedUser
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

export const getUserByUserId = (user_id) => {
    return apiClient.get(`users/${user_id}`)
    .then(({data: {user}}) => {
        return user
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

export const postTicket = ({owner_username, seating, eventDetails, notes, hasBeenClaimed}) => {
    return apiClient.post("tickets", {owner_username, seating, eventDetails, notes, hasBeenClaimed} )
    .then(({data: {ticket}}) => {
        return ticket
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}