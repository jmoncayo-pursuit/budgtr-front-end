// components/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import { AuthContext } from '../context/AuthContext'; 
import React, { useContext, useState } from 'react'; 

const NavBar = () => {
  const { user, login, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); // Import useNavigate
  const [showLogin, setShowLogin] = useState(false); // For showing/hiding login form

  const handleLogin = () => {
    setShowLogin(true); // Show the login form
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login(username, password);
    setShowLogin(false); // Hide the login form
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <nav>
      <Link to='/transactions' className='title-header'>
        Budgtr App
      </Link>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/new' className='new-transaction-button'>
                Transaction?
              </Link>
            </li>
            <li>
              <span className='username'>Welcome, {user.username}!</span>
            </li>
            <li>
              <button className='transaction-button' onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            {showLogin ? (
              <form onSubmit={handleLoginSubmit}>
                <label>
                  Username:
                  <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button className='transaction-button' type='submit'>
                  Login
                </button>
              </form>
            ) : (
              <button className='transaction-button' onClick={handleLogin}>
                Login
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;