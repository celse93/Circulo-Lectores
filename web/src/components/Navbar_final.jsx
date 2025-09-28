import { useContext, useState } from 'react';
import { isEmpty } from 'lodash';
import { NavLink } from 'react-router';
import { UserContext } from '../context/UserContext';
import { routesConfig } from '../services/routing/routes';

export const NavBarFinal = () => {
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar navbar-dark bg-transparent navbar-expand-lg">
      <div className="nav container-fluid d-flex justify-content-around ">
        <div className="nav-item">
          <NavLink className="navbar-brand" to="/">
            <img src="public/astro.jpg" alt="logo" width="30" height="24" />
          </NavLink>
        </div>
        <div className="nav-item">
          <button
            className="nav-link nav-item dropdown"
            type="button"
            role="button"
            data-bs-toggle="dropdown"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#scrollspyHeading3">
                Feed
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-item">
          <img
            src="src/assets/profile_icon.jpg"
            alt="Avatar"
            className="rounded-circle"
            width="35"
            height="35"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </nav>
  );
};
