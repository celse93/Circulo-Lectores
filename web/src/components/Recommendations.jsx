import { getAllRecommendations } from '../services/api/feed';
import { getBooksDetail } from '../services/api/books';
import { useEffect, useState } from 'react';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [bookCover, setBookCover] = useState([]);
  const [loading, setLoading] = useState(false);

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
          const coverIds = bookDetails.map((book) => book.cover_id);
          setBookCover(coverIds);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
        }
      }
    };
    fetchBookCovers();
  }, [recommendations]);

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="container-books d-flex flex-row overflow-auto">
      {bookCover.map((cover) => (
        <div key={cover} className="card-books me-3">
          <img
            src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
            alt="Book cover"
          />
        </div>
      ))}
    </div>
  );
};
