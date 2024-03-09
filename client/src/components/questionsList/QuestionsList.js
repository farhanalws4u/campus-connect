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

function QuestionsList() {
  const navigate = useNavigate();

  return (
    <div>
      <Container
        sx={{
          marginTop: 2,
          paddingBottom: "100px",
          height: "fit-content",
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

        <Container
          maxWidth="md"
          sx={{ marginTop: 2, textAlign: "center" }}
        ></Container>
      </Container>
    </div>
  );
}

export default QuestionsList;
