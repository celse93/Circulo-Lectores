import { getAllQuotes } from '../services/api/feed';
import { getBooksDetail, getAuthorDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/User';

export const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setBook, setAuthor } = useContext(UserContext);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const data = await getAllQuotes();
        setQuotes(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };
    fetchQuotes();
  }, []);

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="container-books d-flex flex-row overflow-auto">
      {quotes.map((quote) => (
        <div key={quote.id} className="card card-books m-3 overflow-scroll">
          <div className="card-header">{quote.user_id}</div>
          <div className="card-body">
            <figure>
              <blockquote className="blockquote">
                <p>{quote.text}</p>
              </blockquote>
              <br />
              <figcaption className="blockquote-footer">
                Author in <cite title="Source Title">{quote.book_id}</cite>
              </figcaption>
            </figure>
          </div>
        </div>
      ))}
    </div>
  );
};
