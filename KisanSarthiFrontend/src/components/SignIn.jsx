// src/components/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAdmin } from "../Redux-Config/AdminSlice";
import { setUser } from "../Redux-Config/UserSlice";
import { setShowroomVendor } from "../Redux-Config/ShowroomVendorSlice";
import { setRentalVendor } from "../Redux-Config/RentalVendorSlice";
import "../styles/SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Role-based API endpoints & redirection paths
  const roleConfig = {
    admin: {
      endpoint: "http://localhost:3000/admin/log-in",
      redirect: "/admin",
    },
    user: {
      endpoint: "http://localhost:3000/user/sign-in",
      redirect: "/",
    },
    "showroom-vendor": {
      endpoint: "http://localhost:3000/vendor/showroom-vendor/log-in",
      redirect: "/showroom-vender",
    },
    "rental-vendor": {
      endpoint: "http://localhost:3000/vendor/rental-vendor/log-in",
      redirect: "/rental-vendor",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };

    try {
      console.log(`🔹 Data Sent (${role}):`, userData);
      const response = await axios.post(roleConfig[role].endpoint, userData);
      console.log("Response:", response);

      // Dispatch the correct action based on the role
      if (role === "admin") {
        dispatch(setAdmin(response.data.user));
      } else if (role === "user") {
        dispatch(setUser(response.data.user));
      } else if (role === "showroom-vendor") {
        dispatch(setShowroomVendor(response.data.user));
      } else if (role === "rental-vendor") {
        dispatch(setRentalVendor(response.data.user));
      }

      toast.success("Sign in successful!");
      navigate(roleConfig[role].redirect);
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed! Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="form-container">
        <div className="text-center mb-4">
          <h4 className="mb-0" style={{ fontWeight: "bold", color: "green" }}>
            Login
          </h4>
        </div>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Enter your password"
              className="form-control"
              required
            />
          </div>

          {/* Role Selection Dropdown */}
          <div className="form-group mb-3">
            <label>Select Your Role:</label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="form-control"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="showroom-vendor">Showroom Vendor</option>
              <option value="rental-vendor">Rental Vendor</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <button
              disabled={!email || !password}
              type="submit"
              className="btn btn-success w-100"
              style={{ fontWeight: "bold" }}
            >
              Login
            </button>
          </div>

          <div className="form-group text-center">
            <Link to="/signup" className="text-dark bold">
              Create new account?
            </Link>
            <br />
            <Link to="/forgot-password" className="text-danger">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
