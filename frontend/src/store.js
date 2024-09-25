import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Import the slice reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), // Import the middleware from the slice
  devTools: process.env.NODE_ENV === 'development', // Enable Redux DevTools in development mode
});

export default store;