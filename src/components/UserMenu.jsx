import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, clearCredentials } from '../features/authSlice';
import { Button } from '@mui/material';

const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearCredentials());
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <div>
      <p>{email}</p>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
