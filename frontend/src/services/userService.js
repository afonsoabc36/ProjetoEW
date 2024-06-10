import api from "./apiService";

const USER_URL = "/users";

export const getUser = async () => {
  const response = await api.get(`${USER_URL}/me`);
  return response.data;
};

export const updateUser = async (data) => {
  const response = await api.put(`${USER_URL}/me`, data);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(`${USER_URL}`);
  return response.data;
};

const userService = {
  getUser,
  updateUser,
  getAllUsers,
};

export default userService;
