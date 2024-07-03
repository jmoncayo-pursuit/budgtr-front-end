//IndexPage.jsx
import React, { useState, useEffect } from 'react';

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>From</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.item_name}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>{transaction.from}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
