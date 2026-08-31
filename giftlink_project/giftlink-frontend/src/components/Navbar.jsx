import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = (to, label) => <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to={to}>{label}</NavLink>;
  return <header className="navbar">
    <Link className="brand" to="/">GiftLink</Link>
    <nav className="nav-links">
      {nav('/', 'Home')}{nav('/gifts', 'Gifts')}{nav('/search', 'Search')}
      {user ? <>
        {nav('/profile', `Welcome, ${user.name.split(' ')[0]}`)}
        <button className="nav-btn logout" onClick={() => { logout(); navigate('/'); }}>Logout</button>
      </> : <>
        <Link className="nav-btn login" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
      </>}
    </nav>
  </header>;
}
