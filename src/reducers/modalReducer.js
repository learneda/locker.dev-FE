import {
  AUTH_MODAL_DISPLAY,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP
} from '../actions/types';

const initialState = { modalOpen: false, signUp: true };

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_MODAL_DISPLAY: {
      return {
        ...state,
        modalOpen: !state.modalOpen
      };
    }
    case AUTH_MODAL_SIGNUP: {
      return {
        ...state,
        signUp: true
      };
    }
    case AUTH_MODAL_LOGIN: {
      return {
        ...state,
        signUp: false
      };
    }
    default:
      return state;
  }
};
