import Register from "../components/auth/Register";

import { connect } from "react-redux";

import { registerUser } from "../store/actions/authActions";

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (data) => dispatch(registerUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
