import { FETCH_USER, EDIT_PROFILE } from '../actions/types';

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case EDIT_PROFILE:
      return action.payload || false;
    default:
      return state;
  }
};
