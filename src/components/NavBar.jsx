// components/NavBar.jsx
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => (
  <nav>
    <Link to='/' className='title-header'>
      Budgtr App
    </Link>
    <ul>
      <li>
        <Link to='/new' className='new-transaction-button'>
          New Transaction
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
