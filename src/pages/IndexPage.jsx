import React, { useState, useEffect } from 'react';

const IndexPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/transactions`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <h2>All Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>{transaction.item_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
