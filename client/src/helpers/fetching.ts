import axios, {AxiosInstance} from "axios";
import {ResponseFetchType} from "../types/fetching.ts";
import {BASE_URL} from "../datas/variables.ts";

type ResponseProps = {
    data: ResponseFetchType
    status: number
}

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})


/** register user function */
export async function registerUser(credentials) {
    try {
        const {data, status}: ResponseProps = await api.post(`/api/register`, credentials);

        let {username, email} = credentials;
        const {message} = data

        /** send email */
        if (status === 201) {
            await api.post('/api/registerMail', {username, userEmail: email, text: message})
        }

        return Promise.resolve(message || 'Success')
    } catch (error) {
        return Promise.reject({error})
    }
}