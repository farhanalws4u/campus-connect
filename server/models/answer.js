import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Create Schema
const AnswerSchema = new Schema({
  answer: {
    type: String,
  },
  questionId: {
    type: String,
  },
  user: {
    type: Object,
  },
});
const Answer = mongoose.model("answers", AnswerSchema);
export default Answer;
