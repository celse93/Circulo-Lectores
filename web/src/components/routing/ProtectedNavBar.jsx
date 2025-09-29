import { Outlet } from 'react-router';
import { NavBarFinal } from '../Navbar_final';
import { Footer } from '../Footer';
export const ProtectedNavBar = () => {
  return (
    <>
      <NavBarFinal />
      <Outlet />
      <Footer />
    </>
  );
};
