import { createSlice } from '@reduxjs/toolkit';

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    coords: {},
    address: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    coordsLocation: (state, action) => {
      state.coords = action.payload;
      state.history = [...state.history, action.payload];
    },
    addressLocation: (state, action) => {
      state.address = action.payload;
    },
    historyLocations: (state, action) => {
      state.history = action.payload;
    },
    loadingLocations: (state, action) => {
      state.loading = action.payload;
    },
    errorLocations: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  coordsLocation,
  addressLocation,
  historyLocations,
  loadingLocations,
  errorLocations,
} = locationsSlice.actions;
