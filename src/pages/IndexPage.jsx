// pages/IndexPage.jsx

// pages/IndexPage.jsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import '../styles/IndexPage.css';
import { AuthContext } from '../context/AuthContext';

const IndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext); // Access user and logout function

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Only fetch if the user is logged in
        if (user) {
          const apiUrl = `${import.meta.env.VITE_API_URL}/transactions`;
          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${user.token}` // Add Authorization header
            }
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
  }, [user]); // Only re-run useEffect if user changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  if (error) {
    return <div> Error: {error}</div>;
  }

  // Only show the transactions table and total if user is logged in
  if (user) {
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
      <div className='index-page'>
        <h2 className={`title ${getTotalClass(calculateTotal())}`}>
          Bank Account Total: ${calculateTotal()}
        </h2>
        <table className='transactions-table'>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>
                  <Link to={`/transactions/${transaction.id}`}>
                    {transaction.item_name}
                  </Link>
                </td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    // Show a message if the user is not logged in
    return (
      <div>
        <p className='login-message'> Please login to view your transactions. </p>
      </div>
    );
  }
};

export default IndexPage;