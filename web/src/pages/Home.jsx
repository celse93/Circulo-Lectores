import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User';
import { getBooksSearch } from '../services/api/books';
import { Feed } from './Feed';
import file from '../utils/constant.json' with { type: 'json' };
console.log(file);

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState([]);
  const { getBook, setBookDetails, user, getAuthor, book } =
    useContext(UserContext);

  /*
  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) setUser(data);
    });
  }, []);
  */

  const handleSearch = async () => {
    setLoading(true);
    const data = await getBooksSearch(inputValue);
    setBooks(data);
    setLoading(false);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleBookClick = (e) => {
    getBook(e.target.id);
    getAuthor(book['author_id']);
  };

  /*
  const handleSaveBook = (book) => {
    console.log('Guardar libro', book.title);
    alert(`Libro "${book.title}" guardado en tu biblioteca.`);
  };
  */

  return (
    <div className="container">
      {user && <h5>Bienvenido, {user.email}</h5>}

      <div className="d-flex mt-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="search"
          value={inputValue}
          onChange={handleChangeInput}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="container">
          {books.map((book) => (
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
          ))}
        </div>
      )}

      <h1 className="mb-3">Feed</h1>
      <div className="btn-group my-3" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary">
          <i className="fa-solid fa-plus" />
          Recommendations
        </button>
        <button type="button" className="btn btn-primary">
          <i className="fa-solid fa-plus" />
          Reading List
        </button>
        <button type="button" className="btn btn-primary">
          <i className="fa-solid fa-plus" />
          Reviews
        </button>
        <button type="button" className="btn btn-primary">
          <i className="fa-solid fa-plus" />
          Quotes
        </button>
      </div>
      <Feed />
    </div>
  );
};
