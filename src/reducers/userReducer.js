import { EDIT_USER } from 'actions/types'
import { FETCH_USER } from 'appTypes'
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload
    case EDIT_USER:
      return action.payload
    default:
      return state
  }
}
