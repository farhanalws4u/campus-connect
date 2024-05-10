import Question from "../models/question.js";
import User from "../models/User.js";
import Answer from "../models/answer.js";

export const submitQuestion = async (req, res) => {
  const user = await User.find({ _id: req.body.userId });

  const newQuestion = new Question({
    title: req.body.title,
    description: req.body.description,
    user: user[0],
  });

  newQuestion
    .save()
    .then((question) => res.status(201).json({ question }))
    .catch((err) =>
      res.status(500).json({ message: "could not submit your quetion!" })
    );
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ _id: -1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(404).json({ message: "could not fetch questions!" });
  }
};

export const submitAnswer = async (req, res) => {
  // { answer: _answer, questionId: id, user: currentUser } = body
  try {
    const newAnswer = new Answer(req.body);
    //
    // let subscription = req.body.subscription;
    // sendNotification(subscription);
    //
    newAnswer
      .save()
      .then((ans) => {
        res.status(200).json(ans);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find();
    if (answers) {
      res.status(200).send(answers);
    }
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
};
