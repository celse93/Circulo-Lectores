import { getAllRecommendations } from '../services/api/feed';
import { getBooksDetail, getAuthorDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { postReadingList, postRecommendations } from '../services/api/books';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { selectBook } = useContext(UserContext);

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

  const handleBookClick = async (book) => {
    const fetchBook = await selectBook(book.book_id);
    if (fetchBook) {
      navigate('/book');
    } else {
      console.log('Could not navigate to book page');
    }
  };

  const handleBookReadList = async (book) => {
    try {
      const saveBook = await postReadingList(book);
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
          <div className="card-body d-flex flex-column justify-content-center">
            <div className="mt-auto mb-2">
              <button
                type="button"
                className="btn btn-primary btn-sm w-100"
                onClick={() => handleBookClick(book.book_id)}
              >
                Aprende más
              </button>
            </div>
            <div className="mt-auto mb-2">
              <button
                type="button"
                className="btn btn-primary btn-sm w-100"
                onClick={() => handleBookReadList(book)}
              >
                <i className="fa-solid fa-plus me-2"></i>
                Agregar a biblioteca
              </button>
            </div>
            <div className="mt-auto mb-2">
              <button
                type="button"
                className="btn btn-primary btn-sm w-100"
                onClick={() => handleRecommendations(book)}
              >
                <i className="fa-solid fa-plus me-2"></i>
                Agregar a leídos
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
