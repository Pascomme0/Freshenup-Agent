// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import serviceReducer from './serviceSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        service: serviceReducer,
    },
});