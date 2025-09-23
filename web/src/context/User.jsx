import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../services/api/users';

export const UserContext = createContext({
  user: '',
  book: {},
  author: {},
  login: () => {},
  logout: () => {},
  register: () => {}, // will accept email, password
  isLoading: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await postLogin(email, password);
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

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      await postRegister(name, email, password);

      //Login automático
      await postLogin(email, password);

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
        book,
        author,
        setAuthor,
        setBook,
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
  getBook: () => {},
  currentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState({});
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

  const currentUser = () => {
    getCurrentUser().then((data) => {
      setUser(data.user);
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        book,
        author,
        setAuthor,
        setBook,
        login,
        logout,
        register,
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; */
