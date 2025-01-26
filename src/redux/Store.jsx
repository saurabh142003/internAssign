import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { combineReducers } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import userReducer from './userSlice.jsx';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage mechanism (localStorage in this case)
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

// Persistor for redux-persist
export const persistor = persistStore(store);

export default store;

