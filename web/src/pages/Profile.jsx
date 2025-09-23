import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/User';
import { getCurrentUser } from '../services/api/users';

export const Profile = () => {
  const { logout } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    name: '',
    avatar: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const userData = await getCurrentUser();
      setProfileData({
        name: userData.name || '',
        avatar: userData.avatar || '',
        email: userData.email || '',
      });
    } catch (error) {
      console.error(error);
      setError('Error al cargar los datos del perfil');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
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
                          src={
                            profileData.avatar ||
                            'https://via.placeholder.com/150x150?text=Avatar'
                          }
                          alt="Avatar"
                          className="rounded-circle"
                          width="150"
                          height="150"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {isEditing && (
                        <div className="mb-3">
                          <label
                            htmlFor="avatar"
                            className="form-label text-white small"
                          >
                            URL del Avatar
                          </label>
                          <input
                            type="url"
                            className="form-control form-control-sm"
                            id="avatar"
                            name="avatar"
                            value={profileData.avatar}
                            onChange={handleInputChange}
                            placeholder="https://ejemplo.com/avatar.jpg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-8">
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={profileData.email}
                          disabled
                        />
                        <small className="text-muted">
                          El email no se puede modificar
                        </small>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="name" className="form-label text-white">
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="d-flex gap-2">
                        {!isEditing ? (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                          >
                            Editar Perfil
                          </button>
                        ) : (
                          <>
                            <button
                              type="submit"
                              className="btn btn-success"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Guardando...
                                </>
                              ) : (
                                'Guardar Cambios'
                              )}
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                setIsEditing(false);
                                loadProfileData();
                              }}
                              disabled={isLoading}
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
    </div>
  );
};
