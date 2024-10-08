// src/context/authReducer.js

// Define the initial state
export const initialState = {
  isAuthenticated: false,
  token: null,
  username: null,
  role: null,
};

// Reducer function
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.username, // Store username
        role: action.payload.role, // Store role
      };
    case 'LOGOUT':
      localStorage.clear(); // Clear localStorage on logout
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        username: null,
        role: null,
      };
    default:
      return state;
  }
};
