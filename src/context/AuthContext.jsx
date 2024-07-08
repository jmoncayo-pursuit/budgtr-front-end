// context/AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state (null)

  // Function to simulate login (replace with your actual login logic)
  const login = (username, password) => {
    // Simulate authentication (replace with your actual authentication logic)
    const token = 'your-fake-token'; // Replace with a generated token
    setUser({
      username,
      token,
    });
  };

  // Function to simulate logout (replace with your actual logout logic)
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} 
    </AuthContext.Provider> 
  ); 
};

export default AuthProvider; // Export AuthProvider as the default