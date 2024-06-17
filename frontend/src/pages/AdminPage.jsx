import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import userService from "../services/userService";
import { prettierRole } from "../services/prettierService";
import UCService from "../services/UCService";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        const name = user.name ? user.name.toLowerCase() : "";
        return (
          user.email.includes(searchUser.toLowerCase()) ||
          name.includes(searchUser.toLowerCase())
        );
      })
    );
  }, [searchUser, users]);

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

  const handleExport = async () => {
    try {
      // Fetch Users
      const users = await userService.getAllUsers();

      // Fetch UCs
      const ucs = await UCService.getUCs();

      // Create a combined object for export
      const exportData = {
        users: users.map((user) => ({
          nome: user.name,
          email: user.email,
          role: user.role,
          afiliacao: user.affiliation,
          curso: user.course,
          departamento: user.department,
        })),
        ucs: ucs.map((uc) => ({
          sigla: uc.sigla,
          titulo: uc.titulo,
          docentes: uc.docentes.map((doc) => doc.name),
          horario: {
            praticas: uc.horario.praticas,
            teoricas: uc.horario.teoricas,
          },
          avaliacao: uc.avaliacao,
          datas: uc.datas.map((d) => ({
            teste: d.teste,
            exame: d.exame,
            projeto: d.projeto,
          })),
          aulas: uc.aulas.map((aula) => ({
            tipo: aula.tipo,
            data: aula.data,
            sumario: aula.sumario,
          })),
          conteudo: uc.conteudo.map((pasta) => ({
            nome: pasta.nome,
            docs: pasta.docs.map((doc) => ({
              nome: doc.nome,
              path: doc.path,
            })),
          })),
        })),
      };

      // Convert the object to JSON string
      const json = JSON.stringify(exportData, null, 2);

      // Create and download the JSON file
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "utilizadores_e_ucs.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data", error);
      alert("Não foi possível exportar os dados. Por favor, tente novamente.");
    }
  };

  const handleImport = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        return alert("Please select a file to import.");
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const json = e.target.result;
        const importData = JSON.parse(json);

        // Import Users
        for (const user of importData.users) {
          try {
            await userService.createAUser({
              name: user.nome,
              email: user.email,
              role: user.role,
              affiliation: user.afiliacao,
              course: user.curso,
              department: user.departamento,
              password: "12345",
            });
          } catch (error) {
            console.error("Failed to import user", user, error);
          }
        }

        // Import UCs
        for (const uc of importData.ucs) {
          try {
            await UCService.createUC({
              sigla: uc.sigla,
              titulo: uc.titulo,
              docentes: uc.docentes,
              horario: uc.horario,
              avaliacao: uc.avaliacao,
              datas: uc.datas,
              aulas: uc.aulas,
              conteudo: uc.conteudo,
            });
          } catch (error) {
            console.error("Failed to import UC", uc, error);
          }
        }

        alert("Importação concluída com sucesso.");
      };

      reader.readAsText(file);
    } catch (error) {
      console.log("Failed to import data", error);
      alert("Não foi possível importar os dados. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-w-full p-4">
      <div className="flex justify-between">
        <h1 className="text-white font-bold text-3xl mb-4">Utilizadores</h1>
        <div>
          <Link to="/admin/criar">
            <Button variant="primary" className="mb-4">
              Adicionar Utilizador
            </Button>
          </Link>
          <Button
            variant="primary"
            className="mt-4 mx-2"
            onClick={handleExport}
          >
            Exportar
          </Button>
          <label htmlFor="import-file" className="mt-4 mx-2">
            <Button variant="primary">Importar</Button>
          </label>

          <Input
            type="file"
            accept=".json"
            id="import-file"
            onChange={handleImport}
          />
        </div>
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
