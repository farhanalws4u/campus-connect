import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import questionReducer from "./questionReducer";
import userDataReducer from "./userData";
import answerReducer from "./answerReducer";

export const reducers = combineReducers({
  auth: authReducer,
  authErrors: errorReducer,
  questions: questionReducer,
  userData: userDataReducer,
  answers: answerReducer,
});
