import { useContext, useEffect, useState, useCallback } from 'react';
import { getCurrentUser } from '../services/api/users';
import { UserContext } from '../context/User';

const searchBooks = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}`
    );
    if (!response.ok) {
      throw new Error('Error en la búsqueda');
    }
    const data = await response.json();
    return data.docs.slice(0, 12);
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const result = await searchBooks(query);
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

  const handleSaveBook = (book) => {
    console.log('Guardar libro', book.title);
    alert(`Libro "${book.title}" guardado en tu biblioteca.`);
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
                        aria-hidden="true"
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
                    {book.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
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
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material';

const searchBooks = async (query) => {
  if (!query) return [];
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${query}`
  );
  const data = await response.json();
  return data.docs.slice(0, 12);
};

export const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const result = await searchBooks(query);
    setBooks(results);
    setLoading(false);
  };

  const handleSaveBook = (book) => {
    console.log('Guardar libro', book.title);
    alert(`Libro "${book.title}" guardado en tu biblioteca.`);
  };

  return (
    <Box sx={{ p: 4 }}>
      {user && <Typography variant="h5">Bienvenido, {user.email}</Typography>}

      <Box sx={{ display: 'flex', mt: 2, mb: 4, gap: 2 }}>
        <TextField
          label="Buscar libros"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.key}>
              <Card>
                {book.cover_i ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                    alt={book.title}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#f0f0f0',
                    }}
                  >
                    <Typography variant="subtitle1">Sin portada</Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author_name
                      ? book.author_name.join(', ')
                      : 'Autor desconocido'}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleSaveBook(book)}
                  >
                    Guardar en mi biblioteca
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}; */
