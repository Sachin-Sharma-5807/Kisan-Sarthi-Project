import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./ShowroomVendorHader.css";

const ShowroomVendorHeader = () => {
  const navigate = useNavigate();
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
                  location.pathname === "/showroom-vender/add-machine"
                    ? "active"
                    : ""
                }`}
                to="/showroom-vender/add-machine"
              >
                Add Machine
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link
                className={`nav-link fw-semibold text-white ${
                  location.pathname === "/showroom-vender/view-machines"
                    ? "active"
                    : ""
                }`}
                to="/showroom-vender/view-machines"
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

export default ShowroomVendorHeader;
