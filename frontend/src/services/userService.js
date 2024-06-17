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

export const getUserByEmail = async (email) => {
  const response = await api.get(`${USER_URL}/${email}`);
  return response.data;
};

export const getUserFavoriteUCs = async (email) => {
  const response = await api.get(`${USER_URL}/${email}/favorites`);
  return response.data;
};

export const deleteAUser = async (email) => {
  const response = await api.delete(`${USER_URL}/${email}`);
  return response.data;
};

export const createAUser = async (data) => {
  console.log(data);
  const response = await api.post(`${USER_URL}`, data);
  return response.data;
};

export const updateAUser = async (email, data) => {
  const response = await api.put(`${USER_URL}/${email}`, data);
  return response.data;
};

export const updateUserFavorites = async (email, favorites) => {
  const response = await api.put(`${USER_URL}/${email}/favorites`, {
    favorites,
  });
  return response.data;
};

const userService = {
  getUser,
  updateUser,
  getAllUsers,
  deleteAUser,
  createAUser,
  updateAUser,
  getUserByEmail,
  getUserFavoriteUCs,
  updateUserFavorites,
};

export default userService;
