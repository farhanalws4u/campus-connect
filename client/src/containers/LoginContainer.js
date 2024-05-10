import Login from "../components/auth/Login";

import { connect } from "react-redux";

import {
  googleLogin,
  loginUser,
  setAuthErrors,
} from "../store/actions/authActions";

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (data) => dispatch(loginUser(data)),
  googleLogin: (data) => dispatch(googleLogin(data)),
  setErrors: (errors) => dispatch(setAuthErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
