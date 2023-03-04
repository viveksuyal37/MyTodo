import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const isLoggedin = localStorage.getItem("token");

  return isLoggedin ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
