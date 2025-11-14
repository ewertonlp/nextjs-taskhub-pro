"use client"; 

import { Provider } from 'react-redux';
import { store } from "@/app/store/store"; 
import { useEffect } from 'react';
import { fetchUser } from '../features/auth/authSlice';
import { initSupabaseAuthListener } from '@/utils/supabase/authListener';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initSupabaseAuthListener()
    store.dispatch({ type: "auth/fetchUser/pending" });
    store.dispatch(fetchUser())
  }, [])
  
  return <Provider store={store}>{children}</Provider>;
}