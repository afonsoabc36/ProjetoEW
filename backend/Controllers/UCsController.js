const UC = require("../Models/UCModel");

const getUCs = async (req, res) => {
  try {
    const ucs = await UC.find().exec();
    res.json(ucs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUCBySigla = async (req, res) => {
  try {
    const sigla = req.params.sigla;
    const filtro = { sigla : sigla }
    const uc = await UC.findOne(filtro).exec();
    if (uc) {
      res.json(uc);
    } else {
      res.status(404).json({message: "UC not found"})
    } 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const insertUC = async (req, res) => {
  try {
    const newUC = new UC(req.body);
    const savedUC = await newUC.save();
    res.status(201).json(savedUC);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUC = async (req, res) => {
  try {
    const sigla = req.params.sigla;
    const updatedUC = await UC.findOneAndUpdate({ sigla: sigla }, req.body, { new: true }).exec();
    if (updatedUC) {
      res.json(updatedUC);
    } else {
      res.status(404).json({ message: "UC not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUC = async (req, res) => {
  try {
    const sigla = req.params.sigla;
    const deletedUC = await UC.findOneAndDelete({ sigla: sigla }).exec();
    if (deletedUC) {
      res.json({ message: "UC deleted successfully" });
    } else {
      res.status(404).json({ message: "UC not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDocentesBySigla = async (req, res) => {
  try {
    const sigla = req.params.sigla;
    const uc = await UC.findOne({ sigla: sigla }).exec();
    if (uc) {
      res.json(uc.docentes);
    } else {
      res.status(404).json({ message: "UC not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getUCs,
  getUCBySigla,
  getDocentesBySigla,
  insertUC, 
  updateUC, 
  deleteUC
};
