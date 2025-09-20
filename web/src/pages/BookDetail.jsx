import { useContext } from 'react';
import { UserContext } from '../context/User';
import { useEffect } from 'react';

export const BookDetail = () => {
  const { book, author } = useContext(UserContext);

  useEffect(() => {
    console.log(book);
    console.log(author);
  }, []);

  return (
    <>
      <div className="d-flex">
        <div className="container">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
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
              <h6>{author.author_name}</h6>
            </div>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
