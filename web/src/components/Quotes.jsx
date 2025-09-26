import { getAllQuotes } from '../services/api/feed';
import { getBooksDetail, getAuthorDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getProfileNames } from '../services/api/users';

export const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

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
    const fetchBookAndProfile = async () => {
      if (quotes.length > 0) {
        try {
          const bookDetailPromises = quotes.map((quote) =>
            getBooksDetail(quote.book_id)
          );
          const bookDetails = await Promise.all(bookDetailPromises);

          const profileDetails = await getProfileNames();

          setBookDetails(bookDetails);
          setProfileNames(profileDetails);

          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
        }
      }
    };
    fetchBookAndProfile();
  }, [quotes]);

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="d-flex flex-row overflow-auto">
      {quotes.map((quote) => {
        const associatedBook = bookDetails.find(
          (book) => book.book_id == quote.book_id
        );
        const associatedProfile = profileNames.find(
          (profile) => profile.id == quote.user_id
        );
        return (
          <div key={quote.id} className="card card-quotes m-3 overflow-auto">
            <div className="card-header">
              {associatedProfile.name ? associatedProfile.name : 'Sin nombre'}
            </div>
            <div className="card-body">
              <figure>
                <blockquote className="blockquote mb-5">
                  <p>{quote.text}</p>
                </blockquote>
                <br />
                <figcaption className="blockquote-footer mb-0">
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
