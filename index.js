import "dotenv/config";
import express from "express";
import connectDB from "./connectDB/connectDB.js";
import movieRoute from "./routes/movie.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use("/api/movies", movieRoute);
app.use("/api/users", userRoute);

connectDB(MONGODB_URI);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
