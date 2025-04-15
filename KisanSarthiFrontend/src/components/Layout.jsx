// src/components/Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ImageSlider from "./ImageSlider";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ImageSlider />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
