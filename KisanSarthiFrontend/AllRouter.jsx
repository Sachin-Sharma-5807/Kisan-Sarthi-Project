import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./src/components/SignIn";
import SignUp from "./src/components/SignUp";
import VenderLayOut from "./src/showroomVendor/VenderLayOut";
import HomePageShowroomVender from "./src/showroomVendor/HomePageShowroomVender";
import ShowRoomVendorAddMachines from "./src/showroomVendor/ShowRoomVendorAddMachines";
import ShowRoomVendorProfile from "./src/showroomVendor/ShowRoomVendorProfile";
import Layout from "./src/components/Layout";
import Home from "./src/components/HomePage";
import VerifyOtp from "./src/components/VerifyOtp";
import VendorLayout from "./src/rentalVendor/VenderLayOut";
import AdminLayout from "./src/admin/AdminLayout";
import HomePageAdmin from "./src/admin/HomePageAdmin";
import ShowroomVendorViewAllMachine from "./src/showroomVendor/ShowroomVendorViewAllMachine";
import ShowRoomVendorUpdateMachines from "./src/showroomVendor/ShowRoomVendorUpdateMachines";
import RentalVendorAddMachine from "./src/rentalVendor/RentalVendorAddMachine";
import RentalVendorViewAllMachine from "./src/rentalVendor/RentalVendorViewAllMachine";
import RentalroomVendorUpdateMachine from "./src/rentalVendor/RentalroomVendorUpdateMachine";
import UserNewMachines from "./src/components/UserNewMAchines";

const AllRouter = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="machines/new" element={<UserNewMachines />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyotp/:Email" element={<VerifyOtp />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HomePageAdmin />} />
        </Route>

        {/* Showroom Vendor Routes */}
        <Route path="/showroom-vender" element={<VenderLayOut />}>
          <Route index element={<HomePageShowroomVender />} />
          <Route path="add-machine" element={<ShowRoomVendorAddMachines />} />
          <Route
            path="view-machines"
            element={<ShowroomVendorViewAllMachine />}
          />
          <Route
            path="update-machine/:id"
            element={<ShowRoomVendorUpdateMachines />}
          />
          <Route path="showroom-profile" element={<ShowRoomVendorProfile />} />
        </Route>

        <Route path="/rental-vendor" element={<VendorLayout />}>
          <Route
            path="/rental-vendor/add-machine"
            element={<RentalVendorAddMachine />}
          />
          <Route
            path="view-machines"
            element={<RentalVendorViewAllMachine />}
          />
          <Route
            path="update-machine/:id"
            element={<RentalroomVendorUpdateMachine />}
          />
        </Route>

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </>
  );
};

export default AllRouter;
