import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import IndexPage from './pages/IndexPage';
import ShowPage from './pages/ShowPage';
import NewPage from './pages/NewPage';
import EditPage from './pages/EditPage';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route path='/transactions/:id' element={<ShowPage />} />
      <Route path='/new' element={<NewPage />} />
      <Route path='/edit/:id' element={<EditPage />} />
    </Routes>
  </Router>
);

export default App;
