import mongoose, { Document } from "mongoose";
import { IUser } from "../types";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    points: [
      {
        type: Object,
        language: String,
        coins: Number,
      },
    ],
    dob: String,
    age: Number,
    gender: String,
    city: String,
    country: String,
    whyLearning: String,
    knownThrough: String,
    dailyGoal: Number,
    knownLang: String,
    learningLang: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IUser & Document>("User", userSchema);
