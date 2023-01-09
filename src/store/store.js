import { authSlice, locationsSlice, permissionsSlice } from './slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [' locations', ' permissions'],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  locations: locationsSlice.reducer,
  permissions: permissionsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});
