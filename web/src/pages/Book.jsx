import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';
import { postReadingList, postRecommendations } from '../services/api/books';

export const Book = () => {
  const { selectedBook } = useContext(UserContext);
  const { book, author } = selectedBook;
  const navigate = useNavigate();

  if (!book || !author) {
    return <p>Cargando... </p>;
  }

  const handleBookReadList = async (book) => {
    try {
      const saveBook = await postReadingList(book.book_id);
      alert(`Libro "${book.title}": ${saveBook['message']}`);
    } catch {
      alert('¡Error! Libro ya registrado');
    }
  };

  const handleRecommendations = async (book) => {
    try {
      const saveBook = await postRecommendations(book.book_id);
      alert(`Libro "${book.title}": ${saveBook['message']}`);
    } catch {
      alert('¡Error! Libro ya registrado');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="d-flex">
        <div className="container">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
            className="img-fluid"
            alt="Book cover"
          />
        </div>
        <div className="container">
          <div>
            <h3>{book.title}</h3>
          </div>
          <div>
            <div>
              <h6>by</h6>
              <NavLink data-bs-toggle="modal" data-bs-target="#authorModal">
                {author.author_name}
              </NavLink>
            </div>
            <p>{book.description}</p>
          </div>
          <div className="mt-auto mb-2">
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() => handleBookReadList(book)}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Agregar a biblioteca
            </button>
          </div>
          <div className="mt-auto mb-2">
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() => handleRecommendations(book)}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Agregar a leídos
            </button>
          </div>
          <Link onClick={handleGoBack}>Volver</Link>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="authorModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="me-2">
                <img
                  src={`https://covers.openlibrary.org/a/olid/${author.author_id}-M.jpg`}
                  className="rounded-circle"
                  alt="Author picture"
                />
              </div>
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {author.author_name}
              </h1>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                <div>
                  <p>{author.author_bio}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
