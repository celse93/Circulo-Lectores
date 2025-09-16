import { getBooksSearch } from '../services/api/books';
import React, { useState } from 'react';

export const BookSearch = () => {
  const [inputName, setInputName] = useState('');
  const [books, setBooks] = useState([]);

  const handleChangeInput = (e) => {
    setInputName(e.target.value);
  };

  const handleOnClick = () => {
    getBooksSearch(inputName).then((data) => {
      setBooks([...books, data]);
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
            onClick={handleOnClick}
          >
            Search
          </button>
        </div>

        <div className="container text-center">
          {books.map((book) => (
            <div key={book.openlibrary_id} className="row align-items-start">
              <div className="col">
                <div className="card">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                    className="img-fluid"
                    alt="placeholder"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author}</p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
