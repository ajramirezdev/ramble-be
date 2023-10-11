const ChatModel = require("../models/chat.entity");
const { v4: uuidv4 } = require("uuid");

const createChat = async (req, res) => {
  try {
    const data = await ChatModel.create({ ...req.body, _id: uuidv4() });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const getRoomChats = async (req, res) => {
  const { roomId } = req.params;

  try {
    const chats = await ChatModel.find({ roomId }).sort({ createdAt: 1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const getPrivateRoomChats = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const chats = await ChatModel.find({
      $or: [
        { "sender._id": senderId, roomId: receiverId },
        { "sender._id": receiverId, roomId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { createChat, getRoomChats, getPrivateRoomChats };
