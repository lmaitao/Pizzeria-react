import { createContext, useState } from 'react';

export const UserContext = createContext({
  token: true, // Valor por defecto del token
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true);

  const logout = () => {
    setToken(false);
  };

  return (
    <UserContext.Provider value={{ token, logout }}>
      {children}
    </UserContext.Provider>
  );
};