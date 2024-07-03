// ShowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowPage = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;
      console.log(`Fetching from: ${url}`);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Read the response as text
        try {
          const data = JSON.parse(text); // Attempt to parse as JSON
          setTransaction(data);
        } catch (jsonError) {
          throw new Error(`Invalid JSON: ${text}`); // Throw if not valid JSON
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
