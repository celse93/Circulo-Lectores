import { getBooksSearch } from '../services/api/books';
import { useState } from 'react';
import { BookCard } from '../components/BookCard';

export const BookSearch = () => {
  const [inputName, setInputName] = useState('');
  const [books, setBooks] = useState([]);

  const handleChangeInput = (e) => {
    setInputName(e.target.value);
  };

  const refreshData = () => {
    getBooksSearch(inputName).then((data) => {
      setBooks(data);
      console.log(books);
    });
  };

  return (
    <>
      <div>
        <div className="w-50">
          <input
            type="text"
            className="form-control"
            placeholder="search"
            value={inputName}
            onChange={handleChangeInput}
          ></input>
          <button
            type="button"
            className="btn btn-primary"
            onClick={refreshData}
          >
            Search
          </button>
        </div>
        <div className="container">
          <BookCard books={books} />
        </div>
      </div>
    </>
  );
};
