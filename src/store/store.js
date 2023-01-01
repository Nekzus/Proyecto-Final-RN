import { locationsSlice, permissionsSlice } from "./slices";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    permissions: permissionsSlice.reducer,
    locations: locationsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
