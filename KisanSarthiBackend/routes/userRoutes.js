import express from "express";
import { body } from "express-validator";
import { Register,LogIn,GetUserById,UpdateUser,DeleteUser,verifyOtp,
        GetAllOldMachines,GetAllNewMachines} from "../controllers/userController.js";
import {PlaceOrder,GetOrders} from '../controllers/orderController.js';
const route=express.Router();

route.post("/register",Register);

  

route.post('/verify-otp',verifyOtp);
route.post("/sign-in",LogIn);

route.get("/get-user/:id",GetUserById);
route.get("/get-user-old-machines",GetAllOldMachines);
route.get("/get-user-new-machines",GetAllNewMachines);
route.put("/update-user/:id",UpdateUser);
route.delete("/delete-user/:id",DeleteUser);

route.post(
    "/place-order",
    body("UserID").isNumeric(),
    body("MachineID").isNumeric(),
    body("TotalAmount").isFloat({ min: 0 }),
    body("PaymentID").optional().isNumeric(),
    body("OrderStatus").optional().isIn(["Processing", "Shipped", "Delivered"]),
    PlaceOrder
);


route.get("/get-orders/:userId", GetOrders);
 export default  route;

