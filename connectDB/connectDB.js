import mongoose from "mongoose";

const connectDB = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    handleError(`Connection Failed ${error}`);
  }
};
export default connectDB;
