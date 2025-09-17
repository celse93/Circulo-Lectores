import { Routes, Route } from 'react-router';

{
  /* import { NavBar } from "./components/NavBar"; */
}
import { routesConfig } from './services/routing/routes';
import { GuardedRoute } from './components/routing/GuardedRoute';
import { LoginRedirect } from './components/routing/LoginRedirect';
import { Register } from './pages/Register';
import { LoginForm } from './pages/LoginForm';

import './App.css';

export const App = () => {
  return (
    <>
      {/*<NavBar />*/}
      <Routes>
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route element={<GuardedRoute />}>
          {routesConfig.map((route) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};
