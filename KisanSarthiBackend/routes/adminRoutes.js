
import express from "express";
import { Register,LogIn,GetAllUsers,GetAllShowroomVendor,GetAllRentalVendors,DeleteShowroomVendor,DeleteRentalVendor} from "../controllers/adminController.js";
import { body } from "express-validator";

const router = express.Router();

//---------------------------------Register-------------------------
router.post( "/register",Register);

//---------------------------------Log-IN-----------------------------


router.post("/log-in",LogIn);

//-------------------------------Get-All-Users-------------------------

router.get("/get-all-users",GetAllUsers);
router.get("/get-all-showroom-vendor",GetAllShowroomVendor);
router.get("/get-all-rental-vendor",GetAllRentalVendors);
router.delete("/delete-showroom-vendor/:id",DeleteShowroomVendor);
router.delete("/delete-rental-vendor/:id",DeleteRentalVendor);


export default router;
