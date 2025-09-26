import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getBooksSearch } from '../services/api/books';
import { postReadingList, postRecommendations } from '../services/api/books';

export const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { selectBook, profile } = useContext(UserContext);
  const navigate = useNavigate();

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
    const fetchBook = await selectBook(bookId);
    if (fetchBook) {
      navigate('/book');
    } else {
      console.log('Could not navigate to book page');
    }
  };

  const handleBookReadList = async (book) => {
    try {
      const saveBook = await postReadingList(book.book_id);
      alert(`Libro "${book.title}": ${saveBook['message']}`);
    } catch {
      alert('¡Error! Libro ya registrado');
    }
  };

  const handleRecommendations = async (book) => {
    try {
      const saveBook = await postRecommendations(book.book_id);
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
              {profile.name && (
                <h2 className="text-white mb-3">Bienvenido, {profile.name}</h2>
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
                key={book.book_id}
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
                    <div className="mt-auto mb-2">
                      <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => handleBookReadList(book)}
                      >
                        <i className="fa-solid fa-plus me-2"></i>
                        Agregar a biblioteca
                      </button>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => handleRecommendations(book)}
                      >
                        <i className="fa-solid fa-plus me-2"></i>
                        Agregar a leídos
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
