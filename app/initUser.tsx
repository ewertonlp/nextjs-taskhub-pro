'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchUser } from './features/auth/authSlice';

export default function InitUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchUser());
    }
  }, [initialized, dispatch]);

  return null; 
}
