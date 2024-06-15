import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UCService from "../../services/UCService";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const DocsPage = () => {
  const { sigla } = useParams();
  const [uc, setUC] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderName, setFolderName] = useState("");

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
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !folderName) {
      alert("Please select a file and enter a folder name.");
      return;
    }

    const formData = new FormData();
    formData.append("doc", selectedFile);
    formData.append("folderName", folderName);

    try {
      await UCService.insertDoc(sigla, formData);
      const data = await UCService.getUC(sigla);
      setUC(data); // Refresh the UC data
      setSelectedFile(null); // Clear the selected file
      setFolderName(""); // Clear the folder name input
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const handleDelete = async (folderName, docName) => {
    try {
      await UCService.deleteDoc(sigla, folderName, docName);
      const data = await UCService.getUC(sigla);
      setUC(data); // Refresh the UC data
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Conteúdo</h1>
      <p className="text-xl mb-6">Sigla: {sigla}</p>

      {uc && (
        <div className="mb-8">
          {uc.conteudo.map((folder) => (
            <div key={folder.nome} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{folder.nome}</h2>
              <ul className="bg-gray-700 p-4 rounded-lg shadow-lg">
                {folder.docs.map((doc) => (
                  <li
                    key={doc.nome}
                    className="flex justify-between items-center p-2 border-b last:border-none"
                  >
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {doc.nome}
                    </a>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(folder.nome, doc.nome)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
        <Input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={handleFolderNameChange}
          className="mb-4 p-2 border rounded-lg w-full"
        />
        <Input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded-lg w-full"
        />
        <Button onClick={handleUpload} className=" py-2 px-4 rounded-lg">
          Upload
        </Button>
      </div>
    </div>
  );
};

export default DocsPage;
