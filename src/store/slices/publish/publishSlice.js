import { createSlice } from '@reduxjs/toolkit';

export const publishSlice = createSlice({
  name: 'publish',
  initialState: {
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
  },
});

export const { loadPublications, loadMyPublications, loadPublicationById, setCategories } =
  publishSlice.actions;
