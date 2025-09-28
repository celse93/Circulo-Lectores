import { useState, useEffect } from 'react';
import { getUserReadingList, getBooksDetail } from '../services/api/books';

export const MyLibrary = () => {
  const [readingList, setReadingList] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userBooks = await getUserReadingList();
        setReadingList(userBooks);

        if (userBooks.length > 0) {
          const bookDetailPromises = userBooks.map((item) =>
            getBooksDetail(item.book_id)
          );
          const details = await Promise.all(bookDetailPromises);
          setBookDetails(details);
        }
      } catch (error) {
        console.error('Error fetching library:', error);
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
          <div className="text-white">Cargando tu biblioteca...</div>
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
              <i className="fa-solid fa-book-open fa-2x me-3 text-success"></i>
              <h1 className="text-white mb-0">Mi Biblioteca</h1>
            </div>

            {readingList.length === 0 ? (
              <div className="text-center">
                <div className="card bg-dark border border-secondary">
                  <div className="card-body py-5">
                    <i className="fa-solid fa-book-open fa-3x text-muted mb-3"></i>
                    <h5 className="text-white">Tu biblioteca está vacía</h5>
                    <p className="text-muted">
                      Comienza añadiendo libros a tu lista de lectura
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {bookDetails.map((book, index) => (
                  <div
                    key={readingList[index].id}
                    className="col-12 col-md-6 col-lg-4"
                  >
                    <div className="card bg-dark border border-secondary h-100">
                      <div className="row g-0 h-100">
                        <div className="col-4">
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                            className="img-fluid rounded-start h-100"
                            style={{ objectFit: 'cover' }}
                            alt={book.title}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body d-flex flex-column h-100">
                            <h6 className="card-title text-white">
                              {book.title}
                            </h6>
                            <p className="card-text text-muted small flex-grow-1">
                              {book.author_name?.[0] || 'Autor desconocido'}
                            </p>
                            <small className="text-muted">
                              Añadido:{' '}
                              {new Date(
                                readingList[index].created_at
                              ).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
