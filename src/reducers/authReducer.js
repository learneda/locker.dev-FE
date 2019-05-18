import { FETCH_AUTH, EDIT_PROFILE } from '../actions/types'

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_AUTH:
      return action.payload
    case EDIT_PROFILE:
      return action.payload
    default:
      return state
  }
}
