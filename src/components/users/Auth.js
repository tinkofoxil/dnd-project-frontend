import jwt from 'jsonwebtoken';
import axios from 'axios';

export const login = async (username, password) => {
  // make a request to your authentication API
  const response = await axios.post('/api/auth/login', { username, password });

  // if the API returns a JWT, decode it and store it in localStorage
  if (response.data.token) {
    const decodedToken = jwt.decode(response.data.token);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', decodedToken.userId);
  }

  return response.data;
};

export const logout = () => {
  // remove the token from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const isLoggedIn = () => {
  // check if the user is logged in by checking if the token is present in localStorage
  const token = localStorage.getItem('token');
  return !!token;
};

export const getToken = () => {
  // return the token from localStorage
  return localStorage.getItem('token');
};
