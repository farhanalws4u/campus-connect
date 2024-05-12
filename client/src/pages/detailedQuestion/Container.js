import React from "react";
import DetailedQuestion from "./DetailedQuestion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Container() {
  return (
    <div style={{ backgroundColor: "#f4eeff" }}>
      <Header />
      <DetailedQuestion />
      <Footer />
    </div>
  );
}

export default Container;
