// pages/NewPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';
import '../styles/IndexPage.css';


const NewPage = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    item_name: '',
    amount: '',
    date: '',
    from: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        console.log('Fetched categories:', data); // Log fetched categories
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    console.log('Category selected:', value);
    setTransaction((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ category: newCategory }),
        }
      );
      const data = await response.json();
      console.log('Added category:', data); // Log added category
      setCategories([...categories, data.category]);
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Transaction before submit:', transaction);
    if (!transaction.category) {
      alert('Please select a category.');
      return;
    }

    const payload = JSON.stringify(transaction);

    fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Error creating transaction:', err);
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
            value={transaction.item_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type='number'
            name='amount'
            value={transaction.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            name='date'
            value={transaction.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          From:
          <input
            type='text'
            name='from'
            value={transaction.from}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <CategorySelect
            categories={categories}
            value={transaction.category}
            onChange={handleCategoryChange}
          />
        </label>
        <div>
          <input
            type='text'
            placeholder='New Category'
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
          <button
            type='button'
            className='save-transaction-button'
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
        <button type='submit' className='save-transaction-button'>
          Create Transaction
        </button>
      </form>
    </div>
  );
};

export default NewPage;
