import { getBooksSearch } from '../services/api/books';
import { useContext, useState } from 'react';
import { BookCard } from '../components/BookCard';
import { UserContext } from '../context/User';

export const BookSearch = () => {
  const [inputName, setInputName] = useState('');
  const [books, setBooks] = useState([]);
  const { getBook } = useContext(UserContext);

  const handleChangeInput = (e) => {
    setInputName(e.target.value);
  };

  const refreshData = () => {
    getBooksSearch(inputName).then((data) => {
      setBooks(data);
      console.log(books);
    });
  };

  const handleBookClick = (e) => {
    getBook(e.target.id);
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
          {books.length > 0
            ? books.map((book) => (
                <div key={book.openlibrary_id} className="card w-25 mb-3">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                    className="img-fluid"
                    alt="placeholder"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author}</p>
                    <button
                      id={book.openlibrary_id}
                      type="button"
                      className="btn btn-primary"
                      onClick={handleBookClick}
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              ))
            : 'No books'}
        </div>
      </div>
    </>
  );
};
