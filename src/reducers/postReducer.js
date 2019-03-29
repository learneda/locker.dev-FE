import { ERROR } from '../actions/types';

const initialState = {
  posts: []
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
