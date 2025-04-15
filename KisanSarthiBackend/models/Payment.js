
// import sequelize from "sequelize.js";
// import { DataTypes } from "sequelize";
// module.exports = (sequelize, DataTypes) => {
//   const Payment = sequelize.define('Payment', {
//     PaymentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     UserID: { type: DataTypes.INTEGER, allowNull: false },
//     OrderID: { type: DataTypes.INTEGER, allowNull: false },
//     Amount: { type: DataTypes.FLOAT, allowNull: false },
//     PaymentStatus: { type: DataTypes.ENUM('Success', 'Failed', 'Pending'), allowNull: false },
//     PaymentDate: { type: DataTypes.DATE, allowNull: false },
//     TransactionID: { type: DataTypes.STRING, allowNull: false, unique: true },
//     AdminID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
//   });

//   return Payment;
// };

import { DataTypes } from 'sequelize'; // Importing only DataTypes

export default (sequelize) => {
  const Payment = sequelize.define('Payment', {
    PaymentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    OrderID: { type: DataTypes.INTEGER, allowNull: false },
    Amount: { type: DataTypes.FLOAT, allowNull: false },
    PaymentStatus: { type: DataTypes.ENUM('Success', 'Failed', 'Pending'), allowNull: false },
    PaymentDate: { type: DataTypes.DATE, allowNull: false },
    TransactionID: { type: DataTypes.STRING, allowNull: false, unique: true },
    AdminID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
  });

  return Payment;
};
