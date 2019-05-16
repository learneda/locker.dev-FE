import { GET_USER_PROFILE_DETAILS_BY_ID } from '../actions/types'

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_DETAILS_BY_ID:
      return action.payload
    default:
      return state
  }
}
