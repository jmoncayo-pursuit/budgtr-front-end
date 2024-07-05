import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ShowPage.css';

const ShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      const url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTransaction(data);
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

  const handleDelete = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setShowConfirmation(true); // Show the confirmation message
      setTimeout(() => {
        navigate('/'); // Redirect after 2 seconds
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

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
          <strong>Date:</strong>{' '}
          {new Date(transaction.date).toLocaleDateString()}
        </p>
        <p>
          <strong>From:</strong> {transaction.from}
        </p>
        <p>
          <strong>Category:</strong> {transaction.category}
        </p>
        <button
          className='transaction-button'
          onClick={() => navigate(`/edit/${transaction.id}`)}
        >
          {' '}
          Edit{' '}
        </button>
        <button className='transaction-button' onClick={handleDelete}>
          Delete
        </button>
      </div>
      {showConfirmation && (
        <div className='confirmation-message'>
          Transaction deleted successfully!
        </div>
      )}
    </div>
  );
};

export default ShowPage;
