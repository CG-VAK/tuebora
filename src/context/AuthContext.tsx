// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type UserData = {
    username: string;
    // other user-related properties
  };

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}
interface Props {
    children: React.ReactNode;
  }
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('authenticated')
  );

  const login = (username: string, password: string) => {
    // Replace with your authentication logic
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('authenticated', 'true');
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
