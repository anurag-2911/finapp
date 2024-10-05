export const initialState = {
    isAuthenticated: false,
    token: null,
    role: null
  };
  
  export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token,
          role: action.payload.role
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  