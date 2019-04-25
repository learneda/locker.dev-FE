import {
  FETCH_COURSES,
  FETCH_ARTICLES,
  SET_BROWSE_TAB_INDEX,
  ERROR,
} from '../actions/types';

const initialState = {
  courses: [],
  articles: [],
  index: 0,
  error: null,
};
export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: state.courses.concat(action.payload) };
    case FETCH_ARTICLES:
      return { ...state, articles: [...action.payload] };
    case SET_BROWSE_TAB_INDEX:
      return { ...state, index: action.payload };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
