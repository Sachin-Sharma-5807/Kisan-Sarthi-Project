import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Admin = sequelize.define("Admin", {
  adminID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});


export default Admin;
