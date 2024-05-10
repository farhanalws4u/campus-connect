import { SUBMIT_ANSWER, GET_ANSWERS } from "../../constants/actionTypes";

const initialState = [];

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      return action.payload;

    case SUBMIT_ANSWER:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default answerReducer;
