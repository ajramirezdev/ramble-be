const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const UserRouter = require("./routes/user.router");
const RoomRouter = require("./routes/room.router");
const ChatRouter = require("./routes/chat.router");

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 2222;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/room", RoomRouter);
app.use("/chat", ChatRouter);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("sendMessage", (newChat) => {
    io.to(newChat.roomId).emit("message", newChat);
  });

  socket.on("joinPrivateRoom", ({ senderId, receiverId }) => {
    socket.join(`${senderId}${receiverId}`);
    console.log(`User joined room: ${senderId}`);
  });

  socket.on("sendPrivateMessage", (newChat) => {
    io.to(`${newChat._id}${newChat.sender._id}`).emit(
      "privateMessage",
      newChat
    );
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
