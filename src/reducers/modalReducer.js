import {
  AUTH_MODAL_DISPLAY,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
  EDIT_MODAL_DISPLAY,
  EDIT_POST_SUBMIT,
  EDIT_POST_GET_DEFAULT_DATA
} from '../actions/types';

const initialState = { modalOpen: false, signUp: true, editModalOpen: false };

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_MODAL_DISPLAY: {
      return {
        ...state,
        editModalOpen: !state.editModalOpen
      };
    }
    case EDIT_POST_SUBMIT: {
      return {
        ...state
      };
    }
    case EDIT_POST_GET_DEFAULT_DATA: {
      return {
        ...state,
        editFormData: action.payload
      };
    }
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
