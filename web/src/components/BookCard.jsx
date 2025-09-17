import { useEffect } from 'react';

export const BookCard = ({ books }) => {
  return (
    <>
      <div className="container">
        {books.length > 0
          ? books.map((book) => (
              <div key={book.openlibrary_id} className="card">
                <img
                  src={`https://placehold.co/600x400`}
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
