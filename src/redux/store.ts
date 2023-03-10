import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { reducer } from './slices/header/header-slice'
import asideReducer from './slices/aside/aside-slice'
import contentReducer from './slices/content/content-slice'
import authReducer from './slices/auth/auth'


export const store = configureStore({
    reducer: {
        header: reducer,
        aside: asideReducer,
        content: contentReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export const aside = store.getState().aside.asides
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()