const UC = require("../Models/UCModel");

const getUCs = async (req, res) => {
  try {
    const ucs = await UC.find();
    res.json(ucs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUCs,
};
