import { getAllRecommendations } from '../services/api/feed';
import { getBooksDetail } from '../services/api/books';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/User';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getBook, getAuthor, book } = useContext(UserContext);

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

  const handleBookClick = (e) => {
    getBook(e.target.id);
    getAuthor(book['author_id']);
    console.log(book['author_id']);
  };

  /*
  const handleBookClick = async (e) => {
    const fetchBook = await getBook(e.target.id);
    const fetchAuthorDetails = await getAuthor(fetchBook["author_id"]);
    setAuthor(fetchAuthorDetails)
    console.log(selectedBook[0]);
  };

  const handleBookClick = (e) => {
    getBook(e.target.id);
    const selectedBook = books.filter((item) => {
      return item.openlibrary_id == e.target.id;
    });
    console.log(selectedBook[0]);
    setBookDetails({
      authorName: selectedBook[0]['author'],
      year: selectedBook[0]['first_publish_year'],
      cover_id: selectedBook[0]['cover_id'],
    });
  };

  */

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="container-books d-flex flex-row overflow-auto">
      {bookDetails.map((book) => (
        <div
          onClick={handleBookClick}
          key={book.cover_id}
          className="card-books me-3"
        >
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
