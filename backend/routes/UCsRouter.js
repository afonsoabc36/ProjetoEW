const express = require("express");
const router = express.Router();
const { getUCs } = require("../Controllers/UCsController");

// const verifyJWT = require("../middlewares/verifyJWT");

// GetUsers
router.get("/", getUCs);

module.exports = router;
