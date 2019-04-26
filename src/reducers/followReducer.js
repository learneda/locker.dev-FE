import {
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  GET_FOLLOWING,
  RECOMMENDED_FOLLOW,
  // GET_USER_FOLLOWERS,
  // GET_USER_FOLLOWING
} from '../actions/types';

const initialState = {
  following: [],
  followers: [],
};

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

    // case GET_USER_FOLLOWERS:
    //   return { ...state, followers: [action.payload] };

    // case GET_USER_FOLLOWING:
    //   return { ...state, following: [action.payload] };

    default:
      return state;
  }
};
