/* eslint-disable no-param-reassign */
/* eslint-disable  import/no-default-export */
import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const contentFetch = createAsyncThunk('/content/contentFetch', async () => {
    const { data } = await axios.get('https://strapi.cleverland.by/api/books')
    return data
})

export const filterFetch = createAsyncThunk('/content/filterFetch', async (params) => {
    const { name } = params
    const { data } = await axios.get('https://strapi.cleverland.by/api/books')
    const result = data.filter((el) => el.categories[0] === name)
    return result
})

export const bookFetch = createAsyncThunk('/content/bookFetch', async (params) => {
    const { id } = params
    const { data } = await axios.get(`https://strapi.cleverland.by/api/books/${id.bookId}`)
    return data
})

const initialState = {
    content: [],
    book: [],
    status: "loading",
    isOpenMenu: false,
    countBooks: [
        { count: 0, path: 'business', id: 0 },
        { count: 0, path: 'psychology', id: 1 },
        { count: 0, path: 'parents', id: 2 },
        { count: 0, path: 'non-fiction', id: 3 },
        { count: 0, path: 'fiction', id: 4 },
        { count: 0, path: 'programming', id: 5 },
        { count: 0, path: 'hobby', id: 6 },
        { count: 0, path: 'design', id: 7 },
        { count: 0, path: 'childish', id: 8 },
        { count: 0, path: 'other', id: 9 },
    ]
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addContent: (state, action) => {
            state.state = action.payload
        },
        setIsOpenMenu: (state, action) => {
            state.isButton = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(contentFetch.pending, (state) => {
            state.content = [];
            state.status = 'loading';
        });
        builder.addCase(bookFetch.pending, (state) => {
            state.book = [];
            state.status = 'loading';
        });
        builder.addCase(filterFetch.pending, (state) => {
            state.content = [];
            state.status = 'loading';
        });
        builder.addCase(contentFetch.fulfilled, (state, action) => {
            state.countBooks[0].count = action.payload.filter((el) => el.categories[0] === 'Бизнес').length
            state.countBooks[1].count = action.payload.filter((el) => el.categories[0] === 'Психология').length
            state.countBooks[2].count = action.payload.filter((el) => el.categories[0] === 'Родителям').length
            state.countBooks[3].count = action.payload.filter((el) => el.categories[0] === 'Нон-фикшн').length
            state.countBooks[4].count = action.payload.filter((el) => el.categories[0] === 'Художественная литература').length
            state.countBooks[5].count = action.payload.filter((el) => el.categories[0] === 'Программирование').length
            state.countBooks[6].count = action.payload.filter((el) => el.categories[0] === 'Хобби').length
            state.countBooks[7].count = action.payload.filter((el) => el.categories[0] === 'Дизайн').length
            state.countBooks[8].count = action.payload.filter((el) => el.categories[0] === 'Детские').length
            state.countBooks[9].count = action.payload.filter((el) => el.categories[0] === 'Другое').length
            state.content = action.payload;
            state.isOpenMenu = true;
            state.status = 'success';
        });
        builder.addCase(bookFetch.fulfilled, (state, action) => {
            state.book = action.payload
            state.status = 'success';
        });
        builder.addCase(filterFetch.fulfilled, (state, action) => {
            state.content = action.payload
            state.isOpenMenu = true;
            state.status = 'success';
        });
        builder.addCase(contentFetch.rejected, (state) => {
            state.status = 'error';
            state.content = [];
            state.isOpenMenu = false;
            console.log('error')
        });
        builder.addCase(bookFetch.rejected, (state) => {
            state.status = 'error';
            state.book = [];
            console.log('error')
        });
        builder.addCase(filterFetch.rejected, (state) => {
            state.status = 'error';
            state.content = [];
            state.isOpenMenu = false;
            console.log('error')
        });
    }
})

export const { addContent, setIsOpenMenu } = contentSlice.actions

export default contentSlice.reducer