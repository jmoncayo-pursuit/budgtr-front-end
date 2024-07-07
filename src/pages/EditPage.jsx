// pages/EditPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';
import '../styles/main.css';

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
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/transactions/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Format the date string
        const formattedDate = new Date(data.date).toISOString().split('T')[0];
        setFormData({ ...data, date: formattedDate });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

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

  const handleChange = (e) => {
    // Destructure only if 'name' is defined
    if (e.target.name) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoryChange = (value) => {
    // Update the category directly
    setFormData({ ...formData, category: value });
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <div className='loading-spinner'>Loading...</div>;
  }

  if (error) {
    return <div className='error-message'>Error: {error}</div>;
  }

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
        <CategorySelect
          selectedCategory={formData.category}
          onCategoryChange={handleCategoryChange}
          onAddCategory={handleAddCategory}
        />
        <button className='save-transaction-button' type='submit'>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;