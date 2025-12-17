"use client";

import { createClient } from "./client";
import { store } from "@/app/store/store";
import { fetchUser,  clearAuth } from "@/app/features/auth/authSlice";

const supabase = createClient()

export function initSupabaseAuthListener() {
  supabase.auth.onAuthStateChange((event) => {

    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      store.dispatch(fetchUser());
    }

    if (event === "SIGNED_OUT") {
      store.dispatch(clearAuth());
    }
  });
}
