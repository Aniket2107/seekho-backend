import mongoose, { Document } from "mongoose";
import { ILeitner } from "../types";

const Schema = mongoose.Schema;

const leiternsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  data: [
    {
      type: Object,
      language: String,
      levelData: [
        {
          type: Object,
          level: String,
          learning: [String],
          reviewing: [String],
          mastered: [String],
        },
      ],
    },
  ],
  progress: [
    {
      type: Object,
      language: String,
      wordsLearned: Number,
      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  totalWordsLearned: [
    {
      type: Object,
      language: String,
      totalMastered: Number,
    },
  ],
});

export default mongoose.model<ILeitner & Document>("Leitner", leiternsSchema);
