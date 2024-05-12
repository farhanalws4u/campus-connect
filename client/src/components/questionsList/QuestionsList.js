import {
  Button,
  Grid,
  Typography,
  Container,
  ButtonBase,
  Paper,
  Input,
  TextField,
  Box,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../store/actions/questionActions";
import moment from "moment";
import { getAnswers } from "../../store/actions/questionActions";
import { getUserData } from "../../store/actions/userActions";
import SearchBar from "material-ui-search-bar";
import LoadingOverlayComp from "../LoadingOverlayComp";
import "./questionList.css";

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

  const [searchString, setSearchString] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (event) => {
    if (searchString !== "") {
      const searchWords = searchString.toLowerCase().split(" ");
      const filteredData = questions.filter((item) => {
        const titleWords = item.title.toLowerCase().split(" ");
        return searchWords.some((word) => titleWords.includes(word));
      });
      console.log("filtered object", filteredData);
      setFilteredQuestions(filteredData);
    } else {
      setFilteredQuestions(questions);
    }
  };
  console.log("filtered questions", filteredQuestions);

  const handleCloseSearch = () => {
    setFilteredQuestions(questions);
    setSearchString("");
  };

  useEffect(() => {
    if (searchString === "") {
      setFilteredQuestions(questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useEffect(() => {
    setFilteredQuestions(questions);
    if (questions.length !== 0) setIsLoading(false);
  }, [questions]);

  console.log("isLoading---", isLoading);
  return (
    <div>
      <Container
        sx={{
          marginTop: 2,
          paddingBottom: "100px",
          height: questions.length === 0 ? "100vh" : "fit-content",
          backgroundColor: "#f4eeff",
          minHeight: "100vh",
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
              fontSize: { lg: "45px", md: "45px", sm: "30px", xs: "25px" },
              borderLeft: "5px solid #6e48aa",
              paddingLeft: "15px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
          >
            Top Questions
          </Typography>

          <button
            className="queryButton"
            onClick={() => navigate("/queryForm")}
          >
            Ask Query
          </button>
        </Grid>

        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <SearchBar
            value={searchString}
            onChange={(newValue) => setSearchString(newValue)}
            onRequestSearch={() => handleSearch()}
            placeholder="Search Question..."
            onCancelSearch={handleCloseSearch}
          />
        </Container>

        {/* questions container */}

        <Container maxWidth="md" sx={{ marginTop: 2, textAlign: "center" }}>
          <>
            {isLoading ? (
              <Box sx={{ marginTop: "250px" }}>
                <LoadingOverlayComp active={true} />
              </Box>
            ) : filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => {
                const answersLength = checkNoOfAnswers(question._id);
                return (
                  <ButtonBase
                    onClick={() =>
                      navigate(`/detailedQuestion/${question._id}`)
                    }
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
                            sx={{
                              fontFamily: "merriweather",
                              fontSize: "13px",
                            }}
                          >
                            {moment(question.date).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </ButtonBase>
                );
              })
            ) : (
              <h1>No result Found</h1>
            )}
          </>

          {/* {questions.map((question) => {
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
          })} */}
        </Container>
      </Container>
    </div>
  );
}

export default QuestionsList;
