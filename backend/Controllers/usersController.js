const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");

// Get current user details
const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { lastAccess: Date.now() },
      { new: true }
    ).select("-password"); // Exclude password

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

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email })
      .select("-password")
      .exec();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserFavoriteUCs = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertUser = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      affiliation,
      department,
      course,
      avatar,
      role,
      favorites,
    } = req.body;

    console.log(req.body);
    console.log(req.file);

    const hashedPassword = await bcrypt.hash(password, 10);

    if (req.file) {
      avatar = `${req.file.path}`;
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      affiliation,
      department,
      course,
      avatar,
      role,
      favorites,
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
    const {
      password,
      name,
      affiliation,
      department,
      course,
      avatar,
      role,
      favorites,
    } = req.body;

    const updates = {
      name,
      affiliation,
      department,
      course,
      avatar,
      role,
      password,
      favorites,
    };

    console.log(req.file);

    if (req.file) {
      updates.avatar = `${req.file.path}`;
    }

    if (password) {
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

const updateUserFavorites = async (req, res) => {
  try {
    const { email } = req.params;
    const { favorites } = req.body;

    const user = await User.findOneAndUpdate(
      { email: email },
      { favorites: favorites },
      { new: true }
    );

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Failed to update favorites:", error);
    res.status(500).json({ message: "Failed to update favorites" });
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
  getUserByEmail,
  getUserFavoriteUCs,
  updateUserFavorites,
};
