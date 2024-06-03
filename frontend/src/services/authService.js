import api from "./apiService";

const API_URL = "/auth";

const register = async (username, email, password) => {
  try {
    const response = await api.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
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

const authService = { register, login };

export default authService;
