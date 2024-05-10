import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import logo from "../../assets/images/logo.svg";

function Auth(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (props.state.auth.isAuthenticated) {
      navigate("/");
    }
  }, [navigate, props]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isRegistered = props.registerUser(formData);
    isRegistered && navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container id="mainComp" component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <img src={logo} alt="logo" className="logo" />
        <span className="logoText">Campus Connect</span>
      </Box>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.text} variant="h5">
          Sign Up
        </Typography>
        {Object.keys(props.state.authErrors).length > 0 && (
          <Alert severity="error">
            {Object.values(props.state.authErrors).map((obj) => {
              return (
                <li>
                  {obj}
                  <br />
                </li>
              );
            })}
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input name="name" label="Name" handleChange={handleChange} />

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            <Input
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Button
                className={classes.text}
                onClick={() => navigate("/login")}
              >
                Alreday have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
