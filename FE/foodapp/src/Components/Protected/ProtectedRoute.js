import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.authslice);
  if (!isLoggedIn) {
    console.log("wait");
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;
