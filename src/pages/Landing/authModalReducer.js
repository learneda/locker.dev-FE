import {
  AUTH_MODAL_OPEN,
  AUTH_MODAL_CLOSE,
  AUTH_MODAL_SIGNUP,
  AUTH_MODAL_LOGIN,
} from './authModalTypes'

const initialState = {
  isAuthOpen: false,
  isSignUp: true,
}

export const authModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_MODAL_OPEN: {
      return {
        ...state,
        isAuthOpen: true,
      }
    }
    case AUTH_MODAL_CLOSE: {
      return {
        ...state,
        isAuthOpen: false,
      }
    }
    case AUTH_MODAL_SIGNUP: {
      return {
        ...state,
        isSignUp: true,
      }
    }
    case AUTH_MODAL_LOGIN: {
      return {
        ...state,
        isSignUp: false,
      }
    }
    default:
      return state
  }
}
