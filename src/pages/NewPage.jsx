// pages/NewPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

const NewPage = () => {
  const navigate = useNavigate();
  const [newTransaction, setNewTransaction] = useState({
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
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    setNewTransaction((prevState) => ({
      ...prevState,
      category: event.target.value,
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
          },
          body: JSON.stringify({ category: newCategory }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Refresh categories after adding
      const data = await response.json();
      setCategories([...categories, newCategory]);
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
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
      <h2 className='title'> New Transaction </h2>
      <form className='transaction-form' onSubmit={handleSubmit}>
        {/* ... Other form inputs ... */}

        <label>
          Category:
          <select value={newTransaction.category} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className='new-category'>
          <input
            type='text'
            placeholder='New Category'
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>

        <button className='save-transaction-button' type='submit'>
          Create New Item
        </button>
      </form>
    </div>
  );
};

export default NewPage;