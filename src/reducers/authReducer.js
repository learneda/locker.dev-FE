import { FETCH_AUTH } from 'actions/types'

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_AUTH:
      return action.payload
    default:
      return state
  }
}
