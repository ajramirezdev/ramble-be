const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    friends: [],
    img: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/ramble-b42cf.appspot.com/o/user-images%2Fdefault-user.png?alt=media&token=c5d64f1e-3943-4a20-9d42-361500d03507",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
