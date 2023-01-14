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
      state.status = 'not-authenticated';
      state.token = null;
      state.user = null;
      state.errorMessage = payload;
    },
    logOff: (state) => {
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
    signIn: (state, { payload }) => {
      state.errorMessage = '';
      state.status = 'authenticated';
      state.token = payload.token;
      state.user = payload.user;
    },
    signUp: (state, { payload }) => {
      state.errorMessage = '';
      state.status = 'authenticated';
      state.token = payload.token;
      state.user = payload.user;
    },
  },
});

export const { addError, logOff, notAuthenticated, removeError, signIn, signUp } =
  authSlice.actions;