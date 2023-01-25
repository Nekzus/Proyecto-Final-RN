import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    token: null,
    user: null,
  },
  reducers: {
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
    signIn: (state, { payload }) => {
      state.status = 'authenticated';
      state.token = payload.token;
      state.user = payload.user;
    },
    signUp: (state, { payload }) => {
      state.status = 'authenticated';
      state.token = payload.token;
      state.user = payload.user;
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { logOff, notAuthenticated, signIn, signUp, updateUser } = authSlice.actions;
