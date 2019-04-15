import {
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  GET_FOLLOWING,
  RECOMMENDED_FOLLOW
} from '../actions/types';

const initialState = [];

export const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_AND_FOLLOWING_COUNT:
      return action.payload;
    case FOLLOW_A_USER:
      if (action.payload.length === 0) {
        return false;
      } else {
        return true;
      }
    case UNFOLLOW_A_USER:
      if (action.payload.length === 0) {
        return true;
      } else {
        return false;
      }
    case GET_FOLLOWING:
      if (action.payload.length === 0) {
        return false;
      } else {
        return true;
      }
    case RECOMMENDED_FOLLOW:
      return [...action.payload];
    default:
      return state;
  }
};
