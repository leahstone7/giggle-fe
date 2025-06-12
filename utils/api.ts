import axios from "axios";
import Constants from "expo-constants";
const apiKey =
  Constants.manifest?.extra?.API_KEY || Constants.expoConfig?.extra?.API_KEY;
//manifest is deprecated but at the moment works better, have put expoConfig alternative in here too for future

const tmApi = axios.create({
  baseURL: "https://app.ticketmaster.com",
});

const giggleApi = axios.create({
  baseURL: "https://giggle-api.onrender.com/api/",
});

export const getTMEventsByKeyword = (searchTerm) => {
  return tmApi
    .get(
      `discovery/v2/events.json?keyword=${searchTerm}&countryCode=GB&apikey=${apiKey}`
    )
    .then(({ data: { _embedded } }) => {
      if (_embedded === undefined) {
        return undefined;
      } else return _embedded.events;
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
  return giggleApi.get("/events").then((res) => {
    return res.data.events;
  });
};

export const patchUser = (user_id, dataToUpdate) => {
  return giggleApi
    .patch(`users/${user_id}`, dataToUpdate)
    .then(({ data: { updatedUser } }) => {
      return updatedUser;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getUserByUserId = (user_id) => {
  return giggleApi
    .get(`users/${user_id}`)
    .then(({ data: { user } }) => {
      return user;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getEventById = (_id) => {
  return giggleApi
    .get(`events/${_id}`)
    .then(({ data: { event } }) => {
      return event;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const postTicket = ({
  owner_username,
  seating,
  eventDetails,
  notes,
  hasBeenClaimed,
}) => {
  return giggleApi
    .post("tickets", {
      owner_username,
      seating,
      eventDetails,
      notes,
      hasBeenClaimed,
    })
    .then(({ data: { ticket } }) => {
      return ticket;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getTicketsByEventId = (eventId) => {
  return giggleApi
    .get(`tickets/events/${eventId}`)
    .then(({ data: { tickets } }) => {
      return tickets;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getUserByUserName = (username) => {
  return giggleApi
    .get(`users/username/${username}`)
    .then(({ data: { user } }) => {
      return user;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
