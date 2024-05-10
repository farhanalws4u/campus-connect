import { ADD_USER_DATA, SET_USER_DATA } from "../../constants/actionTypes";

const initialState = {};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.payload;

    case ADD_USER_DATA:
      return action.payload;

    default:
      return state;
  }
};

export default userDataReducer;
