import { getBooksDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { postReadingList, postRecommendations } from '../services/api/books';
import { getAllQuotes, getAllReviews } from '../services/api/feed';
import {
  getAllReadingLists,
  getAllRecommendations,
} from '../services/api/feed';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Link,
  Typography,
  Box,
  Chip,
} from '@mui/material';

export const Feed = () => {
  const [booksData, setBooksData] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { selectBook } = useContext(UserContext);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setLoading(true);
        const dataRecommendations = await getAllRecommendations();
        const dataReadingList = await getAllReadingLists();
        const dataQuotes = await getAllQuotes();
        const dataReviews = await getAllReviews();

        setBooksData((prevBooksData) => [
          ...prevBooksData,
          ...(Array.isArray(dataRecommendations) ? dataRecommendations : []),
          ...(Array.isArray(dataReadingList) ? dataReadingList : []),
          ...(Array.isArray(dataQuotes) ? dataQuotes : []),
          ...(Array.isArray(dataReviews) ? dataReviews : []),
        ]);
      } catch (error) {
        console.error('Failed to fetch books data:', error);
        setLoading(false);
      }
    };
    fetchBooksData();
  }, []);

  useEffect(() => {
    const fetchBookCovers = async () => {
      if (booksData.length == 0) {
        setLoading(false);
      }
      if (booksData.length > 0) {
        try {
          const bookDetailPromises = booksData.map((book) =>
            getBooksDetail(book.book_id)
          );
          const bookDetails = await Promise.all(bookDetailPromises);
          setBookDetails(bookDetails);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookCovers();
  }, [booksData]);

  console.log(booksData);
  console.log(bookDetails);
  console.log(loading);

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
    <>
      <div style={{ height: '100px' }}></div>
      {booksData.length == 0 && !loading ? (
        <div>
          <h5>No posts yet</h5>
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <Box>
          {bookDetails.map((book) => (
            <Card
              sx={{
                maxWidth: 400,
                margin: 'auto',
                borderRadius: 3,
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: 6 },
              }}
              key={book.book_id}
              onClick={() => handleBookClick(book.book_id)}
            >
              <CardHeader
                avatar={
                  <Link
                    href=""
                    underline="none"
                    color="inherit"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                  >
                    <Avatar
                      alt="Pedro"
                      src="/assets/generated/default-avatar.dim_100x100.png"
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Pedro
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        less than a minute ago
                      </Typography>
                    </Box>
                  </Link>
                }
                action={
                  <Chip
                    size="small"
                    label="Quote"
                    icon={'abc'}
                    sx={{
                      bgcolor: 'secondary.light',
                      color: 'secondary.contrastText',
                      borderColor: 'secondary.main',
                      fontWeight: 'medium',
                    }}
                  />
                }
                sx={{ paddingBottom: 0, paddingRight: 3 }} // Adjust spacing to match original
              />
              <CardContent
                sx={{ paddingTop: 0, paddingBottom: '16px !important' }}
              >
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  <Box sx={{ flexShrink: 0 }} onClick={handleBookClick}>
                    <img
                      alt="Book cover"
                      style={{
                        height: 128,
                        width: 96,
                        borderRadius: 8,
                        objectFit: 'cover',
                      }}
                      src={
                        book.cover_id != ''
                          ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                          : 'https://imageplaceholder.net/300x300/eeeeee/131313?text=sin+portada+de+libro'
                      }
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 'semibold', lineHeight: 'tight' }}
                    >
                      {book.title}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                    bgcolor: 'action.hover',
                    fontStyle: 'italic',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: 'pre-wrap', lineHeight: 'relaxed' }}
                  >
                    filosofare
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};
