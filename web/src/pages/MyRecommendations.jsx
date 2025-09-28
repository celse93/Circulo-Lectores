import { useState, useEffect } from 'react';
import { getUserRecommendations, getBooksDetail } from '../services/api/books';

export const MyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRecommendations = await getUserRecommendations();
        setRecommendations(userRecommendations);

        if (userRecommendations.length > 0) {
          const bookDetailPromises = userRecommendations.map((rec) =>
            getBooksDetail(rec.book_id)
          );
          const details = await Promise.all(bookDetailPromises);
          setBookDetails(details);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
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
          <div className="text-white">Cargando tus recomendaciones...</div>
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
              <i className="fa-solid fa-heart fa-2x me-3 text-danger"></i>
              <h1 className="text-white mb-0">Mis Recomendaciones</h1>
            </div>

            {recommendations.length === 0 ? (
              <div className="text-center">
                <div className="card bg-dark border border-secondary">
                  <div className="card-body py-5">
                    <i className="fa-solid fa-heart fa-3x text-muted mb-3"></i>
                    <h5 className="text-white">No tienes recomendaciones</h5>
                    <p className="text-muted">
                      Recomienda libros que creas que otros disfrutarán
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {recommendations.map((rec, index) => {
                  const book = bookDetails[index];
                  return (
                    <div key={rec.id} className="col-12 col-md-6 col-lg-4">
                      <div className="card bg-dark border border-secondary h-100">
                        <div className="card-header bg-danger text-white">
                          <h6 className="mb-0">
                            <i className="fa-solid fa-heart me-2"></i>
                            Recomendación
                          </h6>
                        </div>
                        <div className="row g-0 h-100">
                          <div className="col-4">
                            <img
                              src={`https://covers.openlibrary.org/b/id/${book?.cover_id}-M.jpg`}
                              className="img-fluid h-100"
                              style={{ objectFit: 'cover' }}
                              alt={book?.title}
                            />
                          </div>
                          <div className="col-8">
                            <div className="card-body d-flex flex-column h-100">
                              <h6 className="card-title text-white">
                                {book?.title || 'Título desconocido'}
                              </h6>
                              <p className="card-text text-muted small flex-grow-1">
                                {book?.author_name?.[0] || 'Autor desconocido'}
                              </p>
                              <small className="text-muted">
                                Recomendado:{' '}
                                {new Date(rec.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
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
