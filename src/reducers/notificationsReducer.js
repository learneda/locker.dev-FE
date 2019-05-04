import { FETCH_NOTIFICATIONS } from '../actions/types';

export const notificationsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload;
    default:
      return state;
  }
};
