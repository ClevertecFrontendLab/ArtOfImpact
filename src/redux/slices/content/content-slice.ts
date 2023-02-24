/* eslint-disable no-param-reassign */
/* eslint-disable  import/no-default-export */
import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type } from "os";
import { BookFetch, ContentSliceState, IContent } from "./content-type";
import { Asides } from "../aside/aside-type";


export const contentFetch = createAsyncThunk('/content/contentFetch', async () => {
    const { data } = await axios.get('https://strapi.cleverland.by/api/books')
    return data
})


export const filterFetch = createAsyncThunk('/content/filterFetch', async (params: Asides) => {
    const { name } = params
    const { data } = await axios.get('https://strapi.cleverland.by/api/books')
    const result = data.filter((el: IContent) => el.categories[0] === name)
    return [result, data]
})


export const bookFetch = createAsyncThunk('/content/bookFetch', async (params: BookFetch) => {
    const { bookId } = params
    const { data } = await axios.get(`https://strapi.cleverland.by/api/books/${bookId}`)
    return data
})

const initialState: ContentSliceState = {
    content: [],
    book: {
        ISBN: "",
        authors: [""],
        booking: null,
        categories: [""],
        comments: null,
        cover: "",
        delivery: null,
        description: "",
        format: "",
        histories: null,
        images: null,
        id: 0,
        issueYear: "",
        pages: "",
        producer: "",
        publish: "",
        rating: null,
        title: "",
        weight: "",
    },
    status: "loading",
    isOpenMenu: false,
    countBooks: [
        { count: 0, path: 'business', id: 1, name: "Бизнес" },
        { count: 0, path: 'psychology', id: 2, name: "Психология" },
        { count: 0, path: 'parents', id: 3, name: "Родителям" },
        { count: 0, path: 'non-fiction', id: 4, name: "Нон-фикшн" },
        { count: 0, path: 'fiction', id: 5, name: "Художественная литература" },
        { count: 0, path: 'programming', id: 6, name: "Программирование" },
        { count: 0, path: 'hobby', id: 7, name: "Хобби" },
        { count: 0, path: 'design', id: 8, name: "Дизайн" },
        { count: 0, path: 'childish', id: 9, name: "Детские" },
        { count: 0, path: 'other', id: 10, name: "Другое" },
    ],
    sort: true,
    search: "",
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addContent: (state, action) => {
            state.content = action.payload
        },
        setIsOpenMenu: (state, action) => {
            state.isOpenMenu = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setSort: (state, action) => {
            const st = { ...state }
            if (state.sort === true) {
                state.content = st.content.sort((a, b) => a.rating - b.rating)
            } else if (state.sort === false) {
                state.content = st.content.sort((a, b) => b.rating - a.rating)
            }
            state.sort = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(contentFetch.pending, (state) => {
            state.content = [];
            state.status = 'loading';
        });
        builder.addCase(bookFetch.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(filterFetch.pending, (state) => {
            state.content = [];
            state.status = 'loading';
        });
        builder.addCase(contentFetch.fulfilled, (state, action) => {
            state.countBooks[0].count = action.payload.filter((el: IContent) => el.categories[0] === 'Бизнес').length
            state.countBooks[1].count = action.payload.filter((el: IContent) => el.categories[0] === 'Психология').length
            state.countBooks[2].count = action.payload.filter((el: IContent) => el.categories[0] === 'Родителям').length
            state.countBooks[3].count = action.payload.filter((el: IContent) => el.categories[0] === 'Нон-фикшн').length
            state.countBooks[4].count = action.payload.filter((el: IContent) => el.categories[0] === 'Художественная литература').length
            state.countBooks[5].count = action.payload.filter((el: IContent) => el.categories[0] === 'Программирование').length
            state.countBooks[6].count = action.payload.filter((el: IContent) => el.categories[0] === 'Хобби').length
            state.countBooks[7].count = action.payload.filter((el: IContent) => el.categories[0] === 'Дизайн').length
            state.countBooks[8].count = action.payload.filter((el: IContent) => el.categories[0] === 'Детские').length
            state.countBooks[9].count = action.payload.filter((el: IContent) => el.categories[0] === 'Другое').length
            if (state.sort === true) {
                action.payload.sort((a: IContent, b: IContent) => b.rating - a.rating)
            } else if (state.sort === false) {
                action.payload.sort((a: IContent, b: IContent) => a.rating - b.rating)
            }
            state.content = action.payload;
            state.isOpenMenu = true;
            state.status = 'success';
        });
        builder.addCase(bookFetch.fulfilled, (state, action) => {
            state.book = action.payload
            state.status = 'success';
        });
        builder.addCase(filterFetch.fulfilled, (state, action) => {
            const result = action.payload[0]
            const data = action.payload[1]
            state.countBooks[0].count = data.filter((el: IContent) => el.categories[0] === 'Бизнес').length
            state.countBooks[1].count = data.filter((el: IContent) => el.categories[0] === 'Психология').length
            state.countBooks[2].count = data.filter((el: IContent) => el.categories[0] === 'Родителям').length
            state.countBooks[3].count = data.filter((el: IContent) => el.categories[0] === 'Нон-фикшн').length
            state.countBooks[4].count = data.filter((el: IContent) => el.categories[0] === 'Художественная литература').length
            state.countBooks[5].count = data.filter((el: IContent) => el.categories[0] === 'Программирование').length
            state.countBooks[6].count = data.filter((el: IContent) => el.categories[0] === 'Хобби').length
            state.countBooks[7].count = data.filter((el: IContent) => el.categories[0] === 'Дизайн').length
            state.countBooks[8].count = data.filter((el: IContent) => el.categories[0] === 'Детские').length
            state.countBooks[9].count = data.filter((el: IContent) => el.categories[0] === 'Другое').length
            if (state.sort === true) {
                result.sort((a: IContent, b: IContent) => b.rating - a.rating)
            } else if (state.sort === false) {
                result.sort((a: IContent, b: IContent) => a.rating - b.rating)
            }
            state.content = result
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

export const { addContent, setIsOpenMenu, setSort, setSearch } = contentSlice.actions


export default contentSlice.reducer