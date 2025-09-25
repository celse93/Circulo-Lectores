import { useContext, useState } from 'react';
import { isEmpty } from 'lodash';
import { NavLink } from 'react-router';
import { UserContext } from '../context/User';
import { routesConfig } from '../services/routing/routes';

export const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar bg-primary">
      {routesConfig.map((route) => {
        return (
          <>
            <NavLink key={route.name} to={route.path}>
              <button type="button" className="btn btn-primary navbar-brand">
                {route.name}
              </button>
            </NavLink>
          </>
        );
      })}
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-primary navbar-brand"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
