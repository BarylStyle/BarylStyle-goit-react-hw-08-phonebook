import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Contacts from './Contacts';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

const App = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  return (
    <Router>
      <div>
        <Navigation />
        {isAuthenticated && <UserMenu />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;