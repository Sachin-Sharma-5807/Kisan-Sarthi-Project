import express from "express";
import { body } from "express-validator";
import {
  Register,
  LogIn,
  GetProfile,
  UpdateProfile,
  DeleteProfile,
  VerifyOtp,
} from "../../controllers/showroomVendorController.js";

import {
  AddNewMachine,
  GetNewMachine,
  UpdateNewMachine,
  DeleteNewMachine,
  GetAllNewMachine,
} from "../../controllers/sellNewMachineController.js";

import uploadNewMachine from "../../middleware/newMachineUpload.js";

const router = express.Router();

// Vendor Registration & OTP Verification
router.post("/register", Register);
router.post("/verify-otp", VerifyOtp);

// Vendor Log-In
router.post("/log-in", LogIn);

// Profile Routes
router.get("/get-profile/:id", GetProfile);
router.put("/update-profile/:id", UpdateProfile);
router.delete("/delete-profile/:id", DeleteProfile);

// Machine Routes
router.post(
  "/add-new-machine",
  uploadNewMachine.array("MachineImages", 5),
  [
    body("MachineName").notEmpty().withMessage("Machine name is required"),
    body("MachineType").notEmpty().withMessage("Machine type is required"),
    body("CompanyName").notEmpty().withMessage("Company name is required"),
    body("MachinePrice")
      .notEmpty()
      .withMessage("Machine price is required")
      .isNumeric()
      .withMessage("Machine price must be a number"),
    body("MachineDescription").notEmpty().withMessage("Description is required"),
  ],
  AddNewMachine
);

router.get("/get-new-machine/:id", GetNewMachine);
router.put(
  "/update-new-machine/:id",
  uploadNewMachine.array("MachineImages", 5),
  UpdateNewMachine
);
router.delete("/delete-new-machine/:id", DeleteNewMachine);
router.get("/get-all-new-machine", GetAllNewMachine);

export default router;
