// pages/IndexPage.jsx

import React, { useState, useEffect } from 'react';
import '../styles/IndexPage.css';

const IndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/transactions`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  if (error) {
    return <div> Error: {error }</div>;
  }

  const calculateTotal = () => {
    return transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );
  };

  return (
    <div className='index-page'>
      <h2 className='title'>Bank Account Total: ${calculateTotal()}</h2>
      <table className='transactions-table'>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{formatDate(transaction.date)}</td>
              <td>
                <a href={`/transactions/${transaction.id}`}>
                  {transaction.item_name}
                </a>
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
