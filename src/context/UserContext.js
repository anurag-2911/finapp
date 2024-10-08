import React, { createContext, useState } from 'react';

// Define the initial state
const initialUserState = {
  token: '',
  role: '',
  username: '',
  avatar: '', // Add avatar to the state
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

// Custom hook to get the user's token
export const useUserToken = () => {
  const { user } = React.useContext(UserContext);
  return user.token;
};

// Custom hook to get the user's role
export const useUserRole = () => {
  const { user } = React.useContext(UserContext);
  return user.role;
};

// Custom hook to get the username
export const useUsername = () => {
  const { user } = React.useContext(UserContext);
  return user.username;
};

// Custom hook to get the user's avatar URL
export const useUserAvatar = () => {
  const { user } = React.useContext(UserContext);
  return user.avatar;
};

// Custom hook to update the user's avatar (if required for profile updates)
export const useUpdateAvatar = () => {
  const { setUser } = React.useContext(UserContext);
  return (avatarUrl) => setUser((prev) => ({ ...prev, avatar: avatarUrl }));
};
