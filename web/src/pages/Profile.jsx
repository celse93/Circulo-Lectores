import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getBooksSearch } from '../services/api/books';
import { postQuote } from '../services/api/books';
import { updateProfile, getCurrentUser } from '../services/api/users';

export const Profile = () => {
  const { logout, profile, setUser, setProfile } = useContext(UserContext);
  const [query, setQuery] = useState('');
  const [quote, setQuote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [books, setBooks] = useState([]);
  const [bookSelected, setBookSelected] = useState({});
  const [newUsername, setNewUsername] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor ingresa un término de búsqueda');
      return;
    }

    setError('');

    try {
      const result = await getBooksSearch(query);
      setBooks(result);
    } catch (error) {
      console.error(error);
      setError('Error al buscar libros. Intenta de nuevo.');
      setBooks([]);
    }
  };

  const handleBookSelected = (book) => {
    setQuery(book.title);
    setBookSelected(book);
  };

  const handleSaveQuote = async () => {
    try {
      const saveQuote = await postQuote(bookSelected.book_id, quote.trim());
      alert(`${saveQuote['message']}`);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setQuery('');
      setQuote('');
    }
  };

  const handleCloseQuoteModal = () => {
    setQuery('');
    setQuote('');
  };

  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');

    try {
      const profile = await updateProfile(newUsername);
      setProfile(profile);
      const user = await getCurrentUser();
      setUser(user);

      setSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError('Error al actualizar el perfil');
    } finally {
      setIsEditing(false);
      setNewUsername('');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-fluid bg-dark min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card bg-dark border border-secondary mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Mi Perfil</h2>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>

              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSaveProfile}>
                  <div className="row">
                    <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
                      <div className="mb-3">
                        <img
                          src="src/assets/profile_icon.jpg"
                          alt="Avatar"
                          className="rounded-circle"
                          width="100"
                          height="100"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-8">
                      {isEditing ? (
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="form-label text-white"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder={profile.name}
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="d-flex gap-2">
                        {!isEditing && (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                          >
                            Editar Perfil
                          </button>
                        )}{' '}
                        {isEditing && (
                          <>
                            <button type="submit" className="btn btn-success">
                              Guardar
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                setIsEditing(false);
                              }}
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Open modal
            </button>

            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="card bg-dark border border-secondary h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">📚 Mi Biblioteca</h5>
                  </div>
                  <div className="card-body text-center">
                    <p className="text-muted mb-3">Lista de lectura</p>
                    <button className="btn btn-outline-primary btn-sm">
                      Ver Libros
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card bg-dark border border-secondary h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">⭐ Mis Reseñas</h5>
                  </div>
                  <div className="card-body text-center">
                    <p className="text-muted mb-3">Libros reseñados</p>
                    <button className="btn btn-outline-primary btn-sm">
                      Ver Reseñas
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card bg-dark border border-secondary h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">💭 Mis Citas</h5>
                  </div>
                  <div className="card-body text-center">
                    <p className="text-muted mb-3">Frases favoritas</p>
                    <button className="btn btn-outline-primary btn-sm">
                      Ver Citas
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card bg-dark border border-secondary h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">🎯 Recomendaciones</h5>
                  </div>
                  <div className="card-body text-center">
                    <p className="text-muted mb-3">Libros recomendados</p>
                    <button className="btn btn-outline-primary btn-sm">
                      Ver Recomendaciones
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Libro:
                  </label>
                  <div className="input-group">
                    <button
                      onClick={handleSearch}
                      type="button"
                      className="btn btn-primary btn-sm dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                    >
                      Buscar
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar libros por título, autor..."
                      id="recipient-name"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <ul className="dropdown-menu">
                      {books.map((book) => (
                        <li key={book.book_id}>
                          <a
                            onClick={() => handleBookSelected(book)}
                            className="dropdown-item d-flex"
                          >
                            <img
                              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                            />
                            <p>{book.title}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Cita:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseQuoteModal}
              >
                Cerrar
              </button>
              <button
                onClick={handleSaveQuote}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
