import express from "express";
const router = express.Router();
import {
  getMovie,
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
