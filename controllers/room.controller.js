const RoomModel = require("../models/room.entity");
const { v4: uuidv4 } = require("uuid");

const getAllRooms = async (req, res) => {
  const { createdBy, joinedBy, name } = req.query;

  try {
    if (createdBy) {
      const rooms = await RoomModel.find({ createdBy });
      res.status(200).json(rooms);
    } else if (joinedBy) {
      const rooms = await RoomModel.find({ members: { $in: [joinedBy] } });
      res.status(200).json(rooms);
    } else if (name) {
      const room = await RoomModel.findOne({ roomName: name });
      res.status(200).json(room);
    } else {
      const rooms = await RoomModel.find();
      res.status(200).json(rooms);
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const getRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await RoomModel.findOne({ _id: roomId });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await RoomModel.create({ ...req.body, _id: uuidv4() });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const editRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await RoomModel.findOneAndUpdate(
      { _id: roomId },
      { $set: req.body },
      { new: true }
    );
    res.status(202).json(room);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    await RoomModel.findOneAndDelete({ _id: roomId });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports = { createRoom, getAllRooms, getRoom, editRoom, deleteRoom };
