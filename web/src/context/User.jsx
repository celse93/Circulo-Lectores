import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../services/api/users';
import { getAuthorDetail, getBooksDetail } from '../services/api/books';

export const UserContext = createContext({
  user: '',
  login: () => {},
  logout: () => {},
  selectBook: () => {},
  selectedBook: { book: {}, author: {} },
  register: () => {}, // will accept email, password
  isLoading: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState({
    book: null,
    author: null,
  });

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await postLogin(email, password);
      setUser(data);
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
      const data = await postLogin(email, password);

      setUser(data);
      navigate('/profile');
    } catch (error) {
      console.error('Register error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const selectBook = async (bookID) => {
    setIsLoading(true);
    try {
      const bookData = await getBooksDetail(bookID);
      const authorData = await getAuthorDetail(bookData.author_id);

      setSelectedBook({ book: bookData, author: authorData });
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to select book and author:', error);
      setIsLoading(false);
      return false;
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
        selectBook,
        selectedBook,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
