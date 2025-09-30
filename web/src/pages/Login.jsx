import { Link } from 'react-router';
import BookCarousel from '../components/BooksCarousel';
import TrendingCarousel from '../components/TrendingCarousel';

export const Login = () => {
  return (
    <div className="splash-container">
      <nav className="navbar position-fixed w-100 nav-transparent">
        <div className="nav-inner center-max">
          <Link className="navbar-brand d-flex align-items-center" to="/login">
            <img src="/astro.jpg" alt="logo" className="logo-icon me-2" />
            <span className="brand-text">Círculo Lectores</span>
          </Link>

          <Link to="/login-form" className="btn btn-primary btn-sm">
            Ingresar
          </Link>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-background" />
        <div className="hero-overlay" />

        <div className="hero-content center-max">
          <h1 className="hero-title">
            📚 Descubre tu próxima lectura.
            <br />
            Registra tu progreso.
            <br />
            Crea tu espacio.
          </h1>

          <Link to="/register" className="btn btn-primary btn-lg hero-cta">
            Crear mi biblioteca
          </Link>

          <p className="hero-subtitle">El espacio para los que leen</p>
        </div>
      </header>

      <section className="features-section">
        <div className="features-inner center-max">
          <div className="features-row">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Organiza tu biblioteca</h3>
              <p className="feature-description">
                Lleva un registro de los libros que has leído, los que estás
                leyendo y los que quieres leer.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Descubre nuevas lecturas</h3>
              <p className="feature-description">
                Explora el inmenso mundo literario y encuentra tu próximo libro
                favorito a través de recomendaciones personalizadas.
              </p>
            </div>
          </div>

          <div className="features-row mt-3">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Establece tu meta anual</h3>
              <p className="feature-description">
                Inicia tu desafío literario definiendo cuántos libros te
                propones leer este año.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">Reseña tus lecturas</h3>
              <p className="feature-description">
                Califica los libros y comparte tus opiniones con la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookCarousel />
      <TrendingCarousel />
    </div>
  );
};
