import api from "./apiService";

const API_URL = "/UCs";

const getUCs = async () => {
  try {
    const response = await api.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const getUC = async (sigla) => {
  try {
    const response = await api.get(`${API_URL}/${sigla}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const getDocentes = async (sigla) => {
  try {
    const response = await api.get(`${API_URL}/docentes/${sigla}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const updateUC = async (sigla, updatedUC) => {
  const response = await api.put(`${API_URL}/${sigla}`, updatedUC);
  return response.data;
};

const deleteUC = async (sigla) => {
  const response = await api.delete(`${API_URL}/${sigla}`);
  return response.data;
};

const createUC = async (newUC) => {
  const response = await api.post(`${API_URL}`, newUC);
  return response.data;
};

const insertDoc = async (sigla, doc) => {
  const response = await api.post(`${API_URL}/${sigla}/conteudo`, doc);
  return response.data;
};

const deleteDoc = async (sigla, folderName, docName) => {
  const response = await api.delete(
    `${API_URL}/${sigla}/conteudo/${folderName}/${docName}`
  );
  return response.data;
};

const UCService = {
  getUCs,
  getUC,
  getDocentes,
  updateUC,
  deleteUC,
  createUC,
  insertDoc,
  deleteDoc,
};

export default UCService;
