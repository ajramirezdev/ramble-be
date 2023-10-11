const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user.entity");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not Found");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const parsedUser = JSON.parse(JSON.stringify(user));
      delete parsedUser.password;
      const token = jwt.sign(parsedUser, SECRET, { expiresIn: "1d" });

      res.status(200).send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(404);
  }
};

const getAllUsers = async (req, res) => {
  const { email } = req.query;

  try {
    if (email) {
      const user = await UserModel.findOne({ email });
      res.status(200).json(user);
    } else {
      const users = await UserModel.find();
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      ...req.body,
      _id: uuidv4(),
      password: hash,
    };

    const user = await UserModel.create(newUser);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  let edits = req.body;

  if (req.body.password) {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    edits = { ...req.body, password: hash };
  }

  try {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: edits },
      { new: true }
    );
    res.sendStatus(202);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await UserModel.findOneAndDelete({ _id: userId });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  editUser,
  deleteUser,
  loginUser,
};
