/* eslint-disable  import/no-default-export */
/* eslint-disable no-param-reassign */

import axios from "axios"
import { BASE_URL } from "./host-url"

const urlSkipJwt = [
    "/api/auth/local/register",
    "/api/auth/local",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
]

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
})

$api.interceptors.request.use((config) => {

    if (config.url && urlSkipJwt.includes(config.url)) {
        return config
    }

    const accessToken = localStorage.getItem("token")

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})



export default $api

