const express = require("express");
const router = express.Router();

const { login, register, googleLogin } = require("../Controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin)

module.exports = router;
