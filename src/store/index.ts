import { configureStore } from "@reduxjs/toolkit";
import BooksListSlice from "../components/BooksList/BooksListSlice";

export const store = configureStore({
    reducer: {
        books: BooksListSlice
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;