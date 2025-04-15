import express from 'express';
import { body } from 'express-validator';
import { Register,LogIn,GetProfile,UpdateProfile,DeleteProfile,VerifyOtp} from '../controllers/rentalVendorController.js';
import {AddOldMachine,GetOldMachine,UpdateOldMachine,DeleteOldMachine,GetAllOldMachine} from '../controllers/rentalMachineController.js'
import uploadOldMachine from "../middleware/oldMachineUpload.js";

const route=express.Router();


const router = express.Router();

//---------------------------------Register-------------------------
route.post("/register",Register);
route.post("/verify-otp", VerifyOtp);


//---------------------------------Log-IN-----------------------------


route.post("/log-in",LogIn);

//--------------------------Get Profile-----------------------------


route.get("/get-profile/:id",GetProfile);

//---------------------------------Update-Profile ------------------------------

route.put("/update-profile/:id",UpdateProfile);
route.delete("/delete-profile/:id",DeleteProfile);

//---------------------------------Rent-Machine ------------------------------

route.post(
  "/add-old-machine",
  uploadOldMachine.array("MachineImages", 5), // Up to 5 images
  [
    body("MachineName", "Machine name is required").notEmpty(),
    body("MachineType", "Machine type is required").notEmpty(),
    body("CompanyName", "Company name is required").notEmpty(),
    body("RentalPricePerDay", "Rental price per day must be a number").trim().isNumeric(),
    body("MachineDescription", "Machine description is required").notEmpty(),
    body("AvailabilityStatus", "Availability status is required").notEmpty().isIn(["Available", "Not Available"]),
  ],
  AddOldMachine
);


//-------------------------------------------Get-Machine--------------------------------------

route.get("/get-old-machine/:id",GetOldMachine);

//-------------------------------------------Update-Old-Machine--------------------------------

route.put("/update-old-machine/:id",UpdateOldMachine);

//-------------------------------------------Delete-Old-Machine-------------------------------

route.delete("/delete-old-machine",DeleteOldMachine);

//---------------------------------------------Get-All-Old-Machines---------------------------

route.get("/get-all-old-machine",GetAllOldMachine);


 export default route;