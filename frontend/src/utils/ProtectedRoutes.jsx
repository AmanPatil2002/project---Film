import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  
  const token = localStorage.getItem("token");

  // Ternary operator => It checks if the token is generated during login &
  // If token is present then it will display the <Outlet> (<Outlet> is a placeholder for [Home,Series,About Us,Admin,...] pages)
  // And If token is not present it will redirect it to login page to Login and generate the token
  return token ? <Outlet /> : <Navigate to="/" />
};

export default ProtectedRoutes;