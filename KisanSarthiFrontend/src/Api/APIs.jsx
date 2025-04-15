const API_SHOWROOM__VENDOR = {
  SHOWROOM__VENDOR_REGISTER:
    "http://localhost:3000/vendor/showroom-vendor/register",
  SHOWROOM__VENDOR_LOGIN: "http://localhost:3000/vendor/showroom-vendor/log-in",
  SHOWROOM__VENDOR_GET_PROFILE:
    "http://localhost:3000/vendor/showroom-vendor/get-profile/:id",
  SHOWROOM__VENDOR_UPDATE_PROFILE:
    "http://localhost:3000/vendor/showroom-vendor/update-profile/:id",
  SHOWROOM__VENDOR_DELETE_PROFILE:
    "http://localhost:3000/vendor/showroom-vendor/delete-profile/:id",

  SHOWROOM__VENDER_ADD_MACHINES:
    "http://localhost:3000/vendor/showroom-vendor/add-new-machine",
  SHOWROOM__VENDER_GET_MACHINES:
    "http://localhost:3000/vendor/showroom-vendor/get-new-machine/:id",
  SHOWROOM__VENDER_UPDATE_MACHINES:
    "http://localhost:3000/vendor/showroom-vendor/  /:id",
  SHOWROOM__VENDER_DELETE_MACHINES:
    "http://localhost:3000/vendor/showroom-vendor/delete-new-machine/:id",
  SHOWROOM__VENDER_GET_ALL_MACHINES:
    "http://localhost:3000/vendor/showroom-vendor/get-all-new-machine",
};

export default API_SHOWROOM__VENDOR;

export const otpApi = {
  VERIFY_OTP: "http://localhost:3000/user/verify-otp",
};
