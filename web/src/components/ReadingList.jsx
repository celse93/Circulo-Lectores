import { getAllReadingLists } from '../services/api/feed';
import { getBooksDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { postReadingList, postRecommendations } from '../services/api/books';

export const ReadingLists = () => {
  const [readingLists, setReadingLists] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { selectBook } = useContext(UserContext);

  useEffect(() => {
    const fetchReadingLists = async () => {
      try {
        setLoading(true);
        const data = await getAllReadingLists();
        setReadingLists(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };
    fetchReadingLists();
  }, []);

  useEffect(() => {
    const fetchBookCovers = async () => {
      if (readingLists.length > 0) {
        try {
          const bookDetailPromises = readingLists.map((book) =>
            getBooksDetail(book.book_id)
          );
          const bookDetails = await Promise.all(bookDetailPromises);

          setBookDetails(bookDetails);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
        }
      }
      return () => {
        setBookDetails([]);
      };
    };
    fetchBookCovers();
  }, [readingLists]);

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
      console.log(book.book_id);
      alert(`Libro "${book.title}": ${saveBook['message']}`);
    } catch {
      alert('¡Error! Libro ya registrado');
    }
  };

  const handleRecommendations = async (book) => {
    try {
      const saveBook = await postRecommendations(book.book_id);
      console.log(book.book_id);
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
        <div key={book.book_id} className="card-books mx-3">
          <div className="mb-1">
            <img
              className="book-covers rounded-3"
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
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
  );
};
