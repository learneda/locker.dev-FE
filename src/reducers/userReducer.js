import { EDIT_USER } from 'actions/types'
import {
  FETCH_USER,
  UPDATE_HEADER_PICTURE,
  UPDATE_PROFILE_PICTURE,
} from 'appTypes'
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload
    case EDIT_USER:
      return action.payload
    case UPDATE_HEADER_PICTURE:
      return { ...state, header_picture: action.payload }
    case UPDATE_PROFILE_PICTURE:
      return { ...state, profile_picture: action.payload }
    default:
      return state
  }
}
