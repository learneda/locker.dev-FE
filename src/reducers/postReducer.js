import { FETCH_POSTS, DELETE_POST, UPDATE_POSTS_STATE } from '../actions/types';

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case DELETE_POST: {
      return [...state];
    }
    case UPDATE_POSTS_STATE: {
      return state.concat(action.payload);
    }
    default:
      return state;
  }
};
