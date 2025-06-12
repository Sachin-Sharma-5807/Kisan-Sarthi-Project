import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUp.css";

function Signup() {
  const nameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const addressInput = useRef();
  const userTypeInput = useRef();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prev) => ({
      ...prev,
      PhoneNumber: validatePhoneNumber(value)
        ? ""
        : "Phone number must be 10 digits",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      Password:
        value.length >= 6 ? "" : "Password must be at least 6 characters",
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrors({});

    const userData = {
      FullName: nameInput.current.value.trim(),
      Email: emailInput.current.value.trim(),
      PhoneNumber: phone.trim(), // ✅ Corrected
      Password: password.trim(),
      Address: addressInput.current.value.trim(), // ✅ Corrected
      UserType: userTypeInput.current.value,
    };

    const newErrors = {};
    if (!userData.FullName) newErrors.FullName = "Name is required";
    if (!userData.Email) newErrors.Email = "Email is required";
    if (!validateEmail(userData.Email))
      newErrors.Email = "Invalid email format";
    if (!validatePhoneNumber(userData.PhoneNumber))
      newErrors.PhoneNumber = "Phone number must be 10 digits";
    if (!userData.Password) newErrors.Password = "Password is required";
    if (userData.Password.length < 6)
      newErrors.Password = "Password must be at least 6 characters";
    if (!userData.Address) newErrors.Address = "Address is required";
    if (!userData.UserType) newErrors.UserType = "User type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors and try again.", { theme: "dark" });
      return;
    }

    try {
      const apiUrl = "http://localhost:8000/api/user/register";
      await axios.post(apiUrl, userData);

      toast.success("Please fill the OTP!", { theme: "colored" });

      setTimeout(() => {
        navigate(`/VerifyOtp/${userData.Email}`, {
          state: { userType: userData.UserType },
        });
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed!", {
        theme: "dark",
      });
    }
  };

  return (
    <div className="signup-background d-flex justify-content-center align-items-center">
      <div
        className="form-container shadow-lg"
        style={{
          width: "90%",
          maxWidth: "500px",
          backgroundColor: "rgba(129, 203, 249, 0.8)",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <div className="text-center mb-4">
          <h4 className="mb-0" style={{ fontWeight: "bold", color: "green" }}>
            Signup
          </h4>
        </div>

        <form className="p-3" onSubmit={handleSignup}>
          <div className="form-group mb-3">
            <input
              ref={nameInput}
              type="text"
              placeholder="Enter your name"
              className="form-control rounded"
            />
            {errors.FullName && (
              <small className="text-danger font-weight-bold">
                {errors.FullName}
              </small>
            )}
          </div>

          <div className="form-group mb-3">
            <input
              ref={emailInput}
              type="email"
              placeholder="Enter your email"
              className="form-control rounded"
            />
            {errors.Email && (
              <small className="text-danger font-weight-bold">
                {errors.Email}
              </small>
            )}
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Enter your phone number"
              className="form-control rounded"
              value={phone}
              onChange={handlePhoneChange}
            />
            {errors.PhoneNumber && (
              <small className="text-danger font-weight-bold">
                {errors.PhoneNumber}
              </small>
            )}
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control rounded"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.Password && (
              <small className="text-danger font-weight-bold">
                {errors.Password}
              </small>
            )}
          </div>

          <div className="form-group mb-3">
            <input
              ref={addressInput}
              type="text"
              placeholder="Enter your address"
              className="form-control rounded"
            />
            {errors.Address && (
              <small className="text-danger font-weight-bold">
                {errors.Address}
              </small>
            )}
          </div>

          <div className="form-group mb-3">
            <select ref={userTypeInput} className="form-control rounded">
              <option value="">Select User Type</option>
              <option value="Showroom Vendor">Showroom Vendor</option>
              <option value="Rental Vendor">Rental Vendor</option>
              <option value="User">User</option>
            </select>
            {errors.UserType && (
              <small className="text-danger font-weight-bold">
                {errors.UserType}
              </small>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </div>

          <div className="text-center mt-3">
            <Link to="/verifyotp">
              <label className="text-black" style={{ cursor: "pointer" }}>
                Already have an account?
              </label>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
