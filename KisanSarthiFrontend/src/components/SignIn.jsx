// // src/components/SignIn.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setAdmin } from "../Redux-Config/AdminSlice";
// import { setUser } from "../Redux-Config/UserSlice";
// import { setShowroomVendor } from "../Redux-Config/ShowroomVendorSlice";
// import { setRentalVendor } from "../Redux-Config/RentalVendorSlice";
// import "../styles/SignIn.css";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Role-based config
//   const roleConfig = {
//     admin: {
//       endpoint: "http://localhost:8000/api/admin/log-in",
//       redirect: "/admin",
//       action: setAdmin,
//     },
//     user: {
//       endpoint: "http://localhost:8000/api/user/sign-in",
//       redirect: "/",
//       action: setUser,
//     },
//     "showroom-vendor": {
//       endpoint: "http://localhost:8000/api/user/sign-in",
//       redirect: "/showroom-vender/add-machine",
//       action: setShowroomVendor,
//     },
//     "rental-vendor": {
//       endpoint: "http://localhost:8000/api/user/sign-in",
//       redirect: "/rental-vendor",
//       action: setRentalVendor,
//     },
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userData = { email, password };

//     try {
//       const config = roleConfig[role];
//       const response = await axios.post(config.endpoint, userData);

//       dispatch(config.action(response.data.user));

//       toast.success("Sign in successful!");
//       navigate(config.redirect);
//     } catch (err) {
//       console.error("Login Error:", err);
//       const errorMessage =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         "Login failed! Please try again.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="sign-in-container">
//       <div className="form-container">
//         <div className="text-center mb-4">
//           <h4 className="mb-0" style={{ fontWeight: "bold", color: "green" }}>
//             Login
//           </h4>
//         </div>
//         <form className="p-4" onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Enter your email"
//               className="form-control"
//               required
//             />
//           </div>

//           <div className="form-group mb-3">
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Enter your password"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Role Selection Dropdown */}
//           <div className="form-group mb-3">
//             <label>Select Your Role:</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="form-control"
//               required
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="showroom-vendor">Showroom Vendor</option>
//               <option value="rental-vendor">Rental Vendor</option>
//             </select>
//           </div>

//           <div className="form-group mb-3">
//             <button
//               disabled={!email || !password}
//               type="submit"
//               className="btn btn-success w-100"
//               style={{ fontWeight: "bold" }}
//             >
//               Login
//             </button>
//           </div>

//           <div className="form-group text-center">
//             <Link to="/signup" className="text-dark bold">
//               Create new account?
//             </Link>
//             <br />
//             <Link to="/forgot-password" className="text-danger">
//               Forgot password?
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

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

  const roleConfig = {
    admin: {
      endpoint: "http://localhost:8000/api/admin/log-in",
      redirect: "/admin",
      action: setAdmin,
    },
    user: {
      endpoint: "http://localhost:8000/api/user/sign-in",
      redirect: "/",
      action: setUser,
    },
    "showroom-vendor": {
      endpoint: "http://localhost:8000/api/user/sign-in",
      redirect: "/showroom-vender/add-machine",
      action: setShowroomVendor,
    },
    "rental-vendor": {
      endpoint: "http://localhost:8000/api/user/sign-in",
      redirect: "/rental-vendor",
      action: setRentalVendor,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const { endpoint, action, redirect } = roleConfig[role];
      const resp = await axios.post(endpoint, userData);

      // backend returns: { user: { UserID, FullName, Email, ... } }
      const { user } = resp.data;
      console.log("Login response user:", user);

      if (!user?.UserID) {
        throw new Error("Login succeeded but no UserID returned");
      }

      // Normalize UserID → id
      const normalized = {
        id: user.UserID,
        FullName: user.FullName,
        Email: user.Email,
        UserType: user.UserType,
      };

      dispatch(action(normalized));
      toast.success("Sign in successful!");
      navigate(redirect);
    } catch (err) {
      console.error("Login Error:", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Login failed!";
      toast.error(msg);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="form-container">
        <h4 className="text-center mb-4" style={{ color: "green" }}>
          Login
        </h4>
        <form className="p-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Select Your Role:</label>
          <select
            className="form-control mb-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="showroom-vendor">Showroom Vendor</option>
            <option value="rental-vendor">Rental Vendor</option>
          </select>

          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={!email || !password}
          >
            Login
          </button>

          <div className="text-center">
            <Link to="/signup">Create new account?</Link>
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
