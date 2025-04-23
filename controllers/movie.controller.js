import MovieModel from "../models/movie.model.js";

const getMovies = async (_, res) => {
  try {
    const movies = await MovieModel.find({}).lean();
    if (!movies) {
      return res.status(404).json({ message: "No movies available!" });
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findById(id).lean();
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const newMovie = await MovieModel.create(req.body);
    if (!newMovie) {
      return res
        .status(404)
        .json({ message: "There was an issue creating movie. Try again!" });
    }
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByIdAndUpdate(id, req.body);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    const updatedMovie = await MovieModel.findById(id);
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await MovieModel.findById(id).lean();
    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    res.status(200).json(deletedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMovies, getMovie, addMovie, updateMovie, deleteMovie };
