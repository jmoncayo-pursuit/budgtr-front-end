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
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './styles/main.css';

const App = () => (
  <Router>
    <AuthProvider>
      <NavBar />
      <div id='root'>
        <Routes>
          <Route path='/' element={<Navigate to='/transactions' />} />{' '}
          {/* Redirect to /transactions */}
          <Route path='/transactions' element={<IndexPage />} />
          <Route path='/transactions/:id' element={<ShowPage />} />
          <Route path='/new' element={<NewPage />} />
          <Route path='/edit/:id' element={<EditPage />} />
        </Routes>
      </div>
    </AuthProvider>
  </Router>
);

export default App;