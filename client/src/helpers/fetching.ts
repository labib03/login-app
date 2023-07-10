import axios, {AxiosInstance, AxiosResponse} from "axios";
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

/** login function */
export async function verifyPassword({username, password}) {
    try {
        if (username) {
            const {data} = await api.post('/api/login', {username, password})
            return Promise.resolve({data});
        }
    } catch (error) {
        return Promise.reject({error: "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response) {
    try {

        const token = await localStorage.getItem('token');
        const data: AxiosResponse<ResponseFetchType> = await api.put('/api/updateuser', response, {headers: {"Authorization": `Bearer ${token}`}});

        return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error: "Couldn't Update Profile...!"})
    }
}