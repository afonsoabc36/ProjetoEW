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

const UCService = { getUCs, getUC };

export default UCService;
