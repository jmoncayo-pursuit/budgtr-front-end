// pages/EditPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    // Fetch the transaction details
    const fetchTransaction = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/transactions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setTransaction(data);
      } catch (err) {
        console.error('Error fetching transaction:', err);
      }
    };

    // Fetch categories
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
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchTransaction();
    fetchCategories();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    setTransaction((prevState) => ({
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ category: newCategory }),
        }
      );
      const data = await response.json();
      setCategories([...categories, data.category]);
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating transaction:', err);
      });
  };

  return (
    <div>
      <h2>Edit Transaction</h2>
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
        <button className='save-transaction-button' type='submit'>
        
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditPage;
