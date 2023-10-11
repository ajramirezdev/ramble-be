const mongoose = require("mongoose");
const moment = require("moment-timezone");

const chatSchema = new mongoose.Schema(
  {
    _id: String,
    roomId: String,
    sender: {},
    body: String,
    createdAt: {
      type: Date,
      default: () => moment().tz("Asia/Manila").toDate(),
    },
  },
  { timestamps: false }
);

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
