const express = require("express");
const router = express.Router();
const {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  getUserDetails,
  getUserByEmail,
  getUserFavoriteUCs,
  updateUserFavorites,
} = require("../Controllers/usersController");

const verifyJWT = require("../middleware/veriftJWT");
const { createAvatarMulterInstance } = require("../middleware/upload");

const uploadAvatar = createAvatarMulterInstance("avatars");

router.use(verifyJWT);

// GetUsers
router.get("/me", getUserDetails);
router.get("/", getUsers);
router.get("/:email", getUserByEmail);
router.get("/:email/favorites", getUserFavoriteUCs);
router.post("/", uploadAvatar.single("avatar"), insertUser);
router.put("/:email", uploadAvatar.single("avatar"), updateUser);
router.put("/:email/favorites", updateUserFavorites);
router.delete("/:email", deleteUser);

module.exports = router;
