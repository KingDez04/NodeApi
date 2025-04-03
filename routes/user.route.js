import express from "express";
const router = express.Router();
import {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
