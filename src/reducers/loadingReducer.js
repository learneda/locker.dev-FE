import {
  LOADING_SUGGESTED,
  LOADED_SUGGESTED,
  LOADING_SIDEBAR,
  LOADED_SIDEBAR,
} from '../actions/types'

const initialState = {
  suggested: false,
  sidebar: false,
}

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SUGGESTED:
      return { ...state, suggested: true }
    case LOADED_SUGGESTED:
      return { ...state, suggested: false }
    case LOADING_SIDEBAR:
      return { ...state, sidebar: true }
    case LOADED_SIDEBAR:
      return { ...state, sidebar: false }
    default:
      return state
  }
}
