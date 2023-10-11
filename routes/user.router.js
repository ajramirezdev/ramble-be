const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  editUser,
  deleteUser,
  loginUser,
} = require("../controllers/user.controller");

router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", editUser);
router.delete("/:userId", deleteUser);

module.exports = router;
