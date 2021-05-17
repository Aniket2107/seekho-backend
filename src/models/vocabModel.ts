import mongoose, { Document } from "mongoose";
import { vocabType } from "../types";

const Schema = mongoose.Schema;

const vocabSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  hindiInHindi: String,
  englishInEnglish: String,
  languageInHindi: String,
  languageInEnglish: String,
  languageInLanguage: String,
  image: String,
  audio: String,
});

export default mongoose.model<vocabType & Document>("Vocab", vocabSchema);
