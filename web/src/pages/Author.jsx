import { useContext } from 'react';
import { UserContext } from '../context/User';

export const Author = () => {
  const { selectedBook } = useContext(UserContext);
  const { book, author } = selectedBook;

  if (!author) {
    return <p>Cargando... </p>;
  }

  return (
    <>
      <div className="d-flex">
        <div className="container">
          <img
            src={`https://covers.openlibrary.org/a/olid/${author.author_id}-M.jpg`}
            className="img-fluid"
            alt="Author picture"
          />
        </div>
        <div className="container">
          <div>
            <h3>{author.author_name}</h3>
          </div>
          <div>
            <p>{author.author_bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};
