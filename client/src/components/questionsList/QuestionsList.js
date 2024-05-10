import {
  Button,
  Grid,
  Typography,
  Container,
  ButtonBase,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../store/actions/questionActions";
import moment from "moment";
import { getAnswers } from "../../store/actions/questionActions";
import { getUserData } from "../../store/actions/userActions";

function QuestionsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions.all);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getAnswers());
    dispatch(getUserData({ id: user.id }));
  }, [dispatch]);

  const answers = useSelector((state) => state.answers);

  const checkNoOfAnswers = (id) => {
    const filterAnswers = answers.filter((ans) => ans.questionId === id);
    return filterAnswers.length;
  };

  return (
    <div>
      <Container
        sx={{
          marginTop: 2,
          paddingBottom: "100px",
          height: questions.length === 0 ? "100vh" : "fit-content",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "merriweather",
              fontSize: { lg: "45px", md: "45px", sm: "30px", xs: "30px" },
              borderLeft: "5px solid #6e48aa",
              paddingLeft: "15px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
          >
            Top Questions
          </Typography>
          <Button
            onClick={() => navigate("/queryForm")}
            sx={{
              fontFamily: "merriweather",
              backgroundColor: "#EC6F66",

              "&:hover": { backgroundColor: "#6E48AA" },
            }}
            variant="contained"
          >
            Ask Query
          </Button>
        </Grid>

        {/* questions container */}

        <Container maxWidth="md" sx={{ marginTop: 2, textAlign: "center" }}>
          {questions.map((question) => {
            const answersLength = checkNoOfAnswers(question._id);

            return (
              <ButtonBase
                onClick={() => navigate(`/detailedQuestion/${question._id}`)}
              >
                <Paper
                  variant="outlined"
                  elevation={3}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid
                    sx={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingBottom: "10px",
                      marginTop: 2,
                      width: { lg: 800, md: 800, sm: "600px", xs: "340px" },
                    }}
                  >
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
                      }}
                    >
                      {question.title}
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
                        maxWidth: "600px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        marginTop: "5px",
                      }}
                    >
                      {question.description}
                    </Typography>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "merriweather",
                          fontSize: "13px",
                        }}
                      >
                        {answersLength + " " + "answers"}
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "merriweather", fontSize: "13px" }}
                      >
                        {moment(question.date).fromNow()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </ButtonBase>
            );
          })}
        </Container>
      </Container>
    </div>
  );
}

export default QuestionsList;
