import { useContext } from 'react';
import { UserContext } from '../context/User';
import { useEffect } from 'react';

export const BookDetail = () => {
  const { book, bookDetails } = useContext(UserContext);

  useEffect(() => {
    console.log(book);
    console.log(bookDetails);
  }, []);

  return (
    <>
      <div className="d-flex">
        <div className="container">
          <img
            src={`https://covers.openlibrary.org/b/id/${bookDetails.cover_id}-M.jpg`}
            className="img-fluid"
            alt="placeholder"
          />
        </div>
        <div className="container">
          <div>
            <h3>{book.title}</h3>
          </div>
          <div>
            <div>
              <i className="fa-solid fa-star"></i>
              <h6>{bookDetails.authorName}</h6>
            </div>
            <p>{book.description}</p>
            <p>Year of publication: {bookDetails.year}</p>
          </div>
        </div>
      </div>
    </>
  );
};
