import { FETCH_POSTS, DELETE_POST } from '../actions/types';

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case DELETE_POST: {
      return [...state];
    }
    default:
      return state;
  }
};
