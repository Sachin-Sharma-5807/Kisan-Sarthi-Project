import React from "react";
import { Outlet } from "react-router-dom";
import ShowroomVendorHeader from "./ShowroomVehnderHeader";
import Footer from "../components/Footer";

const VenderLayOut = () => {
  return (
    <div>
      <ShowroomVendorHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default VenderLayOut;
