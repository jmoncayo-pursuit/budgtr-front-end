// pages/ShowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowPage = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setTransaction(data));
  }, [id]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>
        <strong>Item Name:</strong> {transaction.item_name}
      </p>
      <p>
        <strong>Amount:</strong> ${transaction.amount}
      </p>
      <p>
        <strong>Date:</strong> {transaction.date}
      </p>
      <p>
        <strong>From:</strong> {transaction.from}
      </p>
      <p>
        <strong>Category:</strong> {transaction.category}
      </p>
    </div>
  );
};

export default ShowPage;
