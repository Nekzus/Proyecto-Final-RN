import { createSlice } from '@reduxjs/toolkit';

export const publishSlice = createSlice({
  name: 'publish',
  initialState: {
    newId: null,
    categories: null,
    publications: [],
    myPublications: [],
    publication: null,
  },
  reducers: {
    loadPublications: (state, { payload }) => {
      state.publications = payload;
    },
    loadPublicationById: (state, { payload }) => {
      state.publication = payload;
    },
    loadMyPublications: (state, { payload }) => {
      state.myPublications = payload;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setNewId: (state, { payload }) => {
      state.newId = payload;
    },
    clearNewId: (state) => {
      state.newId = null;
    },
  },
});

export const {
  clearNewId,
  loadPublications,
  loadMyPublications,
  loadPublicationById,
  setCategories,
  setNewId,
} = publishSlice.actions;
