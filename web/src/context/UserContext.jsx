import { createContext, useState } from 'react';
import { postLogin, postLogout, postRegister } from '../services/api/auth';
import { useNavigate } from 'react-router';
import { getAuthorDetail, getBooksDetail } from '../services/api/books';
import { getCurrentProfile } from '../services/api/users';

export const UserContext = createContext({
  user: {},
  profile: {},
  login: () => {},
  logout: () => {},
  selectBook: () => {},
  selectedBook: { book: {}, author: {} },
  register: () => {},
  isLoading: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState({
    book: null,
    author: null,
  });

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const user = await postLogin(email, password);
      setUser(user);
      const profile = await getCurrentProfile();
      setProfile(profile);
      navigate('/');
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

      const userData = await postLogin(email, password);
      setUser(userData);

      const profileData = await getCurrentProfile();
      setProfile(profileData);

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
        setUser,
        profile,
        setProfile,
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
