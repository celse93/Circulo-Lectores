import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../services/api/users';

export const UserContext = createContext({
  user: {},
  book: {},
  author: {},
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
};
