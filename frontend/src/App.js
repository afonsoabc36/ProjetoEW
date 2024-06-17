import React from "react";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import UCPage from "./pages/UCPage/UCPage";
import ProfilePage from "./pages/ProfilePage";
import DocsPage from "./pages/UCPage/DocsPage";
import AuthProvider from "./hooks/AuthProvider";
import NotFoundPage from "./pages/NotFoundPage";
import Unauthorized from "./pages/Unauthorized";
import { Routes, Route } from "react-router-dom";
import AdminCriarPage from "./pages/AdminCriarPage";
import EditarUCPage from "./pages/UCPage/EditarUCPage";
import GitHubCallback from "./components/common/githubCallback";
import DocViewerPage from "./pages/UCPage/DocViewerPage";
import PrivateRoute from "./components/common/PrivateRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/github-callback" element={<GitHubCallback />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/uc/:sigla/conteudo" element={<DocsPage />} />
          <Route path="/uc/:sigla/conteudo/:folderName/:fileName" element={<DocViewerPage />} />

          <Route path="/uc/:sigla" element={<UCPage />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}
          >
            <Route path="/uc/:sigla/editar" element={<EditarUCPage />} />
            <Route path="/uc/criar" element={<EditarUCPage isNew />} />
          </Route>
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/perfil/editar" element={<AdminCriarPage />} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/criar" element={<AdminCriarPage isNew />} />
            <Route path="/admin/editar/:email" element={<AdminCriarPage />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
