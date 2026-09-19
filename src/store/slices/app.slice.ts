import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ThemeMode = "light" | "dark"
type Direction = "rtl" | "ltr"

type AppState = {
  direction: Direction
  language: "ar" | "en"
  themeMode: ThemeMode
}

const initialState: AppState = {
  direction: "rtl",
  language: "ar",
  themeMode: "light",
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload
      state.language = action.payload === "rtl" ? "ar" : "en"
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
    },
  },
})

export const { setDirection, setThemeMode } = appSlice.actions
export const appReducer = appSlice.reducer
