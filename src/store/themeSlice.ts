import { createSlice } from "@reduxjs/toolkit";
import systemThemeUtil from "../utils/systemThemeUtil";

export interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value: `${systemThemeUtil()}`,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
