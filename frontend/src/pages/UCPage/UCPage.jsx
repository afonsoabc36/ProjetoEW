import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UCService from "../../services/UCService";
import { useAuth } from "../../hooks/AuthProvider";
import Button from "../../components/common/Button";

const UCPage = () => {
  const sigla = useParams().sigla;
  const [uc, setUC] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UCService.getUC(sigla);
        console.log(data);
        setUC(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, [sigla]);

  return (
    <div className="min-w-full md:p-4">
      <div className=" pb-5 flex justify-end">
        {(user?.role === "admin" || user?.role === "teacher") && (
          <Link to={`/uc/${sigla}/editar`}>
            <Button>Editar</Button>
          </Link>
        )}
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <div className="md:border-r pr-8">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl text-primary">{uc?.sigla}</h1>
            <h2 className="text-lg mt-4">{uc?.titulo}</h2>
          </div>
          <div className="overflow-x-auto mt-8">
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
                    <span>{aula}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold text-xl">Práticas</h5>
              <div className="text-gray-400">
                {uc?.horario.praticas.map((aula) => (
                  <div key={aula} className="p-4">
                    <span>{aula}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <h3 className="font-bold text-2xl text-center">Sumários</h3>

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
