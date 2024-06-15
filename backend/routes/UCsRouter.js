const express = require("express");
const router = express.Router();
const {
  getUCs,
  getUCBySigla,
  getDocentesBySigla,
  insertUC,
  updateUC,
  deleteUC,
  insertDoc,
  deleteDoc,
} = require("../Controllers/UCsController");

const verifyJWT = require("../middleware/veriftJWT");
const verifyRole = require("../middleware/verifyRole");

const { createCourseDocMulterInstance } = require("../middleware/upload");

const uploadDocs = createCourseDocMulterInstance("docs");

router.use(verifyJWT);

// GetUsers
router.get("/", getUCs);
router.get("/:sigla", getUCBySigla);
router.get("/docentes/:sigla", getDocentesBySigla);
router.post("/", insertUC);

router.post("/:sigla/conteudo", uploadDocs.single("doc"), insertDoc);
router.delete("/:sigla/conteudo/:folderName/:docName", deleteDoc);

router.put("/:sigla", updateUC);
router.delete("/:sigla", deleteUC);

module.exports = router;
