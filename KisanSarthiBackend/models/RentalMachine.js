import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";// Import your database connection

const RentalMachine = sequelize.define("RentalMachine", {
  RentalMachineID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  VendorID: { type: DataTypes.INTEGER, allowNull: false },
  MachineName: { type: DataTypes.STRING, allowNull: false },
  MachineType: { type: DataTypes.STRING, allowNull: false },
  CompanyName: { type: DataTypes.STRING, allowNull: false },
  RentalPricePerDay: { type: DataTypes.FLOAT, allowNull: false },
  MachineDescription: { type: DataTypes.TEXT, allowNull: false },
  MachineImages: { type: DataTypes.JSON, allowNull: false }, // Store multiple image paths in JSON
  AvailabilityStatus: { type: DataTypes.ENUM("Available", "Not Available"), allowNull: false },
});

export default RentalMachine;
