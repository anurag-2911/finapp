// src/context/authReducer.js

// Define the initial state
export const initialState = {
  isAuthenticated: false,
  token: null,
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
        role: action.payload.role,
      };
    case 'LOGOUT':
      localStorage.clear(); // Clear localStorage on logout
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};
