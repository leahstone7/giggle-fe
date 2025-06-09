import axios from "axios";


const tmApi = axios.create({
  baseURL: "https://app.ticketmaster.com",
});
const apiKey = "God8qZUmwTZiQEscYjwuFJ6OVTnfLZO9";

const giggleApi = axios.create({
    baseURL: "https://giggle-api.onrender.com/api/"
})
//note david push had no forward slash after giggle api - in case this breaks and he forgets

export const getTMEventsByKeyword = (searchTerm) => {
  return tmApi
    .get(
      `discovery/v2/events.json?keyword=${searchTerm}&countryCode=GB&apikey=${apiKey}`
    )
    .then(({ data: { _embedded } }) => {
      return _embedded.events;
    });
};

export const getTMEventById = (tmEventId) => {
  return tmApi
    .get(`discovery/v2/events/${tmEventId}.json?apikey=${apiKey}`)
    .then(({ data }) => {
      return data;
    });
};

export const postNewEventToDb = (eventToAdd) => {
  return giggleApi.post(`events`, eventToAdd).then(() => {});
};


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

