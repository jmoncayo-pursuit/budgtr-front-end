// pages/IndexPage.jsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import '../styles/IndexPage.css';
import { AuthContext } from '../context/AuthContext';

const IndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user) {
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
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, [user]);

  const calculateTotal = () => {
    return transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );
  };

  return (
    <div className='index-page'>
      <table className='transactions-table'>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
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
};

export default IndexPage;