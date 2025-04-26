import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.TOKEN, { expiresIn: "1h" });
};

const getUsers = async (_, res) => {
  try {
    const users = await UserModel.find().lean();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users available!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    const token = createToken(newUser._id, newUser.role);
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    const token = createToken(user._id, user.role);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findById(id).lean();
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsers, getUser, addUser, checkUser, updateUser, deleteUser };
