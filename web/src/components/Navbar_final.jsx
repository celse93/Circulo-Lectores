import { useContext, useState } from 'react';
import { isEmpty } from 'lodash';
import { NavLink } from 'react-router';
import { UserContext } from '../context/UserContext';
import { routesConfig } from '../services/routing/routes';

export const NavBarFinal = () => {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-dark bg-transparent navbar-expand-lg">
      <div className="nav container-fluid d-flex justify-content-around ">
        <div className="nav-item dropdown">
          <button
            className="nav-link nav-item"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/">
                Buscar
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/feed">
                Feed
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-item dropdown">
          <img
            src="src/assets/profile_icon.jpg"
            alt="Avatar"
            className="rounded-circle"
            data-bs-toggle="dropdown"
            role="button"
            width="40"
            height="40"
            style={{ objectFit: 'cover' }}
          />
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Perfil
              </NavLink>
            </li>
            <li>
              <a className="dropdown-item text-danger" onClick={handleLogout}>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
