import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
