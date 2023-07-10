import axios, {AxiosInstance} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000
})

