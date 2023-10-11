const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    _id: String,
    createdBy: String,
    roomName: String,
    roomCaption: String,
    members: [String],
    isPrivate: Boolean,
    password: String,
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("room", roomSchema);

module.exports = RoomModel;
