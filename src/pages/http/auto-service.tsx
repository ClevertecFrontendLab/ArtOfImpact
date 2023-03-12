/* eslint-disable  import/no-default-export */
import { AxiosResponse } from "axios";
import $api from ".";



export default class AutoService {
    static async login(identifier: string, password: string): Promise<AxiosResponse<any>> {
        return $api.post("/api/auth/local", { identifier, password })
    }

    static async registration(email: string, username: string, password: string, firstName: string, lastName: string, phone: string): Promise<AxiosResponse<any>> {
        return $api.post("/api/auth/local/register", { username, password, firstName, lastName, phone, email })
    }

    static async email(email: string): Promise<AxiosResponse<any>> {
        return $api.post("/api/auth/forgot-password", { email })
    }

    static async password(password: string, passwordConfirmation: string, code: string): Promise<AxiosResponse<any>> {
        return $api.post("/api/auth/reset-password", { password, passwordConfirmation, code })
    }

}