import Home from "../pages/Home/Home";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  todoList: state.todo,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
