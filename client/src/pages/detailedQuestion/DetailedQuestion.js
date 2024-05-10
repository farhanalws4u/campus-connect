import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { setCurrentQuestion } from "../../store/actions/questionActions";
import { getQuestions } from "../../store/actions/questionActions";
import { useState } from "react";
import { submitAnswer, getAnswers } from "../../store/actions/questionActions";
import "./styles.css";
import { setUserLoading } from "../../store/actions/authActions";

function DetailedQuestion() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    dispatch(setCurrentQuestion(id));
    dispatch(getQuestions());
    dispatch(getAnswers());
  }, []);

  const question = useSelector((state) =>
    state.questions.all.filter((ques) => ques._id === id)
  );

  const currentUser = useSelector((state) => state.auth.user);

  const loggedUserId = useSelector((state) => state.auth.user);

  const name = useSelector((state) => state.auth.user.name);

  const allAnswers = useSelector((state) => state.answers);

  const answers = allAnswers.filter((ans) => ans.questionId === id);

  const checkUser = () => {
    if (question[0].user._id !== loggedUserId) {
      return question[0].user.name;
    } else {
      return "you";
    }
  };
  const checkUserForAns = (ansName) => {
    if (ansName === name) {
      return "you";
    } else {
      return ansName;
    }
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = (e) => {
    if (answer === "") {
      alert("please enter your answer first!");
      return;
    }
    e.preventDefault();
    const _answer = answer;
    setAnswer("");
    dispatch(
      submitAnswer({ answer: _answer, questionId: id, user: currentUser })
    );
  };
  if (allAnswers === {}) {
    dispatch(setUserLoading(true));
  } else
    return (
      <Box>
        <Container
          maxWidth="md"
          sx={{ marginTop: 5, paddingBottom: "100px", height: "fit-content" }}
        >
          {/* question section  */}
          <Box>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { lg: 23, md: 23, sm: 20, xs: 18 },
                fontFamily: "merriweather",
                color: "#6E48AA",
                maxWidth: "700px",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                textAlign: "left",
                borderBottom: "1px solid #d1d0d0",
                paddingBottom: "15px",
              }}
            >
              {question[0].title}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  lg: "16px",
                  md: "16px",
                  sm: "14px",
                  sx: "12px",
                },
                fontFamily: "merriweather",
                color: "#808080",
                maxWidth: "700px",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                textAlign: "left",
                marginTop: "20px",
              }}
            >
              {question[0].description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "merriweather",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              ></Typography>
              <Typography
                sx={{
                  fontFamily: "merriweather",
                  textAlign: "right",
                  fontSize: "12px",
                }}
              >
                {"-asked by" + " " + checkUser()}
              </Typography>
            </Box>
          </Box>
          {/* answers section */}
          <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { lg: 23, md: 23, sm: 20, xs: 18 },
                fontFamily: "merriweather",
                color: "#6E48AA",
                borderLeft: "4px solid #6E48AA",
                borderTopLeftRadius: "3px",
                borderBottomLeftRadius: "3px",
                paddingLeft: 2,
                marginBottom: "20px",
              }}
            >
              Top Answers
            </Typography>

            {answers.length !== 0 ? (
              answers.map((ans) => {
                return (
                  <Paper
                    variant="outlined"
                    sx={{ marginBottom: "5px", paddingRight: "10px" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",

                        paddingBottom: "20px",
                      }}
                    >
                      <p className="answer">{ans.answer}</p>
                      <Typography
                        sx={{
                          fontFamily: "merriweather",
                          textAlign: "right",
                          fontSize: "12px",
                          color: "#6E48AA",
                          marginTop: "25px",
                        }}
                      >
                        {"-answer by" + " " + checkUserForAns(ans.user.name)}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })
            ) : (
              <Typography
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "14px",
                    sx: "12px",
                  },
                  fontFamily: "merriweather",
                  color: "#808080",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
              >
                NO Answers Yet!
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              multiline
              rows={6}
              sx={{ marginTop: 5, whiteSpace: "pre-wrap" }}
              name="description"
              onChange={handleChange}
              label="Enter your answer"
              type="text"
              value={answer}
              required
            />
            <Button
              variant="contained"
              sx={{
                marginTop: 5,
                fontFamily: "merriweather",
                backgroundColor: "#6E48AA",

                "&:hover": { backgroundColor: "#EC6F66" },
              }}
              type="submit"
              onClick={handleAnswerSubmit}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    );
}

export default DetailedQuestion;
