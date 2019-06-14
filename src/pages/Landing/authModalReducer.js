import * as types from './authModalTypes'

const initialState = {
  isAuthOpen: false,
  isSignUp: true,
}

export const authModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_MODAL_OPEN: {
      return {
        ...state,
        isAuthOpen: true,
      }
    }
    case types.AUTH_MODAL_CLOSE: {
      return {
        ...state,
        isAuthOpen: false,
      }
    }
    case types.AUTH_MODAL_SIGNUP: {
      return {
        ...state,
        isSignUp: true,
      }
    }
    case types.AUTH_MODAL_LOGIN: {
      return {
        ...state,
        isSignUp: false,
      }
    }
    default:
      return state
  }
}
