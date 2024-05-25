import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('access');
  
  return (
    token ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default PrivateRoute;
