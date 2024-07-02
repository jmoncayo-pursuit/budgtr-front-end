// pages/NewPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPage = () => {
  const navigate = useNavigate();
  const [newTransaction, setNewTransaction] = useState({
    item_name: '',
    amount: '',
    date: '',
    from: '',
    category: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type='text'
            name='item_name'
            value={newTransaction.item_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type='number'
            name='amount'
            value={newTransaction.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            name='date'
            value={newTransaction.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          From:
          <input
            type='text'
            name='from'
            value={newTransaction.from}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type='text'
            name='category'
            value={newTransaction.category}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NewPage;
