const express = require("express");
const router = express.Router();
const { getUsers, insertUser } = require("../controllers/usersController");

// const verifyJWT = require("../middlewares/verifyJWT");

// GetUsers
router.get("/", getUsers);
router.post("/", insertUser);

module.exports = router;
