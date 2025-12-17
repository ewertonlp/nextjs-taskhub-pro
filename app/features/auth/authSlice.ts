"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "./authService";
import { User } from "@supabase/supabase-js"

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    return await AuthService.login(email, password);
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
    return await AuthService.signup(email, password);
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  return await AuthService.getCurrentUser();
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await AuthService.logout();
    return null;
  } catch (error) {
    console.error(" AuthService.logout() ERRO:", error);
    throw error; 
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro no login";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload || null;
        state.initialized = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.initialized = true;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false; 
        state.user = null;
         state.initialized = true;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false; 
        state.error = "Logout failed";
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
