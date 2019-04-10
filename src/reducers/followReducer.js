import { GET_FOLLOWERS_AND_FOLLOWING_COUNT } from '../actions/types';

const initialState = {};

export const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_AND_FOLLOWING_COUNT: {
      return action.payload;
    }
    default:
      return state;
  }
};
