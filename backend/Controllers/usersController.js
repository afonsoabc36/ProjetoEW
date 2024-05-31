const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertUser = async (req, res) => {
  return;
};

module.exports = {
  getUsers,
  insertUser,
};
