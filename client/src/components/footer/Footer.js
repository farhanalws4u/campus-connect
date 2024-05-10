import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        height: "50px",
        width: "100%",
        backgroundColor: "#6e48aa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            lg: "14px",
            md: "14px",
            sm: "12px",
            xs: "10px",
          },
          fontFamily: "merriweather",
          color: "#fff",
          maxWidth: "700px",
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          textAlign: "left",
        }}
      >
        All Rights reserved by Campus connect 2024
      </Typography>
    </Box>
  );
}

export default Footer;
