import React from "react";
import Header from "../../components/header/Header";
import QuestionsList from "../../components/questionsList/QuestionsList";
import { Box } from "@mui/system";
import Footer from "../../components/footer/Footer";

function Home(props) {
  return (
    <Box sx={{ backgroundColor: "#f4eeff" }}>
      <Header />
      <QuestionsList />
      <Footer />
    </Box>
  );
}

export default Home;
