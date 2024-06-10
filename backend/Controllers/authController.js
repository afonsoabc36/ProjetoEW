const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create({ email, password, role });
    const token = jwt.sign({ email, role }, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await user.comparePassword(password))) {
      console.log(password, user.password);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ data: user.toJSON(), token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
