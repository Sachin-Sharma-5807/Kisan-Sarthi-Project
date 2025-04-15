import express from 'express';
import ShowroomVendor from './showroomVendorRoutes.js';
import RentalVendor from './rentalVendorRoutes.js';
const route= express.Router();

route.use("/showroom-vendor",ShowroomVendor);
route.use("/rental-vendor",RentalVendor);

export default route;