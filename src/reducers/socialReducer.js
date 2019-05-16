import { SET_SOCIAL_TAB_INDEX } from '../actions/types'

const initialState = {
  index: 0,
}
export const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCIAL_TAB_INDEX:
      return { ...state, index: action.payload }
    default:
      return state
  }
}
