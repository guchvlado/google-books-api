import React, { useState } from 'react';
import BookItem from '../BookItem/BookItem';
import { Book } from '../../services/bookService';

import { addNewBooks, setStatus } from './BooksListSlice';
import useBookService from '../../services/bookService';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import styles from './BooksList.module.css';
import { Link } from 'react-router-dom';

const BooksList = () => {

    const [offset, setOffset] = useState<number>(30);

    const dispatch = useAppDispatch();
    const {getBooks} = useBookService();

    const {books, searchString, status, total} = useAppSelector(state => state.books);

    const onLoadMore = () => {
        dispatch(setStatus('loading'));
        getBooks(searchString, offset)
            .then(({books}) => dispatch(addNewBooks(books)))
            .then(() => dispatch(setStatus('idle')));
        setOffset(offset => offset + 30)
    }

    return (
        <div className={styles.list}>
            <div className={styles.results}>Found {total} results</div>
            {status === 'firstLoading' ? <h2>Loading...</h2> : 
                <div className={styles.grid}>
                    {books.map((book: Book) => <Link to={book.id} key={book.id}><BookItem {...book}  /></Link>)}
                </div>
            }
            {status === 'loading' ? <h2>Loading...</h2> : null}
            {books.length > 0 ? <button className={styles.button} onClick={onLoadMore} disabled={status === 'loading'}>Load more</button> : null}
        </div>
    );
};

export default BooksList;