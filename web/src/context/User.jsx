import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';
import { getBooksDetail } from '../services/api/books';
import { getCurrentUser } from '../services/api/users';

export const UserContext = createContext({
  user: {},
  book: {},
  bookDetails: {},
  login: () => {},
  logout: () => {},
  register: () => {},
  getBook: () => {},
  currentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    authorName: '',
    year: '',
    cover_id: '',
  });

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
    getBooksDetail(id).then((data) => {
      setBook(data);
      navigate('/book');
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
        login,
        logout,
        register,
        getBook,
        bookDetails,
        setBookDetails,
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
