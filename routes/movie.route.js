import express from "express";
const router = express.Router();
import {
  getMovie,
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", authMiddleware, addMovie);
router.put("/:id", authMiddleware, updateMovie);
router.delete("/:id", authMiddleware, deleteMovie);

export default router;
