import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SellMachine = sequelize.define("SellMachine", {
  MachineID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  VendorID: { type: DataTypes.INTEGER, allowNull: false },
  MachineName: { type: DataTypes.STRING, allowNull: false },
  MachineType: { type: DataTypes.STRING, allowNull: false },
  CompanyName: { type: DataTypes.STRING, allowNull: false },
  MachinePrice: { type: DataTypes.FLOAT, allowNull: false },
  MachineDescription: { type: DataTypes.TEXT, allowNull: false },
  MachineImage: { type: DataTypes.STRING, allowNull: false }, // We'll store one image URL or first image
  MachineImages: { type: DataTypes.JSON, allowNull: false }, // Store multiple image paths as JSON
});

export default SellMachine;
