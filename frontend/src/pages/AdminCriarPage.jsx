import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/userService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/AuthProvider";
import ImageInput from "../components/common/ImageInput";

const AdminCriarPage = ({ isNew = false }) => {
  const { email } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    affiliation: "",
    course: "",
    department: "",
  });
  const { user: meUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!email) {
          const res = await userService.getUserByEmail(meUser.email);
          setUser(res);
        } else {
          const res = await userService.getUserByEmail(email);
          setUser(res);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        alert(
          "Não foi possível carregar o utilizador. Por favor, tente novamente."
        );
      }
    };

    if (!isNew) {
      fetchUser();
    }
  }, [email, isNew]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setUser({ ...user, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in user) {
        formData.append(key, user[key]);
      }

      if (isNew) {
        user["password"] = "12345";
        await userService.createAUser(user);
        alert("Utilizador criado com sucesso.");
        window.location.href = "/admin";
      } else {
        if (!email) {
          await userService.updateAUser(meUser.email, formData);
          alert("Perfil atualizado com sucesso.");
          window.location.href = "/perfil";
        } else await userService.updateAUser(email, formData);
        alert("Utilizador atualizado com sucesso.");
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error("Failed to create/update user", error);
      alert(
        "Não foi possível criar/atualizar o utilizador. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="min-w-full p-4">
      <h1 className="text-white font-bold text-3xl mb-4">
        {isNew ? "Criar Utilizador" : "Editar Utilizador"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="name">
            Nome
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="role">
            Role
          </label>
          <Input
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            options={[
              { value: "admin", label: "Administrador" },
              { value: "student", label: "Estudante" },
              { value: "teacher", label: "Docente" },
            ]}
            required
          />
          <p className="text-gray-400 mb-4 text-xs mt-1">
            Role pode ser "admin", "teacher" ou "student".
          </p>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="affiliation">
            Afiliação
          </label>
          <Input
            type="text"
            id="affiliation"
            name="affiliation"
            value={user.affiliation}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="course">
            Curso
          </label>
          <Input
            type="text"
            id="course"
            name="course"
            value={user.course}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="department">
            Departamento
          </label>
          <Input
            type="text"
            id="department"
            name="department"
            value={user.department}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-2" htmlFor="avatar">
            Fotografia
          </label>
          <ImageInput onImageChange={handleImageChange} />
        </div>
        <Button
          type="submit"
          className="bg-primary text-black px-4 py-2 rounded"
        >
          {isNew ? "Criar" : "Atualizar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminCriarPage;
