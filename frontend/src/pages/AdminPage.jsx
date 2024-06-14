import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import userService from "../services/userService";
import { prettierRole } from "../services/prettierService";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) => {
          const name = user.name ? user.name.toLowerCase() : ""; // TODO: Nome pode estar vazio ?
          return (
            user.email.includes(searchUser.toLowerCase()) ||
            name.includes(searchUser.toLowerCase())
          );
        })
    );
  }, [searchUser, users])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getAllUsers();
        setUsers(res);
      } catch (error) {
        console.error("Failed to fetch users", error);
        alert(
          "Não foi possível carregar os utilizadores. Por favor, tente novamente."
        );
      }
    };
    fetchUsers();
  }, []);

  const onChangeSearch = (e) => {
    setSearchUser(e.target.value);
  };

  const handleDeleteUser = (email) => async () => {
    try {
      await userService.deleteAUser(email);
      setUsers(users.filter((user) => user.email !== email));
      alert("Utilizador eliminado com sucesso.");
    } catch (error) {
      console.error("Failed to delete user", error);
      alert(
        "Não foi possível eliminar o utilizador. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="min-w-full">
      <div className="flex justify-between">
        <h1 className="text-white font-bold text-3xl mb-4">Utilizadores</h1>
        <Link to="/admin/criar">
          <Button variant="primary" className="mb-4">
            Adicionar Utilizador
          </Button>
        </Link>
      </div>

      <Input
        type="search"
        placeholder="Pesquisar Utilizador"
        className="w-full mt-4"
        id="searchUser"
        value={searchUser}
        onChange={onChangeSearch}
      />

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-600 text-white">
            <tr>
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Afiliação</th>
              <th className="p-2">Curso</th>
              <th className="p-2">Departamento</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {filteredUsers?.map((user) => (
              <tr key={user._id} className="bg-gray-800">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{prettierRole(user.role)}</td>
                <td className="p-2">{user.affiliation}</td>
                <td className="p-2">{user.course}</td>
                <td className="p-2">{user.department}</td>
                <td className="p-2">
                  <div className="flex">
                    <Link to={`/admin/editar/${user.email}`}>
                      <Button variant="warning" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="mx-2"
                      size="sm"
                      onClick={handleDeleteUser(user.email)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
