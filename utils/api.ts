import axios from "axios";

const tmApi = axios.create({
  baseURL: "https://app.ticketmaster.com",
});
const apiKey = "God8qZUmwTZiQEscYjwuFJ6OVTnfLZO9";

const giggleApi = axios.create({
  baseURL: "https://giggle-api.onrender.com/api",
});

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
