import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { reducer } from './slices/header/header-slice'
import asideReducer from './slices/aside/aside-slice'
import contentReducer from './slices/content/content-slice'


export const store = configureStore({
    reducer: {
        header: reducer,
        aside: asideReducer,
        content: contentReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()