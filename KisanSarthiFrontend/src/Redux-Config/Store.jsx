// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./AdminSlice";
import rentalVendorReducer from "./RentalVendorSlice";
import showroomVendorReducer from "./ShowroomVendorSlice";
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    Admin: adminReducer,
    RentalVendor: rentalVendorReducer,
    ShowroomVendor: showroomVendorReducer,
    User: userReducer,
  },
});

export default store;
