
 import sequelize from "sequelize.js";
 import { DataTypes } from "sequelize";



  const ContactRequest = sequelize.define('ContactRequest', {
    RequestID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    RentalMachineID: { type: DataTypes.INTEGER, allowNull: false },
    UserName: { type: DataTypes.STRING, allowNull: false },
    UserPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    UserEmail: { type: DataTypes.STRING, allowNull: false },
    RequestDate: { type: DataTypes.DATE, allowNull: false },
    RequestStatus: { type: DataTypes.ENUM('Pending', 'Contacted', 'Resolved'), allowNull: false },
    AdminID: { type: DataTypes.INTEGER, allowNull: true } // Foreign key to Admin
  });

export default ContactRequest;

