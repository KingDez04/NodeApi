import bcrypt from "bcrypt";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    role: {
      type: String,
      trim: true,
      default: "reader",
      enum: ["admin", "editor", "reader"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
