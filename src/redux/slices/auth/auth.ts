/* eslint-disable no-param-reassign */
/* eslint-disable  import/no-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AutoService from '../../../pages/http/auto-service'

interface LoginParams {
    identifier: string,
    password: string,
}

interface RegistrationParams {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
}

interface EmailParams {
    email: string,
}

interface PasswordParams {
    password: string,
    passwordConfirmation: string,
    code: string
}

export const loginFetch = createAsyncThunk('/auth/loginFetch', async (params: LoginParams, thunkAPI) => {
    const { identifier, password } = params
    const { data } = await AutoService.login(identifier, password)
    window.localStorage.setItem("token", data.jwt)
    return data
})

export const registrationFetch = createAsyncThunk('/auth/registrationFetch', async (params: RegistrationParams) => {
    const { email, username, password, firstName, lastName, phone } = params
    const { data } = await AutoService.registration(email, username, password, firstName, lastName, phone)
    return data
})

export const emailFetch = createAsyncThunk('/auth/emailFetch', async (params: EmailParams) => {
    const { email } = params
    const { data } = await AutoService.email(email)
    return data
})

export const resetFetch = createAsyncThunk('/auth/resetFetch', async (params: PasswordParams) => {
    const { password, passwordConfirmation, code } = params
    const { data } = await AutoService.password(password, passwordConfirmation, code)
    return data
})


const initialState = {
    statusRecovery: "email",
    statusAuthorization: "login",
    statusRegistration: "registration",
    errorValueEmail: "",
    statusLoading: false,
    invalidData: false,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStatusRecovery: (state, action) => {
            state.statusRecovery = action.payload
        },
        setStatusAuthorization: (state, action) => {
            state.statusAuthorization = action.payload
        },
        setStatusRegistration: (state, action) => {
            state.statusRegistration = action.payload
        },
        setStatusLoading: (state, action) => {
            state.statusLoading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginFetch.pending, (state) => {
            state.statusLoading = true
            state.token = null;
        });
        builder.addCase(registrationFetch.pending, (state) => {
            state.statusLoading = true
        });
        builder.addCase(emailFetch.pending, (state) => {
            state.errorValueEmail = ""
            state.statusLoading = true
        });
        builder.addCase(resetFetch.pending, (state) => {
            state.statusLoading = true
        });
        builder.addCase(loginFetch.fulfilled, (state, action) => {
            state.invalidData = false
            state.token = action.payload.jwt;
            state.statusLoading = false
            window.location.hash = "/books/all"
        });
        builder.addCase(registrationFetch.fulfilled, (state, action) => {
            state.statusRegistration = "success"
            state.statusLoading = false
        });
        builder.addCase(emailFetch.fulfilled, (state, action) => {
            state.statusRecovery = "send"
            state.statusLoading = false
        });
        builder.addCase(resetFetch.fulfilled, (state, action) => {
            state.statusRecovery = "success"
            state.statusLoading = false
        });
        builder.addCase(loginFetch.rejected, (state, action) => {
            if (action.error.message !== "Request failed with status code 400") {
                state.statusAuthorization = "error"
                state.statusLoading = false
            } else if (action.error.message === "Request failed with status code 400") {
                state.invalidData = true
                state.statusLoading = false
            }
            state.token = null;
        });
        builder.addCase(registrationFetch.rejected, (state, action) => {
            if (action.error.message !== "Request failed with status code 400") {
                state.statusRegistration = "error"
                state.statusLoading = false
            } else if (action.error.message === "Request failed with status code 400") {
                state.statusRegistration = "coincidences"
                state.statusLoading = false
            }
        });
        builder.addCase(emailFetch.rejected, (state, action) => {
            state.errorValueEmail = "error"
            state.statusLoading = false
        });
        builder.addCase(resetFetch.rejected, (state, action) => {
            state.statusRecovery = "error"
            state.statusLoading = false
        });
    }
})

export const { setStatusRecovery, setStatusAuthorization, setStatusRegistration, setStatusLoading } = authSlice.actions

export default authSlice.reducer