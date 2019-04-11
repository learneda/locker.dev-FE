import {
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER
} from '../actions/types';

const initialState = {};

export const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_AND_FOLLOWING_COUNT:
      return action.payload;
    case FOLLOW_A_USER:
      return action.payload;
    case UNFOLLOW_A_USER:
      return action.payload;
    default:
      return state;
  }
};
