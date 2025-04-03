import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  ratings: {
    type: Number,
    min: 1,
    max: [5, "Rating can't exceed 5"],
    required: [true, "Rating is required"],
  },
});

const MovieModel = mongoose.model("Movie", movieSchema);

export default MovieModel;
