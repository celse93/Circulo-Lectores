import { useContext, useEffect, useState } from 'react';
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
};
