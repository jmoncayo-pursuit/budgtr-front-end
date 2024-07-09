// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import IndexPage from './pages/IndexPage';
import ShowPage from './pages/ShowPage';
import NewPage from './pages/NewPage';
import EditPage from './pages/EditPage';
import { AuthProvider } from './context/AuthContext';
import './styles/main.css';

const App = () => (
  <Router>
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to='/transactions' />} />
        <Route path='/transactions' element={<IndexPage />} />
        <Route path='/transactions/:id' element={<ShowPage />} />
        <Route path='/new' element={<NewPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
