import { createSlice } from '@reduxjs/toolkit';
import { generateToken, verifyToken } from '../utils/jwt';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const token = generateToken(action.payload);
      state.user = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    checkAuth: (state) => {
      if (state.token) {
        const payload = verifyToken(state.token);
        if (payload) {
          state.user = payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem('token');
        }
      }
    }
  }
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;