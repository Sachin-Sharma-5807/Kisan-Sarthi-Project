// src/redux/RentalVendorSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const rentalVendorSlice = createSlice({
  name: "RentalVendor",
  initialState: { rentalVendor: null },
  reducers: {
    setRentalVendor: (state, action) => {
      state.rentalVendor = action.payload;
    },
    unsetRentalVendor: (state) => {
      state.rentalVendor = null;
    },
  },
});

export const { setRentalVendor, unsetRentalVendor } = rentalVendorSlice.actions;
export default rentalVendorSlice.reducer;
