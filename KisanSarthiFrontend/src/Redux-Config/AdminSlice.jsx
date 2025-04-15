// src/redux/AdminSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "Admin",
  initialState: { admin: null },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    unsetAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, unsetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
