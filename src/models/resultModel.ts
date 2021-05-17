import mongoose, { Document } from "mongoose";
import { resultType } from "../types";
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  attemps: [
    {
      type: Object,
      score: Number,
      date: {
        type: Date,
        default: new Date(),
      },
      quizData: [
        {
          type: Object,
          question: String,
          userAns: String,
          rightAns: String,
          timeTaken: Number,
        },
      ],
    },
  ],
});

export default mongoose.model<resultType & Document>("Result", resultSchema);
