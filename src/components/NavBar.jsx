// components/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import { AuthContext } from '../context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';

const NavBar = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Make sure user and user.token exist before fetching
        if (user && user.token) {
          const apiUrl = `${import.meta.env.VITE_API_URL}/transactions`;
          const response = await fetch(apiUrl, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setTransactions(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login(username, password);
    setShowLogin(false);
  };

  const calculateTotal = () => {
    return transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );
  };

  const getTotalClass = (total) => {
    if (total > 100) return 'positive';
    if (total >= 0) return 'neutral';
    return 'negative';
  };

  return (
    <nav>
      <Link to='/transactions' className='title-header'>
        Budgtr App
      </Link>
      <ul>
        {/* Display account total if user is logged in */}
        {user && (
          <li>
            <span
              className={`account-total ${getTotalClass(calculateTotal())}`}
            >
              Account Total: ${calculateTotal()}
            </span>
          </li>
        )}
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
