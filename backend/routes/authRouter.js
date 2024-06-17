const express = require("express");
const router = express.Router();

const { login, register, googleLogin, githubLogin } = require("../Controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.post("/githubLogin", githubLogin);

module.exports = router;
