import {
  SET_CURRENT_USER,
  UPDATE_USER,
  USER_LOADING,
} from "../../constants/actionTypes";

import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
