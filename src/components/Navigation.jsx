import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated ? (
        <NavLink to="/contacts">Contacts</NavLink>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
