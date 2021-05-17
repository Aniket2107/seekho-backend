import mongoose, { Document } from "mongoose";

import { langType } from "../types";

const Schema = mongoose.Schema;

const langSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  levels: [
    {
      type: String,
    },
  ],
});

export default mongoose.model<langType & Document>("Language", langSchema);
