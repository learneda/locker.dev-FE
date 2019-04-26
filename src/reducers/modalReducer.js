import {
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_SIGNUP,
  AUTH_MODAL_LOGIN,
  EDIT_MODAL_DISPLAY,
  EDIT_POST_SUBMIT,
  EDIT_POST_GET_DEFAULT_DATA,
} from '../actions/types';

const initialState = {
  isAuthOpen: false,
  isSignUp: true,
  isEditOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_MODAL_TOGGLE: {
      return {
        ...state,
        isAuthOpen: !state.isAuthOpen,
      };
    }
    case AUTH_MODAL_SIGNUP: {
      return {
        ...state,
        isSignUp: true,
      };
    }
    case AUTH_MODAL_LOGIN: {
      return {
        ...state,
        isSignUp: false,
      };
    }
    case EDIT_MODAL_DISPLAY: {
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
      };
    }
    case EDIT_POST_SUBMIT: {
      return {
        ...state,
      };
    }
    case EDIT_POST_GET_DEFAULT_DATA: {
      return {
        ...state,
        editFormData: action.payload,
      };
    }
    default:
      return state;
  }
};
