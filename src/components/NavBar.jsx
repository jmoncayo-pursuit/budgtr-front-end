import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <h1>Budgtr</h1>
    <Link to='/new'>Create New Transaction</Link>
  </nav>
);

export default NavBar;
