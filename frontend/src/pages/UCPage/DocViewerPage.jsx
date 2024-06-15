// src/pages/UCPage/DocViewer.jsx
import api from "../../services/apiService";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';

const DocViewerPage = () => {
  const { sigla, folderName, fileName } = useParams();
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await api.get(
            `/uploads/${sigla}/${folderName}/docs/${fileName}`,
            {
              responseType: "blob",
            }
          );
        if (response.status === 200) {
          const blob = await response.data;
          const url = URL.createObjectURL(blob);
          setFileUrl(url);
        } else {
          console.error('Failed to fetch the file');
        }
      } catch (error) {
        console.error('Error fetching the file:', error);
      }
    };

    fetchFile();
  }, [sigla, folderName, fileName]);

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
    } else if (['mp4', 'mov'].includes(extension)) {
      return 'video';
    } else {
      return 'document';
    }
  };

  const renderFile = () => {
    const type = getFileType(fileName);

    switch (type) {
      case 'pdf':
        return (
          <div className="doc-viewer p-6">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={fileUrl} />
            </Worker>
          </div>
        );
      case 'image':
        return (
          <div className="doc-viewer p-6">
            <img src={fileUrl} alt="File" />
          </div>
        );
      case 'video':
        return (
          <div className="doc-viewer p-6">
            <video controls>
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return (
          <div className="doc-viewer p-6">
            <p>Unsupported file type: {fileName}</p>
          </div>
        );
    }
  };

  return (
    <div className="doc-viewer p-6">
      <Link to={`/uc/${sigla}/conteudo`}>
        <Button 
            className="mb-4 py-2 px-4 bg-blue-500rounded"
        >
            Voltar para Conteúdo
        </Button>
      </Link>
      {fileUrl ? renderFile() : <p>A carregar documento...</p>}
    </div>
  );
};

export default DocViewerPage;
