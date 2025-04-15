
// import sequelize from "sequelize.js";
// import { DataTypes } from "sequelize";

// module.exports = (sequelize, DataTypes) => {
//   const Notification = sequelize.define('Notification', {
//     NotificationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     UserID: { type: DataTypes.INTEGER, allowNull: false },
//     Message: { type: DataTypes.TEXT, allowNull: false },
//     Type: { type: DataTypes.ENUM('Order', 'Payment', 'Rental', 'Admin'), allowNull: false },
//     Status: { type: DataTypes.ENUM('Read', 'Unread'), allowNull: false },
//     CreatedAt: { type: DataTypes.DATE, allowNull: false },
//     AdminID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
//   });
//   return Notification;
// };

import { DataTypes } from 'sequelize'; // Import only DataTypes

export default (sequelize) => {
  const Notification = sequelize.define('Notification', {
    NotificationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    Message: { type: DataTypes.TEXT, allowNull: false },
    Type: { type: DataTypes.ENUM('Order', 'Payment', 'Rental', 'Admin'), allowNull: false },
    Status: { type: DataTypes.ENUM('Read', 'Unread'), allowNull: false },
    CreatedAt: { type: DataTypes.DATE, allowNull: false },
    AdminID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
  });

  return Notification;
};
