import {
  GET_QUESTIONS,
  SET_CURRENT_QUESTION,
  UPDATE_QUESTION,
} from "../../constants/actionTypes";

const initialState = { all: [], current: {} };

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { all: [...action.payload] };

    case SET_CURRENT_QUESTION:
      return {
        ...state,
        current: state.all.filter((ques) => ques._id === action.payload),
      };
    case UPDATE_QUESTION:
      const index = state.all.findIndex(
        (ques) => ques._id === action.payload._id
      );
      state.all[index] = action.payload;

      return state;

    default:
      return state;
  }
};

export default questionReducer;
