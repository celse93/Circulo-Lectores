import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/User';
import {
  getBooksSearch,
  getBooksDetail,
  getAuthorDetail,
} from '../services/api/books';
import { Feed } from './Feed';
import file from '../utils/constant.json' with { type: 'json' };

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { user, setBook, setAuthor } = useContext(UserContext);

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

  const handleBookClick = async (e) => {
    const fetchBook = await getBooksDetail(e.target.id);
    setBook(fetchBook);
    const fetchAuthor = await getAuthorDetail(fetchBook['author_id']);
    setAuthor(fetchAuthor);
    navigate('/book');
  };

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
      <Feed />
    </div>
  );
};
