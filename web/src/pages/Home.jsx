import { useNavigate } from 'react-router';
import { useContext, useEffect, useState, useCallback } from 'react';
import { getCurrentUser } from '../services/api/users';
import { UserContext } from '../context/User';
import { getBooksSearch } from '../services/api/books';
import { getBooksDetail } from '../services/api/books';
import { getAuthorDetail } from '../services/api/books';
import { postBook } from '../services/api/books';

export const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setBook, setAuthor } = useContext(UserContext);
  const navigate = useNavigate();

  const loadUserData = useCallback(async () => {
    try {
      const userData = await getCurrentUser();
      if (userData && setUser) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, [setUser]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await getBooksSearch(query);
      setBooks(result);
    } catch (error) {
      console.error(error);
      setError('Error al buscar libros. Intenta de nuevo.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBookClick = async (bookId) => {
    const fetchBook = await getBooksDetail(bookId);
    setBook(fetchBook);
    const fetchAuthor = await getAuthorDetail(fetchBook['author_id']);
    setAuthor(fetchAuthor);
    navigate('/book');
  };

  const handleSaveBook = async (book) => {
    try {
      const saveBook = await postBook(book.book_id);
      alert(`Libro "${book.title}": ${saveBook['message']}`);
    } catch {
      alert('¡Error! Libro ya registrado');
    }
  };

  return (
    <div className="container-fluid bg-dark min-vh-100">
      {/* Header */}
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-4">
              {user && user.email && (
                <h2 className="text-white mb-3">Bienvenido, {user.email}</h2>
              )}
              <h1 className="text-white mb-0">Descubre tu próxima lectura</h1>
              <p className="text-muted mt-2">
                Explora miles de libros y encuentra tus favoritos
              </p>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card bg-dark border border-secondary">
              <div className="card-body">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Buscar libros por título, autor..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                  />
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></span>
                    ) : (
                      <i className="fa-solid fa-search"></i>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-white mt-3">Buscando libros...</p>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {!loading && books.length > 0 && (
          <div className="row">
            <div className="col-12">
              <h3 className="text-white mb-4">
                Resultados de búsqueda ({books.length})
              </h3>
            </div>
            {books.map((book) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={book.key}
              >
                <div className="card bg-dark border border-secondary h-100">
                  {/* Imagen del libro */}
                  <div className="position-relative">
                    {book.cover_id ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                        className="card-img-top"
                        alt={book.title}
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="card-img-top d-flex align-items-center justify-content-center bg-secondary"
                        style={{ height: '300px' }}
                      >
                        <i
                          className="fa-solid fa-book text-muted"
                          style={{ fontSize: '3rem' }}
                        ></i>
                      </div>
                    )}
                  </div>

                  {/* Información del libro */}
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-white" title={book.title}>
                      {book.title.length > 50
                        ? `${book.title.substring(0, 50)}...`
                        : book.title}
                    </h6>
                    <p className="card-text text-muted small">
                      <strong>Autor:</strong>{' '}
                      {book.author_name
                        ? book.author_name.slice(0, 2).join(', ')
                        : 'Autor desconocido'}
                    </p>
                    {book.first_publish_year && (
                      <p className="card-text text-muted small">
                        <strong>Año:</strong> {book.first_publish_year}
                      </p>
                    )}

                    {/* Botón de acción */}
                    <div className="mt-auto mb-2">
                      <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => handleBookClick(book.book_id)}
                      >
                        Aprende más
                      </button>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => handleSaveBook(book)}
                      >
                        <i className="fa-solid fa-plus me-2"></i>
                        Agregar a biblioteca
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && books.length === 0 && query && (
          <div className="text-center py-5">
            <i
              className="fa-solid fa-search text-muted mb-3"
              style={{ fontSize: '4rem' }}
            ></i>
            <h4 className="text-white">No se encontraron resultados</h4>
            <p className="text-muted">Intenta con otros términos de búsqueda</p>
          </div>
        )}

        {!loading && books.length === 0 && !query && (
          <div className="text-center py-5">
            <i
              className="fa-solid fa-book-open text-primary mb-3"
              style={{ fontSize: '4rem' }}
            ></i>
            <h4 className="text-white">¡Comienza tu búsqueda!</h4>
            <p className="text-muted">
              Escribe el nombre de un libro o autor para descubrir nuevas
              lecturas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/api/users';

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
      <Feed className="feed" />
    </div>
  );
};
*/
