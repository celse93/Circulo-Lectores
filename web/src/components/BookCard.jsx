import { useEffect } from 'react';

export const BookCard = ({ books }) => {
  return (
    <>
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
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            ))
          : 'No books'}
      </div>
    </>
  );
};
