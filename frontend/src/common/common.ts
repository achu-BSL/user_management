import axios from "axios";

export const baseUrl = "http://localhost:3000";

export const axiosInstance =  axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})