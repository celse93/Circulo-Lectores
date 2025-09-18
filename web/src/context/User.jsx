import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';
import { getBooksSearch } from '../services/api/books';

export const UserContext = createContext({
  user: {},
  book: {},
  login: () => {},
  logout: () => {},
  register: () => {},
  getBook: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
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

  const getBook = (id) => {
    getBooksSearch(id).then((data) => {
      setBook(data);
      navigate('/book');
    });
  };

  return (
    <UserContext.Provider
      value={{ user, book, login, logout, register, getBook }}
    >
      {children}
    </UserContext.Provider>
  );
};
