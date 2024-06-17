const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");
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
    const filtro = { sigla: sigla };
    const uc = await UC.findOne(filtro).exec();
    if (uc) {
      res.json(uc);
    } else {
      res.status(404).json({ message: "UC not found" });
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
    const updatedUC = await UC.findOneAndUpdate({ sigla: sigla }, req.body, {
      new: true,
    }).exec();
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

const insertDoc = async (req, res) => {
  try {
    const sigla = req.params.sigla;
    const folderName = req.body.folderName;

    const uc = await UC.findOne({ sigla }).exec();
    if (!uc) {
      return res.status(404).json({ message: "UC not found" });
    }

    let folderIndex = uc.conteudo.findIndex(
      (folder) => folder.nome === folderName
    );
    if (folderIndex === -1) {
      uc.conteudo.push({ nome: folderName, docs: [] });
      folderIndex = uc.conteudo.length - 1;
    }

    uc.conteudo[folderIndex].docs.push({
      nome: req.file.originalname,
      path: req.file.path,
    });

    await uc.save();
    res.status(201).json(uc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDoc = async (req, res) => {
  try {
    const { sigla, folderName, docName } = req.params;

    const uc = await UC.findOne({ sigla }).exec();

    if (!uc) {
      return res.status(404).json({ message: "UC not found" });
    }
    const folder = uc.conteudo.find((folder) => folder.nome === folderName);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const doc = folder.docs.find((doc) => doc.nome === docName);

    if (!doc) {
      return res.status(404).json({ message: "Doc not found" });
    }

    const filePath = path.join(
      __dirname,
      `../uploads/${sigla}/${folderName}/docs/${docName}`
    );
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        return res.status(404).json({ message: "File not found" });
      }
      throw error;
    }

    const docIndex = folder.docs.indexOf(doc);
    folder.docs.splice(docIndex, 1);

    await uc.save();
    res.status(200).json(uc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { sigla, folderName } = req.params;

    const uc = await UC.findOne({ sigla }).exec();
    if (!uc) {
      return res.status(404).json({ message: "UC not found" });
    }

    const folderIndex = uc.conteudo.findIndex(
      (folder) => folder.nome === folderName
    );
    if (folderIndex === -1) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const folder = uc.conteudo[folderIndex];

    for (const doc of folder.docs) {
      const filePath = path.join(
        __dirname,
        `../uploads/${sigla}/${folderName}/docs/${doc.nome}`
      );
      try {
        await fs.promises.unlink(filePath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
    }

    const folderPath = path.join(
      __dirname,
      `../uploads/${sigla}/${folderName}`
    );
    await fsExtra.remove(folderPath);

    uc.conteudo.splice(folderIndex, 1);

    await uc.save();
    res.status(200).json(uc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUCs,
  getUCBySigla,
  getDocentesBySigla,
  insertUC,
  updateUC,
  deleteUC,
  insertDoc,
  deleteDoc,
  deleteFolder,
};
