import React, { useEffect, useState } from "react";
import "../styles/VerifyOtp.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const VerifyOtp = () => {
  const { Email } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the userType from state passed via navigate
  const { userType } = location.state || {};

  // Map the userType to its respective API path
  const userTypeMap = {
    "Showroom Vendor": "vendor/showroom-vendor",
    "Rental Vendor": "vendor/rental-vendor",
    Admin: "admin",
    User: "user",
  };

  const baseApiUrl = "http://localhost:3000";
  const apiPath = userTypeMap[userType];
  const verifyUrl = apiPath ? `${baseApiUrl}/${apiPath}/verify-otp` : null;

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!Email || !userType) {
      toast.error("Invalid Email or User Type", { position: "top-center" });
      navigate("/register");
    }
  }, [Email, userType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (!verifyUrl) {
        throw new Error("Invalid user type for verification");
      }

      const response = await axios.post(verifyUrl, { Email, otp });
      console.log(response.data);
      toast.success("OTP Verified successfully!", { position: "top-center" });

      setTimeout(() => {
        navigate("/SignIn");
      }, 2000);
    } catch (err) {
      console.error(
        "OTP Verification Error:",
        err.response?.data || err.message
      );
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "OTP verification failed!";
      toast.error(errorMsg, { position: "top-center", duration: 2000 });
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="verify-container">
      <Toaster />
      <div className="verify-box">
        <h2>🔐 Verify Your OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={Email} readOnly />
          </div>
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="verify-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
