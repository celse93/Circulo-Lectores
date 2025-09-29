import { useState, useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length > 10) {
      newErrors.password = 'El nombre debe tener hasta 10 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/profile');
    } catch (error) {
      console.error(error);
      if (
        error?.message?.toLowerCase().includes('already registered') ||
        error?.message?.toLowerCase().includes('email')
      ) {
        setErrors({
          submit: 'Este email ya está registrado. Por favor inicia sesión.',
        });
      } else {
        setErrors({ submit: 'Error al crear la cuenta. Intenta de nuevo.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card bg-dark border border-secondary">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Crear tu biblioteca</h3>
              <p className="mb-0 mt-2 text-light">Únete a Círculo Lectores</p>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div className="alert alert-danger" role="alert">
                    {errors.submit}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="text" className="form-label text-white">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label text-white"
                  >
                    Confirmar contraseña *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creando cuenta...
                    </>
                  ) : (
                    'Crear mi biblioteca'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-muted mb-2">¿Ya tienes cuenta?</p>
                <Link to="/login-form" className="btn btn-outline-primary">
                  Iniciar sesión
                </Link>
              </div>

              <div className="text-center mt-3">
                <Link to="/login" className="text-muted text-decoration-none">
                  ← Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
