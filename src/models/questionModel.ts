import mongoose, { Document } from "mongoose";

import { questionType } from "../types";

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: Object,
        option: String,
        isCorrect: Boolean,
      },
    ],
    language: String,
    level: String,
    time: Number,
  },
  { timestamps: true }
);

export default mongoose.model<questionType & Document>(
  "Question",
  questionSchema
);
