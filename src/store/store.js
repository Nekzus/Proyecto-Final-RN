import {
  authSlice,
  errorloadSlice,
  locationsSlice,
  permissionsSlice,
  publishSlice,
} from './slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [], // TODO: ['auth', 'locations', 'permissions', 'publish']
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  locations: locationsSlice.reducer,
  permissions: permissionsSlice.reducer,
  publish: publishSlice.reducer,
  errors: errorloadSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
