import { LIKED_POSTS } from '../actions/types';

export const likedPostReducer = (state = [], action) => {
  switch (action.type) {
    case LIKED_POSTS:
      return action.payload;
    default:
      return state;
  }
};
