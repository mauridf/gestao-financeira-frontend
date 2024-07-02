import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Verifica se estamos no cliente
    if (typeof window !== "undefined") {
      const storedNomeUsuario = localStorage.getItem('nomeUsuario');
      const storedUserId = localStorage.getItem('userId');

      if (storedNomeUsuario) {
        setNomeUsuario(storedNomeUsuario);
      }

      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  const login = (nome, id) => {
    setNomeUsuario(nome);
    setUserId(id.toString());
    // Salva no localStorage
    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('userId', id.toString());
  };

  const logout = () => {
    setNomeUsuario(null);
    setUserId(null);
    // Remove do localStorage
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ nomeUsuario, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};