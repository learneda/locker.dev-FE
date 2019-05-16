import { FETCH_NOTIFICATIONS, CLEAR_NOTIFICATIONS } from '../actions/types'

export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload
    case CLEAR_NOTIFICATIONS:
      return []
    default:
      return state
  }
}
