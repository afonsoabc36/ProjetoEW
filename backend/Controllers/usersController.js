const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

// Get current user details
const getUserDetails = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findOne({ email: req.user.email }).select(
      "-password"
    ); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate({ email: email }, updates, {
      new: true,
    }).exec();
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await User.findOneAndDelete({ email: email }).exec();
    if (deletedUser) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  getUserDetails,
};
