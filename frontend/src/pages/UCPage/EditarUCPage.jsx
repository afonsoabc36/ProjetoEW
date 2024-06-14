import UCService from "../../services/UCService";
import Input from "../../components/common/Input";
import { useAuth } from "../../hooks/AuthProvider";
import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditarUCPage = ({ isNew = false }) => {
  const { sigla } = useParams();
  const [uc, setUC] = useState({
    sigla: "",
    titulo: "",
    docentes: [],
    horario: { praticas: [], teoricas: [] },
    avaliacao: [],
    datas: [{ teste: "", exame: "", projeto: "" }],
    aulas: [],
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newDocente, setNewDocente] = useState("");
  const [newAula, setNewAula] = useState({ tipo: "", data: "", sumario: [] });

  useEffect(() => {
    const fetchUC = async () => {
      try {
        const data = await UCService.getUC(sigla);
        setUC(data);
      } catch (error) {
        console.error("Failed to fetch UC data", error);
        alert("Failed to fetch UC data");
      }
    };
    if (!isNew) {
      fetchUC();
    }
  }, [sigla]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUC({ ...uc, [name]: value });
  };

  const handleAulaChange = (index, field, value) => {
    const updatedAulas = uc.aulas.map((aula, i) =>
      i === index ? { ...aula, [field]: value } : aula
    );
    setUC({ ...uc, aulas: updatedAulas });
  };

  const handleNewAulaChange = (field, value) => {
    setNewAula({ ...newAula, [field]: value });
  };

  const addNewAula = () => {
    if (newAula.tipo && newAula.data) {
      setUC({ ...uc, aulas: [...uc.aulas, newAula] });
      setNewAula({ tipo: "", data: "", sumario: [] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await UCService.createUC(uc);
        alert("UC criada com sucesso");
        navigate("/");
        return;
      }
      await UCService.updateUC(sigla, uc);
      alert("UC atualizada com sucesso");
      navigate(`/uc/${sigla}`);
    } catch (error) {
      console.error("Erro ao atualizar UC", error);
      alert("Failed to update UC");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="min-w-full md:p-4">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">
        {isNew ? "Criar UC" : "Alterar UC"}
      </h1>
      <Link to={`/uc/${sigla}`}>
        <Button variant="primary" className="mb-4" onClick={handleGoBack}>
            Voltar
        </Button>
      </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white">Sigla:</label>
          <Input
            id="sigla"
            type="text"
            name="sigla"
            value={uc.sigla}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            disabled={!isNew}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Título:</label>
          <Input
            id="titulo"
            type="text"
            name="titulo"
            value={uc.titulo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Docentes:</label>
          {uc?.docentes.map((docente, index) => (
            <div className="flex" key={`docente-${index}`}>
              <Input
                id={`docente-${index}`}
                type="text"
                name={`docente-${index}`}
                value={docente.nome}
                disabled
                className="w-full p-2 border bg-gray-500 border-gray-300 rounded mt-2"
              />
              <div className="ml-2">
                <Button
                  className="mt-2"
                  onClick={() => {
                    const newDocentes = uc.docentes.filter(
                      (_, i) => i !== index
                    );
                    setUC({ ...uc, docentes: newDocentes });
                  }}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          <div className="flex">
            <Input
              id="new-docente"
              type="text"
              name="new-docente"
              placeholder="Novo docente"
              className="w-full p-2 rounded mt-2"
              onChange={(e) => setNewDocente(e.target.value)}
            />
            <div>
              <Button
                className="mt-2 ml-2"
                onClick={() =>
                  setUC({
                    ...uc,
                    docentes: [...uc.docentes, { nome: newDocente, email: "" }],
                  })
                }
              >
                Adicionar Docente
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white">Horário:</label>
          <div className="flex">
            <div className="w-1/2">
              <label className="block text-white">Teóricas:</label>
              <Input
                id="teoricas"
                type="textarea"
                name="teoricas"
                value={uc.horario.teoricas.join(", ")}
                onChange={(e) =>
                  setUC({
                    ...uc,
                    horario: {
                      ...uc.horario,
                      teoricas: e.target.value.split(", "),
                    },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-white">Práticas:</label>
              <Input
                id="praticas"
                type="textarea"
                name="praticas"
                value={uc.horario.praticas.join(", ")}
                onChange={(e) =>
                  setUC({
                    ...uc,
                    horario: {
                      ...uc.horario,
                      praticas: e.target.value.split(", "),
                    },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white">Avaliação:</label>
          <Input
            id="avaliacao"
            type="textarea"
            name="avaliacao"
            value={uc.avaliacao.join(", ")}
            onChange={(e) =>
              setUC({ ...uc, avaliacao: e.target.value.split(", ") })
            }
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Datas:</label>
          <label className="block text-white">Teste:</label>
          <Input
            id="datas-teste"
            type="text"
            name="datas-teste"
            value={uc.datas[0]?.teste || ""}
            onChange={(e) => {
              const newDatas = [...uc.datas];
              newDatas[0] = { ...newDatas[0], teste: e.target.value };
              setUC({ ...uc, datas: newDatas });
            }}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
          <label className="block text-white">Exame:</label>
          <Input
            id="datas-exame"
            type="text"
            name="datas-exame"
            value={uc.datas[0]?.exame || ""}
            onChange={(e) => {
              const newDatas = [...uc.datas];
              newDatas[0] = { ...newDatas[0], exame: e.target.value };
              setUC({ ...uc, datas: newDatas });
            }}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
          <label className="block text-white">Projeto:</label>
          <Input
            id="datas-projeto"
            type="text"
            name="datas-projeto"
            value={uc.datas[0]?.projeto || ""}
            onChange={(e) => {
              const newDatas = [...uc.datas];
              newDatas[0] = { ...newDatas[0], projeto: e.target.value };
              setUC({ ...uc, datas: newDatas });
            }}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Aulas:</label>
          {uc?.aulas.map((aula, index) => (
            <div className="flex mb-2" key={`aula-${index}`}>
              <Input
                id={`aula-tipo-${index}`}
                type="text"
                name={`aula-tipo-${index}`}
                value={aula.tipo}
                placeholder="Tipo"
                onChange={(e) =>
                  handleAulaChange(index, "tipo", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <Input
                id={`aula-data-${index}`}
                type="text"
                name={`aula-data-${index}`}
                value={aula.data}
                placeholder="Data"
                onChange={(e) =>
                  handleAulaChange(index, "data", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2 ml-2"
              />
              <Input
                id={`aula-sumario-${index}`}
                type="textarea"
                name={`aula-sumario-${index}`}
                value={aula.sumario}
                placeholder="Sumario"
                onChange={(e) =>
                  handleAulaChange(index, "sumario", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2 ml-4"
              />
              <div className="ml-6">
                <Button
                  className="mt-2"
                  onClick={() => {
                    const newAulas = uc.aulas.filter((_, i) => i !== index);
                    setUC({ ...uc, aulas: newAulas });
                  }}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          <div className="flex">
            <Input
              id="new-aula-tipo"
              type="text"
              name="new-aula-tipo"
              placeholder="Tipo"
              value={newAula.tipo}
              onChange={(e) => handleNewAulaChange("tipo", e.target.value)}
              className="w-full p-2 rounded mt-2"
            />
            <Input
              id="new-aula-data"
              type="text"
              name="new-aula-data"
              placeholder="Data"
              value={newAula.data}
              onChange={(e) => handleNewAulaChange("data", e.target.value)}
              className="w-full p-2 rounded mt-2 ml-2"
            />
            <Input
              id="new-aula-sumario"
              type="textarea"
              name="new-aula-sumario"
              placeholder="Sumario"
              value={newAula.sumario}
              onChange={(e) => handleNewAulaChange("sumario", e.target.value)}
              className="w-full p-2 rounded mt-2 ml-2"
            />
            <div>
              <Button className="mt-2 ml-2" onClick={addNewAula}>
                Adicionar Aula
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">{isNew ? "Criar" : "Guardar"}</Button>
        </div>
      </form>
    </div>
  );
};

export default EditarUCPage;
