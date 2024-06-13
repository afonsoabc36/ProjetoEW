import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./components/common/PrivateRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UCPage from "./pages/UCPage/UCPage";
import Unauthorized from "./pages/Unauthorized";
import EditarUCPage from "./pages/UCPage/EditarUCPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/uc/:sigla" element={<UCPage />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}
          >
            <Route path="/uc/:sigla/editar" element={<EditarUCPage />} />
            <Route path="/uc/criar" element={<EditarUCPage isNew />} />
          </Route>
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
