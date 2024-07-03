// pages/ShowPage.jsx
// ShowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ShowPage.css';

const ShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;
      try {
        const response = await fetch(url);
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          setTransaction(data);
        } catch (jsonError) {
          throw new Error(`Invalid JSON: ${text}`);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransaction();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className='transaction-details-container'>
      <h2 className='title'>Transaction Details</h2>
      <div className='transaction-details'>
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
        <button className='save-transaction-button' onClick={() => navigate(`/edit/${transaction.id}`)}> Edit </button>
      </div>
    </div>
  );
};

export default ShowPage;
