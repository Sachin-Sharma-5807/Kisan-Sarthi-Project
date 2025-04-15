import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import "./RentalVendorHeader.css";

const RentalVendorHeader = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm fixed-top agri-navbar py-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo1.jpeg" alt="Agri Logo" className="agri-logo" />
          <span className="ms-2 fw-bold fs-5">🚜 Kisan-Sarthi</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item px-3">
              <Link
                className={`nav-link fw-semibold text-white ${
                  location.pathname === "/rental-vendor/add-machine"
                    ? "active"
                    : ""
                }`}
                to="/rental-vendor/add-machine"
              >
                Add Machine
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link
                className={`nav-link fw-semibold text-white ${
                  location.pathname === "/rental-vendor/view-machines"
                    ? "active"
                    : ""
                }`}
                to="/rental-vendor/view-machines"
              >
                View Machines
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/" className="btn btn-outline-light fw-semibold">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default RentalVendorHeader;
