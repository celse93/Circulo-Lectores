import { Outlet } from 'react-router';
import { NavBarFinal } from '../Navbar_final';

export const ProtectedNavBar = () => {
  return (
    <>
      <NavBarFinal />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};
