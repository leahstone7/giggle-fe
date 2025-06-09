import axios from "axios";

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