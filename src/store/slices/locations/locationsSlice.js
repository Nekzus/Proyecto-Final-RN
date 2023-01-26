import { createSlice } from '@reduxjs/toolkit';

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    coords: {},
    address: null,
    markcoords: {},
    history: [],
  },
  reducers: {
    coordsLocation: (state, { payload }) => {
      state.coords = payload;
      state.history = [...state.history, payload];
    },
    addressLocation: (state, { payload }) => {
      state.address = payload;
    },
    historyLocations: (state, { payload }) => {
      state.history = payload;
    },
    markcoordsLocation: (state, { payload }) => {
      state.markcoords = payload;
    },
    clearMarkcoordsLocation: (state) => {
      state.markcoords = {};
      state.address = null;
    },
  },
});

export const {
  coordsLocation,
  addressLocation,
  clearMarkcoordsLocation,
  historyLocations,
  markcoordsLocation,
} = locationsSlice.actions;
