import { SET_HOME_TAB_INDEX } from '../actions/types';

const initialState = {
  index: 0,
};
export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_TAB_INDEX:
      return { ...state, index: action.payload };
    default:
      return state;
  }
};
