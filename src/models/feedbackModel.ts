import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

import { feedType } from "../types";

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.model<feedType & Document>("Feedback", feedbackSchema);
