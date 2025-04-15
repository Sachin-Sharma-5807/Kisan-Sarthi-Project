// import sequelize from "sequelize.js";
// import { DataTypes } from "sequelize";
// module.exports = (sequelize, DataTypes) => {
//     const Cart = sequelize.define('Cart', {
//       CartID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//       UserID: { type: DataTypes.INTEGER, allowNull: false },
//       MachineID: { type: DataTypes.INTEGER, allowNull: false },
//       Quantity: { type: DataTypes.INTEGER, allowNull: false },
//       AddedDate: { type: DataTypes.DATE, allowNull: false }
//     });

//       return Cart;
//   };

import { DataTypes } from "sequelize";  // Correct import for Sequelize and DataTypes

export default (sequelize) => {
  const Cart = sequelize.define('Cart', {
    CartID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    MachineID: { type: DataTypes.INTEGER, allowNull: false },
    Quantity: { type: DataTypes.INTEGER, allowNull: false },
    AddedDate: { type: DataTypes.DATE, allowNull: false }
  });

  return Cart;
};
