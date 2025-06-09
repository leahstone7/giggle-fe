import axios from "axios";

const tmApi = axios.create({
  baseURL: "https://app.ticketmaster.com",
});

const apiKey = "God8qZUmwTZiQEscYjwuFJ6OVTnfLZO9";

export const getTMEventsByKeyword = (searchTerm) => {
  return tmApi
    .get(`discovery/v2/events.json?keyword=${searchTerm}&countryCode=GB&apikey=${apiKey}`)
    .then(({data:{_embedded}}) => {
      return _embedded.events;
    });
};
