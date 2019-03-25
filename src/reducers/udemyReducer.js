import { FETCH_COURSES, ERROR } from '../actions/types';

const initialState = {
  courses: [],
  error: null
};
export const udemyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: [...action.payload] };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
