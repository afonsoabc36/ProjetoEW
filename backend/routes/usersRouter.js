const express = require("express");
const router = express.Router();
const {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const verifyJWT = require("../middleware/veriftJWT");

router.use(verifyJWT);

// GetUsers
router.get("/", getUsers);
router.post("/", insertUser);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

module.exports = router;
