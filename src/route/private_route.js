
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./helper.js";

const Protected = () => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  // Render child routes if authenticated
  return <Outlet />;
};

export default Protected;
