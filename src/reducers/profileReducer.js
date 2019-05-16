import { SET_PROFILE_TAB_INDEX } from '../actions/types'

const initialState = {
  index: 0,
}
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_TAB_INDEX:
      return { ...state, index: action.payload }
    default:
      return state
  }
}
