import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "../../services/bookService";


type StatusType = 'idle' | 'error' | 'loading' | 'firstLoading';

interface BooksState {
    books: Book[];
    searchString: string;
    status: StatusType;
    total: number;
}

const initialState: BooksState = {
    books: [],
    searchString: '',
    status: 'idle',
    total: 0
}

const BooksListSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<{total: number, books: Book[]}>) => {
            state.books = action.payload.books;
            state.total = action.payload.total;
        },
        addNewBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = state.books.concat(action.payload);
        },
        changeSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
        },
        setStatus: (state, action: PayloadAction<StatusType>) => {
            state.status = action.payload;
        }
    }
})

export const {addNewBooks, changeSearchString, setBooks, setStatus} = BooksListSlice.actions;

export default BooksListSlice.reducer