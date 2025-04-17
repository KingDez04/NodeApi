import express from "express";
const router = express.Router();
import {
  getUser,
  getUsers,
  addUser,
  checkUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.get("/", getUsers);
router.get("/:id", authMiddleware, getUser);
router.post("/signup", addUser);
router.post("/login", checkUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
