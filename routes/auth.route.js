import express from "express";
const router = express.Router();
import { checkUser, addUser } from "../controllers/user.controller.js";

router.post("/login", checkUser);
router.post("/signup", addUser);

export default router;
