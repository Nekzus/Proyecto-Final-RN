import { createSlice } from '@reduxjs/toolkit';

export const errorloadSlice = createSlice({
  name: 'errorload',
  initialState: {
    errorMessage: '',
    loading: false,
  },
  reducers: {
    addError: (state, { payload }) => {
      state.errorMessage = payload;
    },
    loadingData: (state, { payload }) => {
      state.loading = payload;
    },
    removeError: (state) => {
      state.errorMessage = '';
    },
  },
});

export const { addError, loadingData, removeError } = errorloadSlice.actions;
