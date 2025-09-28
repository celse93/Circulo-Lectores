import { Outlet } from 'react-router';
import { NavBar } from '../NavBar';
import { NavBarFinal } from '../Navbar_final';

export const ProtectedNavBar = () => {
  return (
    <>
      <NavBarFinal />
      <Outlet />
    </>
  );
};
