import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import QueryForm from "./QueryForm";
import { Box } from "@mui/system";

function Container() {
  return (
    <div>
      <Header />
      <QueryForm />
      <Footer />
    </div>
  );
}

export default Container;
