import React from "react";
import { useEffect, useState } from "react";
import UCService from "../../services/UCService";
import { useAuth } from "../../hooks/AuthProvider";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { capitalizeFirstLetter } from "../../services/prettierService";

const UCPage = () => {
  const sigla = useParams().sigla;
  const [uc, setUC] = useState(null);
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const isDocente = uc?.docentes?.some(docente => docente.email === user.email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UCService.getUC(sigla);
        setUC(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, [sigla]);

  const handleDeleteUC = async () => {
    try {
      await UCService.deleteUC(sigla);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete UC", error);
      alert("Failed to delete UC");
    }
  };

  return (
    <div className="min-w-full sm:px-2 sm:py-2 md:px-0 md:py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex flex-col md:items-start md:pl-4 md:pr-8">
          <h1 className="font-bold text-3xl text-primary">{uc?.sigla}</h1>
          <h2 className="text-lg mt-4">{uc?.titulo}</h2>
        </div>
        <div className="pb-5 flex-row justify-end md:mt-10">
          {(isAdmin || (isTeacher && isDocente)) && (
            <div className="mt-4 md:mt-0 md:ml-10">
              <Link to={`/uc/${sigla}/editar`}>
                <Button variant="primary">Editar UC</Button>
              </Link>
              <Button
                className="mx-2 mt-2 md:mt-0"
                variant="danger"
                onClick={handleDeleteUC}
              >
                Apagar UC
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <div className="md:border-r pr-8">
          <h3 className="text-2xl mt-2 text-center font-bold mr-0 p-2 text-primary">
            Docentes
          </h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left text-white bg-gray-900">
              <thead className="uppercase text-xs bg-gray-700">
                <tr>
                  <th scope="col" className="p-4">
                    Nome
                  </th>
                  <th scope="col" className="p-4">
                    Email
                  </th>
                  <th scope="col" className="p-4">
                    Filiação
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {uc?.docentes?.map((docente) => (
                  <tr
                    key={docente._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-500 ease-in-out items-center"
                  >
                    <td className="p-6 flex items-center">
                      <img
                        src="https://www.gravatar.com/avatar/?d=mp"
                        alt="user"
                        className="rounded w-16 h-16"
                      />
                      <div className="text-base font-semibold ml-4 w-40">
                        {docente.nome}
                      </div>
                    </td>
                    <td className="p-4">{docente.email}</td>
                    <td className="p-4">{docente.filiacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-2xl mt-8 text-center font-bold mr-4 p-4 text-primary">
            Horário
          </h3>
          <div className="w-full grid grid-cols-2 gap-4 text-center">
            <div className="border-r">
              <h5 className="font-bold text-xl">Teóricas</h5>
              <div className="text-gray-400">
                {uc?.horario.teoricas.map((aula) => (
                  <div key={aula} className="p-4">
                    <span>{capitalizeFirstLetter(aula)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold text-xl">Práticas</h5>
              <div className="text-gray-400">
                {uc?.horario.praticas.map((aula) => (
                  <div key={aula} className="p-4">
                    <span>{capitalizeFirstLetter(aula)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <h3 className="font-bold text-2xl text-center text-primary mt-2">Sumários</h3>

          {uc?.aulas?.map((aula) => {
            return (
              <div
                key={aula._id}
                className="border-b border-gray-700 hover:bg-gray-800 transition duration-500 ease-in-out"
              >
                <div className="p-4">
                  <h4 className="text-lg font-bold">
                    {aula.tipo === "T" ? "Teórica" : "Prática"} - {aula.data}
                  </h4>
                  <ul className="list-disc list-inside">
                    {aula.sumario.map((sumario) => (
                      <li key={sumario}>{sumario}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UCPage;
