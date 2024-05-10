import express from "express";

import {
  submitQuestion,
  getQuestions,
  submitAnswer,
  getAnswers,
} from "../controllers/question.js";

const router = express.Router();

router.post("/submitQuestion", submitQuestion);
router.get("/getQuestions", getQuestions);
router.post("/submitAnswer", submitAnswer);
router.get("/getAnswers", getAnswers);

export default router;
