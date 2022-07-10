import {useHttp} from '../hooks/http.hook';

interface ApiBook {
    id: string;
    volumeInfo: {
        authors: string[];
        categories?: string[];
        title: string;
        description?: string;
        imageLinks?: {
            thumbnail?: string;
        }
    };
}

export interface Book {
    id: string;
    author: string;
    category: string;
    title: string;
    description: string;
    image: string;
}

const useBookService = () => {
    const _apiBase = 'https://www.googleapis.com/books/v1';
    const _apiKey = 'AIzaSyASiUaCXWeo2uDOSQj5WtDKsNNOO8-TjXM';

    const {loading, error, request, clearError, process, setProcess} = useHttp();

    const getBooks = async (searchString: string, offset: number = 0, category = 'all', orderBy = 'relevance') => {
        const search = category === 'all' ? searchString : searchString + `+subject:${category}`;
        const res = await request(`${_apiBase}/volumes?key=${_apiKey}&q=${search}&maxResults=30&startIndex=${offset}&orderBy=${orderBy}`);
        console.log(res)
        return {
            total: res.totalItems,
            books: res.items.map((item: ApiBook) => _transformBook(item))
        };
    }

    const _transformBook = (book: ApiBook): Book => {
        return {
            id: book.id,
            author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'no authors',
            title: book.volumeInfo.title ?? 'no title',
            description: book.volumeInfo.description ?? 'no description',
            category: book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'no info',
            image: book.volumeInfo?.imageLinks?.thumbnail ?? 'error'
        }
    }

    return {loading, error, clearError, process, setProcess, getBooks}
}

export default useBookService;