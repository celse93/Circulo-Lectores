import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';

export const UserContext = createContext({
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {}, // will accept email, password
  isLoading: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('Intentando login con:', { email });
      const data = await postLogin(email, password);
      console.log('Login exitoso:', data);
      setUser(data.user);
      navigate('/profile');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await postLogout();
      setUser({});
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setUser({});
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('Iniciando registro con:', { email });

      const registerResult = await postRegister(email, password);
      console.log('Registro exitoso:', registerResult);

      console.log('Iniciando login automático...');
      const loginData = await postLogin(email, password);
      console.log('Login automático exitoso:', loginData);

      setUser(loginData.user);
      console.log('Usuario establecido, navegando a /profile');
      navigate('/profile');
    } catch (error) {
      console.error('Register error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/*import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';

export const UserContext = createContext({
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = (email, password) => {
    postLogin(email, password).then((data) => {
      setUser(data.user);
      navigate('/');
    });
  };

  const logout = () => {
    postLogout().then(() => {
      setUser({});
    });
  };

  const register = (email, password) => {
    postRegister(email, password).then(() => {
      login(email, password);
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}; */
