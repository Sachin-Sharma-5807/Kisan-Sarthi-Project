// models/User.js

import { DataTypes } from "sequelize";
import  sequelize  from "../config/db.js";

const User = sequelize.define("User", {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  UserType: {
    type: DataTypes.ENUM("User", "Showroom Vendor", "Rental Vendor", "Admin"),
    defaultValue: "User",
    allowNull: false,
  },
  AdminID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ResetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

  // sequelize
  //   .sync({ alter: true })
  //   .then(() => console.log(" User model created or updated"))
  //   .catch((err) => console.error(" Model sync error:", err));

export default User;
