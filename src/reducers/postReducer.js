import { SAVE_LINK } from '../actions/types';

const initialState = {
  posts: []
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LINK:
      return { ...state, posts: [...action.payload] };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
