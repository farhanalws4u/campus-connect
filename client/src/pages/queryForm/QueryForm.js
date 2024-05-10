import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { submitQuestion } from "../../store/actions/questionActions";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Box } from "@mui/system";

function QueryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitQuestion({ userId, ...formData }, navigate));
    setFormData({ title: "", description: "" });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Container maxWidth="md">
        <Typography
          sx={{ fontSize: "30px", fontFamily: "merriweather", marginTop: 5 }}
        >
          Fill your query Details
        </Typography>
        <form style={{ width: "100%", marginTop: 20 }} onSubmit={handleSubmit}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center ",
            }}
          >
            <TextField
              sx={{ marginTop: 5 }}
              name="title"
              onChange={handleChange}
              label="Enter query title"
              type="text"
              value={formData.title}
              required
              inputProps={{
                maxLength: 90,
              }}
            />

            <TextField
              multiline
              rows={6}
              sx={{ marginTop: 5, whiteSpace: "pre-wrap" }}
              name="description"
              onChange={handleChange}
              label="Enter your query details"
              type="text"
              required
              value={formData.description}
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
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default QueryForm;
