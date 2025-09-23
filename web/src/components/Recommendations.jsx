import { getAllRecommendations } from '../services/api/feed';
import { getBooksDetail, getAuthorDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/User';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setBook, setAuthor } = useContext(UserContext);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getAllRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  useEffect(() => {
    const fetchBookCovers = async () => {
      if (recommendations.length > 0) {
        try {
          const bookDetailPromises = recommendations.map((book) =>
            getBooksDetail(book.book_id)
          );
          const bookDetails = await Promise.all(bookDetailPromises);

          setBookDetails(bookDetails);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
        }
      }
    };
    fetchBookCovers();
  }, [recommendations]);

  const handleBookClick = async (e) => {
    const fetchBook = await getBooksDetail(e.target.id);
    setBook(fetchBook);
    const fetchAuthor = await getAuthorDetail(fetchBook['author_id']);
    setAuthor(fetchAuthor);
    navigate('/book');
  };

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="d-flex flex-row overflow-auto">
      {bookDetails.map((book) => (
        <div key={book.book_id} className="card-books me-3">
          <img
            className="book-covers"
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
            alt="Book cover"
          />
          <div className="card-body d-flex justify-content-center">
            <button
              id={book.book_id}
              type="button"
              className="btn btn-primary"
              onClick={handleBookClick}
            >
              Aprende más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
