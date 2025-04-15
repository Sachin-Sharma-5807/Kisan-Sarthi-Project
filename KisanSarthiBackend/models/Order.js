import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Import your database connection

  const Order = sequelize.define('Order', {
    OrderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    MachineID: { type: DataTypes.INTEGER, allowNull: false },
    PaymentID: { type: DataTypes.INTEGER, allowNull: true }, // Optional
    OrderStatus: { type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered'), defaultValue: "Processing", allowNull: false },
    TotalAmount: { type: DataTypes.FLOAT, allowNull: false },
    VendorID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
  });
  sequelize.sync({alert:true}); 

export default  Order;

