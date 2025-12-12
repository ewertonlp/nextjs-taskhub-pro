import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: 'light' | 'dark';
}

const initialState: ThemeState = {
  value: 'light',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.value);
      }
    },
    setTheme: (state, action) => {
      state.value = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.value);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
