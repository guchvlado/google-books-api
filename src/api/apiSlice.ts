import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//AIzaSyASiUaCXWeo2uDOSQj5WtDKsNNOO8-TjXM key

const apiKey = 'AIzaSyASiUaCXWeo2uDOSQj5WtDKsNNOO8-TjXM';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://www.googleapis.com/books/v1'}),
    endpoints: builder => ({
        getAllBooks: builder.query({
            query: (category) => `/volumes?key=AIzaSyASiUaCXWeo2uDOSQj5WtDKsNNOO8-TjXM&q=subject:${category}`
        })
    })
});

export const {useGetAllBooksQuery} = apiSlice;