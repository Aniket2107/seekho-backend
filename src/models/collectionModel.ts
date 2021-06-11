import mongoose, { Document } from "mongoose";

import { collectionType } from "../types";

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vocabCollection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vocab",
    },
  ],
});

export default mongoose.model<collectionType & Document>(
  "Collection",
  collectionSchema
);
