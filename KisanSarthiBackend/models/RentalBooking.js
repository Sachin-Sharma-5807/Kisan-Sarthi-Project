

import { DataTypes } from 'sequelize'; // Importing only DataTypes
import sequelize from "../config/db.js";


const RentalBooking = sequelize.define('RentalBooking', {
  BookingID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER, allowNull: false },
  RentalMachineID: { type: DataTypes.INTEGER, allowNull: false },
  RentalDuration: { type: DataTypes.INTEGER, allowNull: false },
  TotalRentalCost: { type: DataTypes.FLOAT, allowNull: false },
  BookingStatus: { type: DataTypes.ENUM('Pending', 'Confirmed', 'Completed'),defaultValue:"Pending", allowNull: false },
  VendorID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
  });

export default RentalBooking;

