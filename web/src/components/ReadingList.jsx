import { getAllReadingLists } from '../services/api/feed';
import { getBooksDetail, getAuthorDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/User';

export const ReadingLists = () => {
  const [readingLists, setReadingLists] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setBook, setAuthor } = useContext(UserContext);

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
    };
    fetchBookCovers();
  }, [readingLists]);

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
    <div className="container-books d-flex flex-row overflow-auto">
      {bookDetails.map((book) => (
        <div key={book.book_id} className="card-books me-3">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
            alt="Book cover"
          />
          <button
            id={book.book_id}
            type="button"
            className="btn btn-primary"
            onClick={handleBookClick}
          >
            Learn more
          </button>
        </div>
      ))}
    </div>
  );
};
