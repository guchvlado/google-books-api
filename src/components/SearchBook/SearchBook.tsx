import React, {  useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBook.module.css';

//import { useGetAllBooksQuery } from '../../api/apiSlice';
import useBookService from '../../services/bookService';
import { setBooks, changeSearchString, setStatus } from '../BooksList/BooksListSlice';
import { useAppDispatch } from '../../hooks/hooks';

const SearchBook = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');

    const {getBooks} = useBookService();

    const dispatch = useAppDispatch();

    // const {data} = useGetAllBooksQuery(category);
    // console.log(data)

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }

    const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    }

    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('hi');
        dispatch(changeSearchString(title))
        if (title.length > 0) {
            dispatch(setStatus('firstLoading'))
            getBooks(title, 0, category, sortBy)
                .then((data) => dispatch(setBooks(data)))
                .then(() => dispatch(setStatus('idle')))
        }
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Search for books</h1>

            <form onSubmit={onSearch} className={styles.inputContainer}>
                <input 
                type="text" 
                name="name" 
                id="name" 
                className={styles.input} 
                onChange={onChangeTitle}
                value={title} />
                <button className={styles.searchButton}><SearchIcon/></button>
            </form>

            <div className={styles.selectors}>
                <label htmlFor="categories">Categories</label>
                <select 
                name="categories" 
                id="categories" 
                className={styles.select}
                onChange={onChangeCategory}
                value={category}>
                    <option value="all">all</option>
                    <option value="Art">art</option>
                    <option value="Biography">biography</option>
                    <option value="Computers">computers</option>
                    <option value="History">history</option>
                    <option value="Medical">medical</option>
                    <option value="Poetry">poetry</option>
                </select>

                <label htmlFor="sortBy">Sorting by</label>
                <select 
                name="sortBy" 
                id="sortBy" 
                className={styles.select}
                onChange={onChangeSortBy}
                value={sortBy}>
                    <option value="relevance">relevance</option>
                    <option value="newest">newest</option>
                </select>
            </div>
            
        </header>
    );
};

export default SearchBook;