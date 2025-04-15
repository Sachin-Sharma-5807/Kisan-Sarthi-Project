import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const { user } = useSelector((store) => store.User);
  const { showroomVendor } = useSelector((store) => store.ShowroomVendor);
  console.log(showroomVendor);

  const { rentalVendor } = useSelector((store) => store.RentalVendor);
  const { admin } = useSelector((store) => store.Admin);

  let isAllowed = false;

  switch (role) {
    case "user":
      isAllowed = user !== null;
      break;
    case "showroomVendor":
      isAllowed = showroomVendor !== null;
      break;
    case "rentalVendor":
      isAllowed = rentalVendor !== null;
      break;
    case "admin":
      isAllowed = admin !== null;
      break;
    default:
      isAllowed = false;
  }

  return isAllowed ? children : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
