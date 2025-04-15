import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-success text-white sticky-top shadow">
      <div className="d-flex justify-content-between align-items-center py-3">
        <Link
          to="/"
          className="h4 text-warning text-decoration-none d-flex align-items-center"
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "inline-block",
            }}
          >
            <img
              src="logo1.jpeg"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span className="fw-bold ms-2">🌾 Kisan Sarthi</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div
          className="d-lg-none me-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </div>

        {/* Desktop Navigation */}
        <nav className="d-none d-lg-block">
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/machines/old" className="nav-link text-white">
                Old Machines
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/machines/new" className="nav-link text-white">
                New Machines
              </Link>
            </li>

            <li className="nav-item bold">
              <Link to="/user/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
            <li className="nav-item bold">
              <Link to="/user/notifications" className="nav-link text-white">
                <i className="bi bi-bell"></i>
              </Link>
            </li>
            <li className="nav-item bold">
              <Link
                to="/user/cart"
                className="nav-link text-white bold cartstyle bold"
              >
                <i className="bi bi-cart"></i>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login and Sign-Up Buttons */}
        <div className="d-none d-lg-block me-5">
          <Link to="/signin" className="btn btn-warning ms-1">
            Sign in
          </Link>
          <Link to="/signup" className="btn btn-warning ms-1">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`d-lg-none ${isMenuOpen ? "d-block" : "d-none"}`}>
        <nav className="bg-success position-absolute top-100 start-0 end-0 p-3 rounded shadow">
          <ul className="list-unstyled">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/machines/old" className="text-white">
                Old Machines
              </Link>
            </li>
            <li>
              <Link to="/machines/new" className="text-white">
                New Machines
              </Link>
            </li>

            <li>
              <Link to="/user/contact" className="text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/user/notifications" className="text-white">
                Notifications
              </Link>
            </li>
            <li>
              <Link to="/user/cart" className="text-white">
                Cart
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/signin" className="btn btn-warning w-100">
                Login
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/signup" className="btn btn-warning w-100">
                Sign-Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
