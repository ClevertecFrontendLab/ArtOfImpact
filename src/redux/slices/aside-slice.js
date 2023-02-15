/* eslint-disable no-param-reassign */
/* eslint-disable  import/no-default-export */

import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const asideFetch = createAsyncThunk('/aside/asideFetch', async () => {
    const { data } = await axios.get('https://strapi.cleverland.by/api/categories')
    return data
})

const initialState = {
    asides: [],
}

export const asideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        setAside: (state, action) => {
            state.asides = action.payload
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

export const { setAside } = asideSlice.actions

export default asideSlice.reducer