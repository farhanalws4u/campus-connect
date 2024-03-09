import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Create Schema
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Object,
  },
});
const Question = mongoose.model("questions", QuestionSchema);
export default Question;
