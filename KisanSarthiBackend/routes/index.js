import express from "express";
import userRoutes from "./userRoutes.js";
import oldMachineRoutes from "./machineRoutes/oldMachineRoutes.js";
import newMachineRoutes from "./machineRoutes/newMachineRoutes.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/new-machines", newMachineRoutes);
router.use("/old-machines", oldMachineRoutes);


export default router;
