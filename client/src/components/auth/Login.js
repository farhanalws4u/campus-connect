import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LoadingOverlayComp from "../LoadingOverlayComp";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";

import { useNavigate } from "react-router-dom";
import "./index.css";

import { Box } from "@mui/system";
import logo from "../../assets/images/logo.svg";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login(props) {
  const provider = new GoogleAuthProvider();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.state.auth.isAuthenticated) {
      navigate("/");
      props.setErrors({});
    }
  }, [navigate, props]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginUser(formData, navigate);
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      // console.log("acceess token", jwt_decode(user.accessToken));
      const userData = {
        name: user.displayName,
        email: user.email,
        exp: user.stsTokenManager.expirationTime,
        iat: user.metadata.createdAt,
        photoUrl: user.photoURL,
      };
      console.log("userDAta", userData);
      props.googleLogin(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingOverlayComp active={false}>
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
            Sign In
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
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Button
              onClick={handleGoogleLogin}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <img
                width="20px"
                height="20px"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="G"
              />
              &nbsp; Google Login
            </Button>

            <Grid container justify="center">
              <Grid item>
                <Button
                  className={classes.text}
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </LoadingOverlayComp>
  );
}
