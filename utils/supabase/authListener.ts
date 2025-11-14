"use client";

import { createClient } from "./client";
import { store } from "@/app/store/store";
import { fetchUser, logout } from "@/app/features/auth/authSlice";

const supabase = createClient()

export function initSupabaseAuthListener() {
  supabase.auth.onAuthStateChange((event, session) => {

    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      store.dispatch(fetchUser());
    }

    if (event === "SIGNED_OUT") {
      store.dispatch(logout());
    }
  });
}
