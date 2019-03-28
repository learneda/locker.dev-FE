import { AUTH_MODAL_DISPLAY } from '../actions/types';
const initalState = {
  modalOpen: false
};
export const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case AUTH_MODAL_DISPLAY: {
      // console.log('redux working');
      return {
        ...state,
        modalOpen: !state.modalOpen
      };
    }
    default:
      return state;
  }
};
