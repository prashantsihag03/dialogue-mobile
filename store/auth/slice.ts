import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setLoggedIn } = authSlice.actions;
