import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import { searchUsers, followUser, unfollowUser } from '../services/api/follows';
import { Typography, Box } from '@mui/material';

export const Navbar = () => {
  const { logout, profile } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const getProfileAvatar = () => {
    const userName = profile?.name || 'Usuario';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=7c3aed&color=fff&size=100&bold=true&rounded=true`;
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setSearching(true);
    try {
      const results = await searchUsers(query);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleFollow = async (userId, index) => {
    try {
      await followUser(userId);
      const newResults = [...searchResults];
      newResults[index].is_following = true;
      newResults[index].followers_count += 1;
      setSearchResults(newResults);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId, index) => {
    try {
      await unfollowUser(userId);
      const newResults = [...searchResults];
      newResults[index].is_following = false;
      newResults[index].followers_count -= 1;
      setSearchResults(newResults);
    } catch (error) {
      console.error('Error unfollowing user;', error);
    }
  };

  const getUserAvatar = (userName) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=7c3aed&color=fff&size=40&bold=true&rounded=true`;
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <nav className="navbar navbar-dark bg-transparent navbar-expand-lg">
      <div className="nav container-fluid d-flex justify-content-between align-items-center mx-3">
        <Box>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontFamily: 'serif',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--chart-0)',
            }}
            className="clickable-item"
            onClick={() => navigate('/')}
          >
            Wisdom
          </Typography>
        </Box>

        <div className="nav-item dropdown">
          <img
            src={getProfileAvatar()}
            alt="Avatar"
            className="rounded-circle"
            data-bs-toggle="dropdown"
            role="button"
            width="40"
            height="40"
            style={{ objectFit: 'cover' }}
          />
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Perfil
              </NavLink>
            </li>
            <li>
              <a className="dropdown-item text-danger" onClick={handleLogout}>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
