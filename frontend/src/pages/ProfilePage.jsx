import React from "react";
import { useAuth } from "../hooks/AuthProvider";

const ProfilePage = () => {
  const { user } = useAuth();

  console.log("user", user);

  return (
    <div className="p-4">
      <div className="bg-gray-700 rounded-lg shadow-xl p-4">
        <h1 className="text-3xl py-4 font-bold">Perfil</h1>
        <div>
          <div className="py-4">
            <label className="text-xl font-bold">Nome:</label>
            <p>{user?.name || "N/A"}</p>
          </div>
          <div className="py-4">
            <label className="text-xl font-bold">Email:</label>
            <p>{user?.email || "N/A"}</p>
          </div>
          <div className="py-4">
            <label className="text-xl font-bold">Role:</label>
            <p>{user?.role || "N/A"}</p>
          </div>
          <div className="py-4">
            <label className="text-xl font-bold">Afiliação:</label>
            <p>{user?.affiliation || "N/A"}</p>
          </div>
          <div className="py-4">
            <label className="text-xl font-bold">Departamento:</label>
            <p>{user?.department || "N/A"}</p>
          </div>
          <div className="py-4">
            <label className="text-xl font-bold">Curso:</label>
            <p>{user?.course || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
