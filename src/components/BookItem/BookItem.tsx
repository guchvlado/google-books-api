import React from 'react';

import styles from './BookItem.module.css';

interface BookItemProps {
    title: string;
    author: string;
    image: string;
    category: string;
}

const BookItem = ({title, author, image, category}: BookItemProps) => {
    return (
        <div className={styles.card}>
            <img className={styles.image} src={image} alt={title} />
            <div className={styles.category}>{category}</div>
            <div className={styles.title}>{title}</div>
            <div className={styles.author}>{author}</div>
        </div>
    );
};

export default BookItem;