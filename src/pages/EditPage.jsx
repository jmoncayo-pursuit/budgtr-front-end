// EditPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: '',
    amount: '',
    date: '',
    from: '',
    category: '',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Edit Transaction</h2>
      <form className='transaction-form' onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type='text'
            name='item_name'
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          From:
          <input
            type='text'
            name='from'
            value={formData.from}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default EditPage;
