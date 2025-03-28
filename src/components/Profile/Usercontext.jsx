/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({
  token: null,
  email: null,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  getProfile: async () => {},
});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      setToken(response.data.token);
      setEmail(response.data.email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.error || 'Credenciales incorrectas.');
      } else {
        throw err;
      }
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      setToken(response.data.token);
      setEmail(response.data.email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.error || 'Error al registrar usuario.');
      } else {
        throw err;
      }
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error('No se pudo obtener el perfil.');
      } else {
        throw err;
      }
    }
  };

  return (
    <UserContext.Provider value={{ token, email, user, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};