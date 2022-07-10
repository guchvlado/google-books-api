import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

import styles from './BookPage.module.css';

const BookPage = () => {

    const {bookId} = useParams();

    const {title, author, category, description, image} = useAppSelector(state => state.books.books.find(book => book.id === bookId))!;

    return (
        <div className={styles.container}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.content}>
                <div className={styles.category}>{category}</div>
                <div className={styles.title}>{title}</div>
                <div className={styles.author}>{author}</div>
                <div className={styles.description}>{description}</div>
                <Link to='/' className={styles.back}>Back</Link>
            </div>
        </div>
    );
};

export default BookPage;