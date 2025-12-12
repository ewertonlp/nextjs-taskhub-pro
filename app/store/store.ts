'use client'; 

import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/auth/authSlice';
import themeReducer  from '../features/theme/themeSlice';
import taskReducer from '@/app/auth/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
