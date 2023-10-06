import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  howHeard: {
    type: [String],
    enum: ["LinkedIn", "Friends", "Job Portal", "Others"],
  },
  city: {
    type: String,
    enum: ["Mumbai", "Pune", "Ahmedabad"],
  },
  state: {
    type: String,
    enum: ["Gujarat", "Maharashtra", "Karnataka"],
  },
  contacts: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
