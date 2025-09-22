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
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    const fetchBookCovers = async () => {
      if (quotes.length > 0) {
        try {
          const bookDetailPromises = quotes.map((quote) =>
            getBooksDetail(quote.book_id)
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
    console.log(bookDetails);
  }, [quotes]);

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="container-books d-flex flex-row overflow-auto">
      {quotes.map((quote) => {
        const associatedBook = bookDetails.find(
          (book) => book.book_id == quote.book?.id
        );
        return (
          <div key={quote.id} className="card card-books m-3 overflow-scroll">
            <div className="card-header">{quote.user_id}</div>
            <div className="card-body">
              <figure>
                <blockquote className="blockquote">
                  <p>{quote.text}</p>
                </blockquote>
                <br />
                <figcaption className="blockquote-footer">
                  <cite title="Source Title">
                    {associatedBook ? associatedBook.title : 'Sin titulo'}
                  </cite>
                </figcaption>
              </figure>
            </div>
          </div>
        );
      })}
    </div>
  );
};
