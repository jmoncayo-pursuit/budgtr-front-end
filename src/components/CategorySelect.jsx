// components/CategorySelect.jsx
import React from 'react';

const CategorySelect = ({ categories, value, onChange }) => (
  <select value={value} onChange={onChange} required>
    <option value=''>Select a category</option>
    {categories.length > 0 &&
      categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
  </select>
);

export default CategorySelect;
