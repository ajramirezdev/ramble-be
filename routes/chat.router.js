const express = require("express");
const {
  getRoomChats,
  createChat,
  getPrivateRoomChats,
} = require("../controllers/chat.controller");
const router = express.Router();

router.get("/:roomId", getRoomChats);
router.get("/:senderId/:receiverId", getPrivateRoomChats);
router.post("/", createChat);

module.exports = router;
