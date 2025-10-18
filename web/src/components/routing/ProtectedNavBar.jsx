import { Outlet } from 'react-router';
import { NavBarFinal } from '../Navbar_final';
import { Navbar } from '../Navbar';
export const ProtectedNavBar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
