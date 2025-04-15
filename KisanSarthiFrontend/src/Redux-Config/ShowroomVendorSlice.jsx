// src/redux/ShowroomVendorSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const showroomVendorSlice = createSlice({
  name: "ShowroomVendor",
  initialState: { showroomVendor: null },
  reducers: {
    setShowroomVendor: (state, action) => {
      state.showroomVendor = action.payload;
    },
    unsetShowroomVendor: (state) => {
      state.showroomVendor = null;
    },
  },
});

export const { setShowroomVendor, unsetShowroomVendor } =
  showroomVendorSlice.actions;
export default showroomVendorSlice.reducer;
