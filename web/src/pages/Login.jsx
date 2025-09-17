import { Link } from 'react-router';

export const Login = () => {
  return (
    <div className="splash-container">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-transparent position-fixed w-100"
        style={{ zIndex: 1000 }}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/login">
            <img
              src="web/public/lol.png"
              alt="logo"
              className="logo-icon me-2"
            />
            <span className="brand-text">Circulo Lectores</span>
          </Link>

          <Link to="/login-form" className="btn btn-primary px-4 py-2">
            Ingresar
          </Link>
        </div>
      </nav>

      <div className="hero-section d-flex align-items-center justify-content-center min-vh-100 position-relative">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div
          className="container text-center position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="hero-title mb-4">
                Descubre tu próxima lectura.
                <br />
                Registra tu progreso.
                <br />
                Crea tu espacio.
              </h1>
              <Link
                to="/register"
                className="btn btn-primary btn-lg px-5 py-3 mb-5"
              >
                Crear mi biblioteca
              </Link>
              <p className="hero-subtitle mb-5">El espacio para los que leen</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="feature-card h-100 p-4 rounded">
                <div className="feature-icon mb-3">📚</div>
                <h3 className="feature-title mb-3">Organiza tu biblioteca</h3>
                <p className="feature-description">
                  Lleva un registro de los libros que has leído, los que estás
                  leyendo y los que quieres leer.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="feature-card h-100 p-4 rounded">
                <div className="feature-icon mb-3">🔍</div>
                <h3 className="feature-title mb-3">Descubre nuevas lecturas</h3>
                <p className="feature-description">
                  Explora el inmenso mundo literario y encuentra tu próximo
                  libro favorito a través de recomendaciones personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
