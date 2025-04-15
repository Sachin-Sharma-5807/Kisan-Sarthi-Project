import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RentalVendor = sequelize.define("RentalVendor", {
  VendorID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FullName: { type: DataTypes.STRING, allowNull: false },
  VendorAdd: { type: DataTypes.JSON, allowNull: false }, // Store address as JSON
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  Password: { type: DataTypes.STRING, allowNull: false },
  VendorContactNumber: { type: DataTypes.STRING, allowNull: false },
  AdminID: { type: DataTypes.INTEGER, allowNull: true }, // Foreign key to Admin
  otp: { type: DataTypes.STRING, allowNull: true }, // OTP field for verification
 // OTP expiry time
});


export default RentalVendor;
