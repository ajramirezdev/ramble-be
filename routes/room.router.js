const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  createRoom,
  getRoom,
  editRoom,
  deleteRoom,
} = require("../controllers/room.controller");

router.get("/", getAllRooms);
router.get("/:roomId", getRoom);
router.post("/", createRoom);
router.put("/:roomId", editRoom);
router.delete("/:roomId", deleteRoom);

module.exports = router;
