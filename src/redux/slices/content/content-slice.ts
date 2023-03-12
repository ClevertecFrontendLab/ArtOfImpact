/* eslint-disable no-param-reassign */
/* eslint-disable  import/no-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BookFetch, ContentSliceState, IContent } from "./content-type";
import UserService from "../../../pages/http/users-service";



interface Token {
    token: string
}
export const contentFetch = createAsyncThunk('/content/contentFetch', async (params: Token, thunkAPI) => {
    const { data } = await UserService.fetchBooks()
    const state: any = thunkAPI.getState()
    const aside = state.aside.asides
    return { data, aside }
})

interface TokenFilter {
    token: string,
    name: string
}
export const filterFetch = createAsyncThunk('/content/filterFetch', async (params: TokenFilter, thunkAPI) => {
    const { name, token } = params
    const { data } = await UserService.fetchBooks()
    const result = data.filter((el: IContent) => el.categories[0] === name)
    const state: any = thunkAPI.getState()
    const aside = state.aside.asides
    return { result, aside, data }
})

export const bookFetch = createAsyncThunk('/content/bookFetch', async (params: BookFetch) => {
    const { bookId, token } = params
    const { data } = await UserService.fetchBook({ bookId })
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
    countBooks: [],
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
            const count: any = []
            for (let i = 0; i < action.payload.aside.length; i++) {
                count[i] = action.payload.data.filter((el: IContent) => el.categories[0] === action.payload.aside[i].name).length
            }
            state.countBooks = count
            if (state.sort === true) {
                action.payload.data.sort((a: IContent, b: IContent) => b.rating - a.rating)
            } else if (state.sort === false) {
                action.payload.data.sort((a: IContent, b: IContent) => a.rating - b.rating)
            }
            state.content = action.payload.data;
            state.isOpenMenu = true;
            state.status = 'success';
        });
        builder.addCase(bookFetch.fulfilled, (state, action) => {
            state.book = action.payload
            state.status = 'success';
        });
        builder.addCase(filterFetch.fulfilled, (state, action) => {
            const count: any = []
            for (let i = 0; i < action.payload.aside.length; i++) {
                count[i] = action.payload.data.filter((el: IContent) => el.categories[0] === action.payload.aside[i].name).length
            }
            state.countBooks = count
            if (state.sort === true) {
                action.payload.result.sort((a: IContent, b: IContent) => b.rating - a.rating)
            } else if (state.sort === false) {
                action.payload.result.sort((a: IContent, b: IContent) => a.rating - b.rating)
            }
            state.content = action.payload.result
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