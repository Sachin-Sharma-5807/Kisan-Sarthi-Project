import React from "react";
import { Outlet } from "react-router-dom";
import RentalVendorHeader from "./RentalVendorHeader";
import Footer from "../components/Footer";

const VenderLayOut = () => {
  return (
    <div>
      <RentalVendorHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default VenderLayOut;
