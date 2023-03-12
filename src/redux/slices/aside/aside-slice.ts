/* eslint-disable no-param-reassign */
/* eslint-disable  import/no-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Asides, AsideSliceState } from "./aside-type";
import UserService from "../../../pages/http/users-service";

interface TokenCategories {
    token: string
}

export const asideFetch = createAsyncThunk('/aside/asideFetch', async (params: TokenCategories) => {
    const { data } = await UserService.fetchCategories()
    return data
})


const initialState: AsideSliceState = {
    asides: [],
    activeNumber: 0,
}

export const asideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        setAside: (state, action) => {
            state.asides = action.payload
        },
        setActiveNumber: (state, action) => {
            state.activeNumber = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asideFetch.pending, (state) => {
            state.asides = [];
        });
        builder.addCase(asideFetch.fulfilled, (state, action) => {
            state.asides = action.payload
        });
        builder.addCase(asideFetch.rejected, (state) => {
            state.asides = [];
            console.log('error')
        });
    }
})

export const { setAside, setActiveNumber } = asideSlice.actions

export default asideSlice.reducer