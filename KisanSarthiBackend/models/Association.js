
const defineAssociations = (models) => {
  // Admin and Other Entities
  models.Admin.hasMany(models.User);
  models.Admin.hasMany(models.ShowroomVendor);
  models.Admin.hasMany(models.RentalVendor);
  models.Admin.hasMany(models.Order);
  models.Admin.hasMany(models.RentalBooking);
  models.Admin.hasMany(models.Payment);
  models.Admin.hasMany(models.Notification);
  models.Admin.hasMany(models.ContactRequest);

  models.User.belongsTo(models.Admin);
  models.User.hasOne(models.ShowroomVendor);
  models.User.hasOne(models.RentalVendor);
  models.User.hasMany(models.Order);
  models.User.hasMany(models.RentalBooking);
  models.User.hasMany(models.ContactRequest);
  models.User.hasMany(models.Cart);
  models.User.hasMany(models.Notification);
  models.User.hasMany(models.Payment);

  // Vendor and Machine Associations
  models.ShowroomVendor.belongsTo(models.User);
  models.ShowroomVendor.hasMany(models.SellMachine);

  models.RentalVendor.belongsTo(models.User);
  models.RentalVendor.hasMany(models.RentalMachine);

  // Machine and Order Associations
  models.SellMachine.belongsTo(models.ShowroomVendor);
  models.SellMachine.hasMany(models.Order);
  models.SellMachine.hasMany(models.Cart);

  models.RentalMachine.belongsTo(models.RentalVendor);
  models.RentalMachine.hasMany(models.RentalBooking);
  models.RentalMachine.hasMany(models.ContactRequest);

  // Order, Payment, and Booking
  models.Order.belongsTo(models.User);
  models.Order.belongsTo(models.SellMachine); 
  models.Order.belongsTo(models.Payment);
  models.Order.belongsTo(models.ShowroomVendor);

  models.Payment.belongsTo(models.User);
  models.Payment.belongsTo(models.Order);

  models.RentalBooking.belongsTo(models.User);
  models.RentalBooking.belongsTo(models.RentalMachine);

  // Misc Associations
  models.ContactRequest.belongsTo(models.User);
  models.ContactRequest.belongsTo(models.RentalMachine);

  models.Notification.belongsTo(models.User);

  models.Cart.belongsTo(models.User);
  models.Cart.belongsTo(models.SellMachine);
};

export default defineAssociations;
