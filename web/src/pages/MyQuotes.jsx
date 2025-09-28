import { useState, useEffect } from 'react';
import { getUserQuotes, getBooksDetail } from '../services/api/books';

export const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userQuotes = await getUserQuotes();
        setQuotes(userQuotes);

        if (userQuotes.length > 0) {
          const bookDetailPromises = userQuotes.map((quote) =>
            getBooksDetail(quote.book_id)
          );
          const details = await Promise.all(bookDetailPromises);
          setBookDetails(details);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid bg-dark min-vh-100 py-4">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">Cargando tus citas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-dark min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="d-flex align-items-center mb-4">
              <i className="fa-solid fa-quote-left fa-2x me-3 text-warning"></i>
              <h1 className="text-white mb-0">Mis Citas</h1>
            </div>

            {quotes.length === 0 ? (
              <div className="text-center">
                <div className="card bg-dark border border-secondary">
                  <div className="card-body py-5">
                    <i className="fa-solid fa-quote-left fa-3x text-muted mb-3"></i>
                    <h5 className="text-white">No tienes citas guardadas</h5>
                    <p className="text-muted">
                      Guarda las frases que más te inspiren
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {quotes.map((quote, index) => {
                  const book = bookDetails[index];
                  return (
                    <div key={quote.id} className="col-12 col-md-6">
                      <div className="card bg-dark border border-secondary h-100">
                        <div className="card-header bg-warning text-dark">
                          <h6 className="mb-0">
                            <i className="fa-solid fa-quote-left me-2"></i>
                            Cita
                          </h6>
                        </div>
                        <div className="card-body">
                          <blockquote className="blockquote mb-3">
                            <p className="text-white">
                              &quot;{quote.text}&quot;
                            </p>
                          </blockquote>
                          <footer className="blockquote-footer">
                            <cite title="Source Title" className="text-muted">
                              {book?.title || 'Título desconocido'}
                            </cite>
                          </footer>
                        </div>
                        <div className="card-footer text-muted small">
                          Guardada:{' '}
                          {new Date(quote.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
