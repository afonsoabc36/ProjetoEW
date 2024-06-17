import UCService from "../../services/UCService";
import Input from "../../components/common/Input";
import { useAuth } from "../../hooks/AuthProvider"; 
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";

const DocsPage = () => {
  const { sigla } = useParams();
  const { user } = useAuth();
  const [uc, setUC] = useState(null);
  const [fileName, setFileName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const isDocente = uc?.docentes?.some(
    (docente) => docente.email === user.email
  );

  const modifyCondition = (isAdmin || (isTeacher && isDocente))

  useEffect(() => {
    const fetchUC = async () => {
      try {
        const data = await UCService.getUC(sigla);
        setUC(data);
      } catch (error) {
        console.error("Error fetching UC:", error);
      }
    };

    fetchUC();
  }, [sigla]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !folderName) {
      alert("Escolha um ficheiro e uma pasta antes de dar upload.");
      return;
    }

    const formData = new FormData();
    formData.append("doc", selectedFile);
    formData.append("folderName", folderName);

    try {
      await UCService.insertDoc(sigla, folderName, formData);
      const data = await UCService.getUC(sigla);
      setUC(data);
      setSelectedFile(null);
      setFolderName("");
      setFileName("");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const handleDelete = async (folderName, docName) => {
    if (window.confirm("Tens a certeza que queres eliminar este documento?")) {
      try {
        await UCService.deleteDoc(sigla, folderName, docName);
        const data = await UCService.getUC(sigla);
        setUC(data);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const handleDeleteFolder = async (folderName) => {
    if (window.confirm("Tens a certeza que queres eliminar esta pasta?")) {
      try {
        await UCService.deleteFolder(sigla, folderName);
        const data = await UCService.getUC(sigla);
        setUC(data);
      } catch (error) {
        console.error("Error deleting folder:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">Conteúdo</h1>
          <p className="text-xl font-bold text-primary mb-6">{sigla}</p>
        </div>
        <Link to={`/uc/${sigla}`}>
          <Button variant="primary" className="mb-4">
            Voltar
          </Button>
        </Link>
      </div>

      {uc && (
        <div className="mb-8">
          {uc.conteudo.map((folder) => (
            <div key={folder.nome} className="mb-6 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-2xl font-semibold">{folder.nome}</h2>
                {(modifyCondition) && (
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteFolder(folder.nome)}
                  >
                    Remover Pasta
                  </button>
                )}
              </div>
              <ul className="bg-gray-800 p-4 rounded-b-lg shadow-lg">
                {folder.docs.map((doc) => (
                  <li
                    key={doc.nome}
                    className="flex justify-between items-center p-2 border-b last:border-none"
                  >
                    <Link
                      to={`/uc/${sigla}/conteudo/${folder.nome}/${doc.nome}`}
                    >
                      <p className="text-blue-500 hover:underline">
                        {doc.nome}
                      </p>
                    </Link>
                    {(modifyCondition) && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(folder.nome, doc.nome)}
                      >
                        Remover
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {(modifyCondition) && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Pasta do documento</h2>
          <Input
            id="folderName"
            type="text"
            placeholder="Pasta onde pretende colocar o documento"
            value={folderName}
            onChange={handleFolderNameChange}
            className="mb-4 p-2 border rounded-lg w-full border-gray-600"
          />
          <Input
            id="selectedFileDisplay"
            type="text"
            placeholder={fileName || "Nenhum arquivo escolhido"}
            value={fileName}
            readOnly
            className="mb-4 p-2 border rounded-lg w-full border-gray-600 bg-gray-700 text-gray-400"
          />
          <Input
            id="selectedFile"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 rounded-lg cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          />

          <Button onClick={handleUpload} className="py-2 px-4 rounded-lg">
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocsPage;
