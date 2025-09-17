import { Link } from 'react-router';

export const Register = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Crear cuenta</h3>
            </div>
            <div className="card-body">
              <p>Página de registro en construcción...</p>
              <Link to="/login" className="btn btn-primary">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
