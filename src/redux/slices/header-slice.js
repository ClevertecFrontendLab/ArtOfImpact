/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    burger: false,
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        toggleBurger: (state, action) => {
            state.burger = action.payload
        },
    },
})

export const { toggleBurger } = headerSlice.actions

export const { reducer } = headerSlice