import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    token: null,
    errorMessage: '',
    user: null,
  },
  reducers: {
    addError: (state, { payload }) => {
      state.user = null;
      state.status = 'not-authenticated';
      state.token = null;
      state.errorMessage = payload;
    },
    logout: (state) => {
      state.status = 'not-authenticated';
      state.token = null;
      state.user = null;
    },
    notAuthenticated: (state) => {
      state.status = 'not-authenticated';
      state.token = null;
      state.user = null;
    },
    removeError: (state) => {
      state.errorMessage = '';
    },
    signUp: (state, { payload }) => {
      state.errorMessage = '';
      state.status = 'authenticated';
      state.token = payload.token;
      state.user = payload.user;
    },
  },
});

export const { addError, logout, notAuthenticated, removeError, signUp } = authSlice.actions;
