import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userDataReducer from "./userData";

export const reducers = combineReducers({
  auth: authReducer,
  authErrors: errorReducer,
  userData: userDataReducer,
});
