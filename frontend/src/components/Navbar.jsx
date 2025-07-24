// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../auth';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      {user?.role === 'editor' && <Link to="/editor">Editor</Link>}
      {user?.role === 'viewer' && <Link to="/viewer">Viewer</Link>}

      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
