// components/CategorySelect.jsx
import React, { useState, useEffect } from 'react';

const CategorySelect = ({
  selectedCategory,
  onCategoryChange,
  onAddCategory,
}) => {
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

  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
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
      onAddCategory(newCategory); // Tell the parent component
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <div>
      <label>
        Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
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
        <button className='transaction-button' onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
};

export default CategorySelect;