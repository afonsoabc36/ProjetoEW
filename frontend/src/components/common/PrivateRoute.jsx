import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import Layout from "../layout/Layout";

const PrivateRoute = () => {
  const { token } = useAuth();

  console.log("Token", token);

  if (!token) return <Navigate to="/login" />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;
