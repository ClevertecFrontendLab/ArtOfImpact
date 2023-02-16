import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './slices/header-slice'
import asideReducer from './slices/aside-slice'
import contentReducer from './slices/content-slice'

export const store = configureStore({
    reducer: {
        header: reducer,
        aside: asideReducer,
        content: contentReducer
    },
})

