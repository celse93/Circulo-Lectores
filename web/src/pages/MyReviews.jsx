import { useState, useEffect } from 'react';
import { getUserReviews, getBooksDetail } from '../services/api/books';

export const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userReviews = await getUserReviews();
        setReviews(userReviews);

        if (userReviews.length > 0) {
          const bookDetailPromises = userReviews.map((review) =>
            getBooksDetail(review.book_id)
          );
          const details = await Promise.all(bookDetailPromises);
          setBookDetails(details);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${
          i < rating ? 'text-warning' : 'text-muted'
        }`}
      ></i>
    ));
  };

  if (loading) {
    return (
      <div className="container-fluid bg-dark min-vh-100 py-4">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">Cargando tus reseñas...</div>
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
              <i className="fa-solid fa-star fa-2x me-3 text-info"></i>
              <h1 className="text-white mb-0">Mis Reseñas</h1>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center">
                <div className="card bg-dark border border-secondary">
                  <div className="card-body py-5">
                    <i className="fa-solid fa-star fa-3x text-muted mb-3"></i>
                    <h5 className="text-white">No tienes reseñas</h5>
                    <p className="text-muted">
                      Comparte tu opinión sobre los libros que has leído
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {reviews.map((review, index) => {
                  const book = bookDetails[index];
                  return (
                    <div key={review.id} className="col-12 col-md-6">
                      <div className="card bg-dark border border-secondary h-100">
                        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">
                            <i className="fa-solid fa-star me-2"></i>
                            Reseña
                          </h6>
                          <div>{renderStars(review.ratings)}</div>
                        </div>
                        <div className="card-body">
                          <h6 className="card-title text-white">
                            {book?.title || 'Título desconocido'}
                          </h6>
                          <p className="card-text text-white">{review.text}</p>
                        </div>
                        <div className="card-footer text-muted small">
                          Reseñada:{' '}
                          {new Date(review.created_at).toLocaleDateString()}
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
