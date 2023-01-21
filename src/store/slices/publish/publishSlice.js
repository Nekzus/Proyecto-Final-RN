import { createSlice } from '@reduxjs/toolkit';

export const publishSlice = createSlice({
  name: 'publish',
  initialState: {
    categories: null,
    publications: [],
    publication: null,
  },
  reducers: {
    loadPublications: (state, { payload }) => {
      state.publications = payload;
    },
    loadPublicationById: (state, { payload }) => {
      state.publication = payload;
    },
    updatePublication: (state, { payload }) => {
      state.publications = state.publications.map((publication) => {
        if (publication._id === payload._id) {
          return payload;
        }
        return publication;
      });
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const { loadPublications, loadPublicationById, setCategories, updatePublication } =
  publishSlice.actions;
