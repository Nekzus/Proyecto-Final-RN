import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: false,
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.dark = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
