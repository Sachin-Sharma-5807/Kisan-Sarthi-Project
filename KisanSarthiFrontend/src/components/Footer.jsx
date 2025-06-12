import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import "../styles/Footer.css"; // Optional: You can keep this for any custom styles

const Footer = () => {
  return (
    <footer className="bg-success text-white">
      <div className="container py-4">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4">
            <h2 className="h4">Kisan Sarthi</h2>
            <p>Your trusted partner in farming.</p>
          </div>

          {/* Center Section - Links */}
          <div className="col-md-4 text-center">
            <a href="/" className="text-white mx-2">Home</a>
            <a href="/about" className="text-white mx-2">About</a>
            <a href="/services" className="text-white mx-2">Services</a>
            <a href="/contact" className="text-white mx-2">Contact</a>
          </div>

          {/* Right Section - Social Icons */}
          <div className="col-md-4 text-end">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-dark text-center py-3">
        <p className="mb-0">© 2025 Kisan Sarthi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;