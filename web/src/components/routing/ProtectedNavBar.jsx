import { Outlet } from 'react-router';
import { NavBar } from '../NavBar';

export const ProtectedNavBar = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
