import React from "react";
import { Link } from "react-router-dom";
import Image from "../components/common/Image";
import { useAuth } from "../hooks/AuthProvider";
import Button from "../components/common/Button";
import { prettierRole } from "../services/prettierService";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="md:px-[15rem]">
      <div className="bg-gray-600 rounded-lg border border-gray-700 shadow-xl">
        <div className="flex justify-between p-4">
          <h1 className="text-3xl py-4 font-bold">Perfil</h1>
          <Link to="/perfil/editar">
            <Button variant="primary" className="mt-3">
              Editar Perfil
            </Button>
          </Link>
        </div>
        <div>
          <div>
            <Image
              url={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          </div>
          <div className="bg-gray-800 p-4 rounded-b-lg md:grid md:grid-cols-2 md:break-words">
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
    </div>
  );
};

export default ProfilePage;
