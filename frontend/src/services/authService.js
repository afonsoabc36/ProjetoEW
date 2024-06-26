import api from "./apiService";

const API_URL = "/auth";

const register = async (data) => {
  try {
    const response = await api.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const googleLogin = async (tokenId) => {
  try {
    const response = await api.post(`${API_URL}/googleLogin`, { tokenId });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const githubLogin = async (code) => {
  try {
    const response = await api.post(`${API_URL}/githubLogin`, { code });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const authService = { register, login, googleLogin, githubLogin };

export default authService;
