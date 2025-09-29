import { getAllQuotes } from '../services/api/feed';
import { getBooksDetail } from '../services/api/books';
import { useEffect, useState } from 'react';
import { getProfileNames } from '../services/api/users';

export const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const data = await getAllQuotes();
        setQuotes(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        setLoading(false);
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
          setLoading(false);
        }
      }
      return () => {
        setQuotes([]);
      };
    };
    fetchBookAndProfile();
  }, [quotes]);

  return (
    <>
      {quotes.length == 0 && !loading ? (
        <div className="text-center">
          <div className="card bg-dark border border-secondary">
            <div className="card-body py-5">
              <i className="fa-solid fa-star fa-3x text-muted mb-3"></i>
              <h5 className="text-white">Todavía no hay citas hoy</h5>
            </div>
          </div>
        </div>
      ) : loading ? (
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
              <div
                key={quote.id}
                className="card card-quotes m-3 rounded-3 bg-transparent border border-light border-2"
              >
                <div className="card-header bg-primary">
                  <img
                    src="src/assets/profile_icon.jpg"
                    alt="Avatar"
                    className="rounded-circle me-2"
                    width="25"
                    height="25"
                    style={{ objectFit: 'cover' }}
                  />
                  {associatedProfile.name
                    ? associatedProfile.name
                    : 'Sin nombre'}
                </div>
                <div className="card-body overflow-auto border border-light">
                  <blockquote>
                    <p className="card-text">
                      <q>{quote.text}</q>
                    </p>
                  </blockquote>
                </div>
                <div className="card-footer">
                  <cite title="Source Title">
                    {associatedBook ? associatedBook.title : 'Sin titulo'}
                  </cite>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
