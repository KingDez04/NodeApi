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

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/signup", addUser);
router.post("/login", checkUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
