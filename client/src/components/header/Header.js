import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../assets/images/logo.svg";
import "./styles.css";
import SearchBar from "material-ui-search-bar";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");

  const userData = useSelector((state) => state.userData);

  const handleSearch = () => {
    console.log("search value ", searchValue);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <AppBar sx={{ backgroundColor: "#fff" }} position="static">
      <Container sx={{ display: "flex", paddingTop: 1 }} maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="logo" />
          <span className="logoText">Campus Connect</span>
        </Box>

        <Box
          id="google_translate_element"
          sx={{
            flexGrow: 0.5,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        ></Box>

        <Box sx={{ flexGrow: 0.1, display: "flex", alignItems: "center" }}>
          <Tooltip
            title="Profile"
            componentsProps={{
              tooltip: {
                sx: {
                  color: "#fff",
                  backgroundColor: "#6e48aa",
                  fontSize: "1em",
                },
              },
            }}
          >
            <IconButton onClick={() => navigate("/profile")}>
              <Avatar className="userAvatar" src={userData?.photoUrl} />
            </IconButton>
          </Tooltip>
          <Button
            onClick={handleLogOut}
            variant="contained"
            sx={{
              transform: "scale(.8)",
              fontFamily: "merriweather",
              backgroundColor: "#6E48AA",

              "&:hover": { backgroundColor: "#EC6F66" },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
