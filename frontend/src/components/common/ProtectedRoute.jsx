import UCService from "../../services/UCService";
import { useAuth } from "../../hooks/AuthProvider";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";


const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useAuth();
  const { sigla } = useParams();
  const [docentes, setDocentes] = useState(null);

  useEffect(() => {
    const getDocentes = async () => {
      try {
        const docentesData = await UCService.getDocentes(sigla);
        setDocentes(docentesData);
      } catch (error) {
        console.error('Failed to fetch docentes:', error);
      }
    };

    if (sigla) {
      getDocentes();
    }
  }, [sigla]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (!docentes && sigla) {
    return <div>Loading docentes data...</div>;
  }

  const isAllowedRole = allowedRoles.includes(user.role);
  const isDocente = docentes?.some(docente => docente.email === user.email);

  if (!isAllowedRole || (!isDocente && sigla)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
