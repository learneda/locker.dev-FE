import { AUTH_MODAL_DISPLAY } from '../actions/types';

const initalState = { modalOpen: false };

export const modalReducer = (state = initalState, action) => {
  switch (action.type) {
    case AUTH_MODAL_DISPLAY: {
      return {
        ...state,
        modalOpen: !state.modalOpen
      };
    }
    default:
      return state;
  }
};
