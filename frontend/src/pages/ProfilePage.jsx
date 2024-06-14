import React from "react";
import { Link } from "react-router-dom";
import Image from "../components/common/Image";
import { useAuth } from "../hooks/AuthProvider";
import Button from "../components/common/Button";
import { prettierRole } from "../services/prettierService";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <div className="bg-gray-700 rounded-lg shadow-xl p-4">
        <div className="flex justify-between">
          <h1 className="text-3xl py-4 font-bold">Perfil</h1>
          <Link to="/perfil/editar">
            <Button variant="primary" className="mb-4">
              Editar Perfil
            </Button>
          </Link>
        </div>
        <div>
          <div>
            <Image
              url={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
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
            <p>{prettierRole(user?.role) || "N/A"}</p>
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
