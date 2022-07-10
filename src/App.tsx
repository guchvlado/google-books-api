import { Container } from '@mui/material';
import React from 'react';
import BooksList from './components/BooksList/BooksList';
import SearchBook from './components/SearchBook/SearchBook';
import BookPage from './components/BookPage/BookPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <SearchBook/>
          <Routes>
            <Route path='/' element={<BooksList/>} />
            <Route path='/:bookId' element={<BookPage/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
