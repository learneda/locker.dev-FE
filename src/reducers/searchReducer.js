import { SET_SEARCH_TERM } from '../actions/types';

const initialState = '';

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.payload;
    default:
      return state;
  }
};
