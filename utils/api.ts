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