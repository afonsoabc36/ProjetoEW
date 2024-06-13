import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import Layout from "../layout/Layout";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  // if (!user) {
  //   return <div>Loading user data...</div>;
  // }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;
