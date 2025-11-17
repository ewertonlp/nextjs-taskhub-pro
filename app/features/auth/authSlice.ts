"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "./authService";

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
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
  await AuthService.logout();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
