const express = require("express");
const router = express.Router();
const {
  getUCs,
  getUCBySigla,
  insertUC,
  updateUC,
  deleteUC,
} = require("../Controllers/UCsController");

const verifyJWT = require("../middleware/veriftJWT");
const verifyRole = require("../middleware/verifyRole");
router.use(verifyJWT);

// GetUsers
router.get("/", getUCs);
router.get("/:sigla", getUCBySigla);
router.post("/", insertUC);
router.put("/:sigla", updateUC);
router.delete("/:sigla", deleteUC);

module.exports = router;
