import { getAllRecommendations } from '../services/api/feed';
import { getBooksDetail } from '../services/api/books';
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
        setLoading(false);
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
          setLoading(false);
        }
      }
    };
    fetchBookCovers();
  }, [recommendations]);

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
      {recommendations.length == 0 && !loading ? (
        <div className="text-center">
          <div className="card bg-dark border border-secondary">
            <div className="card-body py-5">
              <i className="fa-solid fa-star fa-3x text-muted mb-3"></i>
              <h5 className="text-white">Todavía no hay recomendaciones hoy</h5>
            </div>
          </div>
        </div>
      ) : loading ? (
        <p>Cargando... </p>
      ) : (
        <div className="d-flex flex-row overflow-auto">
          {bookDetails.map((book) => (
            <div key={book.book_id} className="card-books mx-3">
              <div className="mb-1">
                <img
                  className="book-covers rounded-3"
                  src={
                    book.cover_id != ''
                      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                      : 'https://imageplaceholder.net/300x300/eeeeee/131313?text=sin+portada+de+libro'
                  }
                  alt="Book cover"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="mb-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => handleBookClick(book.book_id)}
                  >
                    Aprende más
                  </button>
                </div>
                <div className="mb-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => handleBookReadList(book)}
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Agregar a biblioteca
                  </button>
                </div>
                <div>
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
      )}
    </>
  );
};
