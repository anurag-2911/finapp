// context/UserContext.js
import React, { createContext, useState } from 'react';

// Define the initial state
const initialUserState = {
    token: '',
    role: '',
  };
  
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};