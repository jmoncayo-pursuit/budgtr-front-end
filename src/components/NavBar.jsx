// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/new'>New Transaction</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
