import { createContext, useState } from 'react';

export const UserContext = createContext({
  token: null,
  email: null,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  getProfile: async () => {},
});

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas.');
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
    } catch (err) {
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario.');
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
    } catch (err) {
      throw err;
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
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el perfil.');
      }

      const data = await response.json();
      setUser(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ token, email, user, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};