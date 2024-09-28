import React, { createContext, useState, useEffect } from "react";

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Provedor de autenticação para encapsular os componentes filhos
export const AuthProvider = ({ children }) => {
  // Usa o localStorage para manter o estado de autenticação mesmo após a atualização da página
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true" || false
  );

  // Função para fazer login
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Salva o estado de autenticação no localStorage
  };

  // Função para fazer logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false"); // Remove o estado de autenticação do localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
